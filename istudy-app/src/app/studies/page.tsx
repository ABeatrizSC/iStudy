'use client';

import { useState } from "react";
import { Template, Container, Button, Title, StudyBox, StudyModal, ConfirmationModal, DateInput } from "@/components";
import { MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { Add } from "@mui/icons-material";
import { useSubjectCategories } from "@/hooks/subject";
import { formatCategory, formatSavedDate, formatStatus } from "@/utils/formatters";
import { useStudyData, useCreateStudy, useDeleteStudy, useUpdateStudy } from "@/hooks/study";
import { Study } from "@/resources/services/study/study.resource";
import dayjs from "dayjs";

export default function Studies() {
    const [categoryFilter, setCategoryFilter] = useState<string>("");
    const [topicFilter, setTopicFilter] = useState<string>("");
    const [statusFilter, setStatusFilter] = useState<boolean | null>(null);
    const [dateFilter, setDateFilter] = useState<string>("");
    const [studySelected, setStudySelected] = useState<Study>({
        id: "",
        createdBy: "",
        disciplineName: "",
        topicName: "",
        disciplineCategory: "",
        time: "",
        date: "",
        isCompleted: false
    });

    const { data: allStudies, isLoading: isStudiesLoading } = useStudyData();
    const { data: categories, isLoading: isCategoriesLoading } = useSubjectCategories();

    const topics = allStudies?.reduce((acc: string[], study) => {
        if (!acc.includes(study.topicName)) {
            acc.push(study.topicName);
        }
        return acc;
    }, []);

    
    const createStudy = useCreateStudy();
    const deleteStudy = useDeleteStudy();
    const updateStudy = useUpdateStudy();
    
    const isLoading = isStudiesLoading || isCategoriesLoading;

    const [openCreateModal, setOpenCreateModal]= useState<boolean>(false);
    const [openConfirmDeleteModal, setOpenConfirmDeleteModal]= useState<boolean>(false);
    const [openUpdateModal, setOpenUpdateModal]= useState<boolean>(false);

    const handleStatusChange = (event: SelectChangeEvent<string>) => {
        setDateFilter("");
        setCategoryFilter("");
        setTopicFilter("");
        setStatusFilter(formatStatus(event.target.value));
    };

    const handleCategoryChange = (event: SelectChangeEvent<string>) => {
        setDateFilter("");
        setStatusFilter(formatStatus(""));
        setTopicFilter("");
        setCategoryFilter(event.target.value as string);
    };

    const handleTopicChange = (event: SelectChangeEvent<string>) => {
        setDateFilter("");
        setStatusFilter(formatStatus(""));
        setCategoryFilter("");
        setTopicFilter(event.target.value);
    };

    const handleDateChange = (newValue: string | Date | dayjs.Dayjs | null) => {
        setCategoryFilter("");
        setStatusFilter(formatStatus(""));
        setTopicFilter("");
        setDateFilter(formatSavedDate(newValue));
    }

    const handleCloseDeleteModal = () => {
        setOpenConfirmDeleteModal(false)
    }

    const handleDeleteStudy = (id: string = '') => {
        deleteStudy.mutate(id, {
            onSuccess: () => handleCloseDeleteModal(),
        });
    }

    let studies = categoryFilter ? allStudies?.filter(s => s.disciplineCategory == categoryFilter) : dateFilter ? allStudies?.filter(s => s.date == dateFilter) : statusFilter ? allStudies?.filter(s => s.isCompleted === statusFilter) : topicFilter ? allStudies?.filter(s => s.topicName === topicFilter) : allStudies;

    studies = studies?.sort((a, b) => dayjs(b.date).valueOf() - dayjs(a.date).valueOf());

    return (
        <Template loading={isLoading}>
            <Title>
                Studies
            </Title>
            <Container style="!flex-row gap-5 items-center justify-center">
                <span>
                    <label htmlFor="studyStatus" className="mr-2">Status:</label>
                    <Select
                        id="studyStatus"
                        value={statusFilter == null ? "" : statusFilter ? "complete" : "incomplete"}
                        onChange={handleStatusChange}
                        sx={{
                            width: '180px'
                        }}
                    >
                        <MenuItem value={""}>None</MenuItem>
                        <MenuItem value={"complete"}>Complete</MenuItem>
                        <MenuItem value={"incomplete"}>Incomplete</MenuItem>
                    </Select>
                </span>
                 <span>
                    <label htmlFor="subjectCategory" className="mr-2">Topic:</label>
                    <Select
                        id="subjectCategory"
                        value={topicFilter}
                        onChange={handleTopicChange}
                        sx={{
                            width: '180px'
                        }}
                    >
                        <MenuItem value={""}>None</MenuItem>
                        {topics?.map((topic: string) => (
                            <MenuItem 
                                key={topic} 
                                value={topic}
                            >
                                {topic}
                            </MenuItem>
                        ))}
                    </Select>
                </span>
                <span>
                    <label className="mr-2">Date:</label>
                    <DateInput 
                        value={dateFilter}
                        onChangeFunc={(newValue) => handleDateChange(newValue)}
                    />
                </span>
                <span>
                    <label htmlFor="subjectCategory" className="mr-2">Category:</label>
                    <Select
                        id="subjectCategory"
                        value={categoryFilter}
                        onChange={handleCategoryChange}
                        sx={{
                            width: '180px'
                        }}
                    >
                        <MenuItem value={""}>None</MenuItem>
                        {categories?.map((category: string) => (
                            <MenuItem 
                                key={category} 
                                value={category}
                            >
                                {formatCategory(category)}
                            </MenuItem>
                        ))}
                    </Select>
                </span>
                <Button onClick={() => setOpenCreateModal(true)}>
                    <Add />
                    New
                </Button>
            </Container>
            <Container style="!flex-row justify-start gap-5 flex-wrap overflow-y-auto">
                {studies && studies?.length > 0 ? (
                    studies?.map((study: Study) => (
                        <StudyBox 
                            key={study.id} 
                            study={study} 
                            openDeleteModalFunc={() => setOpenConfirmDeleteModal(true)}
                            openUpdateModalFunc={() => setOpenUpdateModal(true)}
                            setStudySelectedFunc={(value: Study) => setStudySelected(value)}
                        />
                    ))
                ) : (
                    <p>No studies found.</p>
                )}
            </Container>
            <StudyModal 
                title="Create a new study"
                submitText="Create"
                createAction={createStudy}
                open={openCreateModal}
                handleClose={() => setOpenCreateModal(false)}
            />
            <StudyModal 
                key={studySelected.id} 
                title="Update a study"
                submitText="Save"
                data={studySelected} 
                updateAction={updateStudy}
                open={openUpdateModal}
                handleClose={() => setOpenUpdateModal(false)}
            />
            <ConfirmationModal
                title={`Delete '${studySelected.disciplineName}' study?`}
                description={"This action will delete all the study data."}
                agreeText={"Delete"}
                action={() => handleDeleteStudy(studySelected.id)}
                open={openConfirmDeleteModal}
                handleClose={() => handleCloseDeleteModal()}
            />
        </Template>
    );
}