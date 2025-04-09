'use client';

import { useEffect, useState } from "react";
import { Template, Container, Button, Title, StudyBox, StudyModal, ConfirmationModal, DateInput } from "@/components";
import { MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { Add } from "@mui/icons-material";
import { useSubjectCategories } from "@/hooks/subject";
import { formatCategory, formatSavedDate } from "@/utils/formatters";
import { useStudyData, useCreateStudy, useDeleteStudy, useUpdateStudy, useStudyByCategory, useStudyByDate } from "@/hooks/study";
import { Study } from "@/resources/services/study/study.resource";

export default function Studies() {
    const [studies, setStudies] = useState<Study[]>([]);
    const [categoryFilter, setCategoryFilter] = useState<string>("");
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
    const { data: studiesByCategory, isLoading: isLoadingStudiesByCategory } = useStudyByCategory(categoryFilter);
    const { data: studiesByDate, isLoading: isLoadingStudiesByDate } = useStudyByDate(dateFilter);

    useEffect(() => {
        let filteredStudies = allStudies || [];
    
        if (categoryFilter) {
            filteredStudies = studiesByCategory || [];
        } else if (dateFilter) {
            filteredStudies = studiesByDate || [];
        }
    
        if (statusFilter !== null) {
            filteredStudies = filteredStudies.filter(study => study.isCompleted === statusFilter);
        }
    
        setStudies(filteredStudies);
    }, [categoryFilter, dateFilter, statusFilter, allStudies, studiesByCategory, studiesByDate]);    
    
    const createStudy = useCreateStudy();
    const deleteStudy = useDeleteStudy();
    const updateStudy = useUpdateStudy();
    
    const isLoading = isStudiesLoading || isCategoriesLoading || isLoadingStudiesByCategory || isLoadingStudiesByDate;

    const [openCreateModal, setOpenCreateModal]= useState<boolean>(false);
    const [openConfirmDeleteModal, setOpenConfirmDeleteModal]= useState<boolean>(false);
    const [openUpdateModal, setOpenUpdateModal]= useState<boolean>(false);

    const handleCategoryChange = (event: SelectChangeEvent<string>) => {
        setDateFilter("");
        setStatusFilter(formatStatus(""));
        setCategoryFilter(event.target.value as string);
    };

    const formatStatus = (status: string) => {
        if (status == "complete") {
            return true;
        } else if (status == "incomplete") {
            return false;
        }
        return null;
    }

    const handleStatusChange = (event: SelectChangeEvent<string>) => {
        setDateFilter("");
        setCategoryFilter("");
        setStatusFilter(formatStatus(event.target.value));
    };

    const handleCloseDeleteModal = () => {
        setOpenConfirmDeleteModal(false)
    }

    const handleDeleteStudy = (id: string = '') => {
        deleteStudy.mutate(id, {
            onSuccess: () => handleCloseDeleteModal(),
        });
    }

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
                <span className="flex items-center">
                    <label className="mr-2">Date:</label>
                    <DateInput 
                        value={dateFilter}
                        onChangeFunc={(newValue) => {
                            setCategoryFilter("");
                            setStatusFilter(formatStatus(""));
                            setDateFilter(formatSavedDate(newValue));
                        }}
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
                {studies.length > 0 ? (
                    studies.map((study: Study) => (
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