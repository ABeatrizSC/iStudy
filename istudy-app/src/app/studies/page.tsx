'use client';

import { useState } from "react";
import { Template, Container, Button, Title, StudyBox } from "@/components";
import { Input, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { Search, Add } from "@mui/icons-material";
import { useSubjectCategories } from "@/hooks/subject";
import { formatCategory } from "@/utils/formatters";
import { useStudyData } from "@/hooks/study/useStudyData";
import { StudyResponse } from "@/resources/services/study/study.resource";

export default function Studies() {
    const [search, setSearch] = useState<string>("");
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [categorySelected, setCategorySelected] = useState<string>("");

    const { data: studies, isLoading: isStudiesLoading } = useStudyData();
    const { data: categories, isLoading: isCategoriesLoading } = useSubjectCategories();

    const isLoading = isStudiesLoading || isCategoriesLoading;

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
                Studies
            </Title>
            <Container style="!flex-row gap-5 items-center justify-center">
                <span className="flex-1 flex items-center">
                    <label htmlFor="subjectName" className="mr-2">Search:</label>
                    <Input 
                        id="subjectName"
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
                <Button>
                    <Add />
                    New
                </Button>
            </Container>
            <Container style="!flex-row justify-start gap-5 flex-wrap overflow-y-auto">
                {studies?.map((study: StudyResponse) => (
                    <StudyBox key={study.id} study={study} />
                ))}
            </Container>
        </Template>
    );
}