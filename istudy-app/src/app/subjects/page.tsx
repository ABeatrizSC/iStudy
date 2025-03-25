'use client';

import { useState } from "react";
import { Button } from "@/components/Button";
import { Template } from "@/components/Template";
import { Input, MenuItem, Select, SelectChangeEvent, TableBody } from "@mui/material";
import { CustomTable, Column, CustomTableHead, CustomTableCell } from "@/components/Table/index";
import TableRow from '@mui/material/TableRow';
import { Visibility, Edit, Delete, Search, Add } from "@mui/icons-material";
import { useSubjectData, useSubjectCategories, useSubjectBySearch, useSubjectByCategory, useDeleteSubject, useCreateSubject, useUpdateSubject } from "@/hooks/subject/index";
import { Subject } from "@/resources/services/subject/subject.resource";
import { Container } from "@/components/Container";
import { SubjectModal, ConfirmationModal } from "@/components/Modal/index";
import { useRouter } from "next/navigation";
import { Title } from "@/components/Title";
import { formatTime } from "../utils/formatters/formatTime";
import { formatCategory } from "../utils/formatters";
import { CategoryBox } from "@/components/CategoryBox";

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
    const [searchQuery, setSearchQuery] = useState<string>("");
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
    const [openEditModal, setOpenEditModal] = useState<boolean>(false);
    const [openConfirmDeleteModal, setOpenConfirmDeleteModal] = useState<boolean>(false);
    const router = useRouter()

    const handleCloseCreateModal = () => {
        setOpenCreateModal(false);
    }

    const handleCloseEditModal = () => {
        setOpenEditModal(false);
    }

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

    const { data: subjectsBySearch, isLoading: loadingSearch } = useSubjectBySearch(searchQuery);

    const { data: subjectsByCategory, isLoading: loadingCategory } = useSubjectByCategory(categorySelected);

    const { data: allSubjects, isLoading: loadingAll } = useSubjectData();

    const { data: categories } = useSubjectCategories();

    const isLoading = loadingSearch || loadingCategory || loadingAll;

    const subjects = searchQuery
        ? subjectsBySearch
        : categorySelected
        ? subjectsByCategory
        : allSubjects;

    const handleSearch = () => {
        setSearchQuery(search)
    }

    const handleCategoryChange = (event: SelectChangeEvent<string>) => {
        setCategorySelected(event.target.value as string);
        setSearchQuery("");
        setSearch("");
    };
      
    return (
        <Template loading={isLoading}>
            <Title>
                Subjects
            </Title>
            <Container style="!flex-row gap-5 items-center justify-center">
                <span className="flex-1 flex items-center">
                    <span className="mr-2">Search:</span>
                    <Input 
                        placeholder="Subject name" 
                        fullWidth={true} 
                        value={search}
                        onChange={(event) => setSearch(event.target.value)}
                        sx={{
                            minWidth: '170px',
                        }}
                    />
                </span>
                <Button onClick={handleSearch}>
                    <Search />
                </Button> 
                <span>
                    <span className="mr-2">Category:</span>
                    <Select
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

            <Container>
                <CustomTable>
                    <CustomTableHead columns={columns}/>
                    <TableBody>
                        {subjects?.map((subject: Subject, index: number) => (
                            <TableRow hover 
                                role="checkbox" 
                                tabIndex={-1} 
                                key={subject.id}
                                sx={{
                                    backgroundColor: (index % 2 === 0 ? "#f9f9f9" : "#ffffff"),
                                }}
                            >
                                <CustomTableCell>{subject.name}</CustomTableCell>
                                <CustomTableCell>
                                    <CategoryBox category={subject.category} />
                                </CustomTableCell>
                                <CustomTableCell>{formatTime(subject.totalTime)}</CustomTableCell>
                                <CustomTableCell>{formatTime(subject.timeCompleted)}</CustomTableCell>
                                <CustomTableCell sx={{ display: 'flex', gap: '5px', alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}>
                                    <Button onClick={() => router.push(`/subjects/${subject.name}`)}>
                                        <Visibility />
                                    </Button>
                                    <Button color="green" onClick={() => {
                                        setSubjectSelected(subject),
                                        setOpenEditModal(true)
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
                handleClose={handleCloseCreateModal} 
            />
            <SubjectModal 
                key={subjectSelected.id} 
                title={"Edit subject"} 
                submitText={"Save"} 
                categoriesList={categories} 
                data={subjectSelected} 
                updateAction={updateSubject} 
                open={openEditModal} 
                handleClose={handleCloseEditModal} 
            />
            <ConfirmationModal
                title={`Delete subject '${subjectSelected.name}'?`}
                description={"This action will delete all the subject data and its topics."}
                agreeText={"Delete"}
                action={() => handleDeleteSubject(subjectSelected.id)}
                open={openConfirmDeleteModal}
                handleClose={handleCloseConfirmDeleteModal}
            />
        </Template>
    );
}