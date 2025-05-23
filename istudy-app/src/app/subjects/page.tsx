'use client';

import { useState } from "react";
import { Template, Container, Button, CustomTable, CustomTableHead, CustomTableCell, SubjectModal, ConfirmationModal, Title, CategoryBox } from "@/components";
import { Input, MenuItem, Select, SelectChangeEvent, TableBody } from "@mui/material";
import TableRow from '@mui/material/TableRow';
import { Visibility, Edit, Delete, Add } from "@mui/icons-material";
import { useSubjectData, useSubjectCategories, useDeleteSubject, useCreateSubject, useUpdateSubject } from "@/hooks/subject";
import { Subject } from "@/resources/services/subject/subject.resource";
import { useRouter } from "next/navigation";
import { Column } from "@/components/Table";
import { formatCategory, formatStatus, formatTime, formatTimeToNumber } from "@/utils/formatters";
import { PATH } from "@/constants/path";

const columns: Column[] = [
    { 
        id: 'subject', 
        label: 'Subject', 
        align: 'center',
    },
    { 
        id: 'category',
        label: 'Category',
        align: 'center',
    },
    {
      id: 'completed-percentage',
      label: '% Completed',
      align: 'center',
    },
    {
      id: 'total-time',
      label: 'Total time',
      align: 'center',
    },
    {
      id: 'time-completed',
      label: 'Time completed',
      align: 'center',
    },
    {
        id: 'actions',
        label: 'Actions',
        align: 'center',
    }
];

export default function Subjects() {
    const [search, setSearch] = useState<string>("");
    const [statusFilter, setStatusFilter] = useState<boolean | null>(null);
    const [categorySelected, setCategorySelected] = useState<string>("");
    const [subjectSelected, setSubjectSelected] = useState<Subject>({id: "",
        createdBy: "",
        name: "",
        category: "",
        totalTime: "",
        timeCompleted: "",
        isCompleted: false,
        topics: null
    });
    const [openCreateModal, setOpenCreateModal] = useState<boolean>(false);
    const [openUpdateModal, setOpenUpdateModal] = useState<boolean>(false);
    const [openConfirmDeleteModal, setOpenConfirmDeleteModal] = useState<boolean>(false);
    const { push, prefetch } = useRouter()

    const handleCloseConfirmDeleteModal = () => {
        setOpenConfirmDeleteModal(false);
    }

    const createSubject = useCreateSubject();
    const updateSubject = useUpdateSubject();
    const deleteSubject = useDeleteSubject();

    const handleDeleteSubject = (id: string = '') => {
        deleteSubject.mutate(id, {
            onSuccess: () => handleCloseConfirmDeleteModal(),
        });
    }

    const { data: allSubjects, isLoading: loadingAll } = useSubjectData();

    const { data: categories } = useSubjectCategories();

    const isLoading = loadingAll;

    const handleSearch = (e: any) => {
        setCategorySelected("");
        setStatusFilter(null);
        setSearch(e);
    }

    const handleCategoryChange = (event: SelectChangeEvent<string>) => {
        setSearch("");
        setStatusFilter(null);
        setCategorySelected(event.target.value as string);
    };
    
    const handleStatusChange = (event: SelectChangeEvent<string>) => {
        setCategorySelected("");
        setSearch("");
        setStatusFilter(formatStatus(event.target.value));
    };

    const getDisciplinePercentage = (subject: Subject) => {
        const completed = formatTimeToNumber(subject.timeCompleted);
        const total = formatTimeToNumber(subject.totalTime);

        if (total === 0) return "0%";

        const percentage = (completed * 100) / total;

        return Number.isInteger(percentage)
            ? `${percentage}%`
            : `${percentage.toFixed(2)}%`;
    };

    let subjects = categorySelected ? allSubjects?.filter(s => s.category == categorySelected) : search ? allSubjects?.filter(s => s.name.toLowerCase().includes(search.toLowerCase())) : statusFilter != null ? allSubjects?.filter(s => s.isCompleted === statusFilter) : allSubjects;

    subjects = subjects?.sort((a, b) => a.name.localeCompare(b.name));

    return (
        <Template loading={isLoading}>
            <Title>
                Subjects
            </Title>
            <Container style="!flex-row gap-5 items-center justify-center">
                <span className="flex-1 flex items-center">
                    <label htmlFor="subjectName" className="mr-2">Search:</label>
                    <Input 
                        id="subjectName"
                        placeholder="Subject name" 
                        fullWidth={true} 
                        value={search}
                        onChange={(event) => handleSearch(event.target.value)}
                        sx={{
                            minWidth: '170px',
                        }}
                    />
                </span>
                 <span>
                    <label htmlFor="subjectStatus" className="mr-2">Status:</label>
                    <Select
                        id="subjectStatus"
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
                    <label htmlFor="subjectCategory" className="mr-2">Category:</label>
                    <Select
                        id="subjectCategory"
                        value={categorySelected}
                        onChange={handleCategoryChange}
                        sx={{
                            width: '180px'
                        }}
                    >
                        <MenuItem value={""}>None</MenuItem>
                        {categories?.map((category: string) => (
                            <MenuItem key={category} value={category}>{formatCategory(category)}</MenuItem>
                        ))}
                    </Select>
                </span>
                <Button onClick={() => setOpenCreateModal(true)}>
                    <Add />
                    New
                </Button>
            </Container>

            <Container style="overflow-y-auto">
                <CustomTable>
                    <CustomTableHead columns={columns}/>
                    <TableBody>
                        {subjects?.map((subject: Subject, index: number) => (
                            <TableRow hover 
                                role="checkbox" 
                                tabIndex={-1} 
                                key={subject.id}
                                sx={{
                                    backgroundColor: (subject.isCompleted ? "#F0F0F0" : index % 2 === 0 ? "#f9f9f9" : "#ffffff"),
                                    opacity: subject?.isCompleted ? 0.6 : 1,
                                }}
                            >
                                <CustomTableCell>{subject.name}</CustomTableCell>
                                <CustomTableCell>
                                    <CategoryBox category={subject.category} />
                                </CustomTableCell>
                                <CustomTableCell>
                                    {getDisciplinePercentage(subject)}
                                </CustomTableCell>
                                <CustomTableCell>{formatTime(subject.totalTime)}</CustomTableCell>
                                <CustomTableCell>{formatTime(subject.timeCompleted)}</CustomTableCell>
                                <CustomTableCell sx={{ display: 'flex', gap: '5px', alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}>
                                    <Button onClick={() => push(`${PATH.SUBJECTS}/${subject.name}`)}>
                                        <Visibility />
                                    </Button>
                                    <Button color="green" onClick={() => {
                                        setSubjectSelected(subject),
                                        setOpenUpdateModal(true)
                                    }}>
                                        <Edit />
                                    </Button>
                                    <Button onClick={ () => {
                                            setOpenConfirmDeleteModal(true)
                                            setSubjectSelected(subject)
                                        }} 
                                        color="red"
                                    >
                                        <Delete />
                                    </Button>
                                </CustomTableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </CustomTable>
                {subjects?.length === 0 && <span className="block w-full text-center my-5">No subject registered.</span>}
            </Container>
            <SubjectModal 
                title={"Add a new subject"} 
                submitText={"Create"} 
                categoriesList={categories} 
                createAction={createSubject} 
                open={openCreateModal} 
                handleClose={() => setOpenCreateModal(false)} 
            />
            <SubjectModal 
                key={subjectSelected.id} 
                title={"Edit subject"} 
                submitText={"Save"} 
                categoriesList={categories} 
                data={subjectSelected} 
                updateAction={updateSubject} 
                open={openUpdateModal} 
                handleClose={() => setOpenUpdateModal(false)} 
            />
            <ConfirmationModal
                title={`Delete subject '${subjectSelected.name}'?`}
                description={"This action will delete all the subject data, its topics and studies."}
                agreeText={"Delete"}
                action={() => handleDeleteSubject(subjectSelected.id)}
                open={openConfirmDeleteModal}
                handleClose={handleCloseConfirmDeleteModal}
            />
        </Template>
    );
}