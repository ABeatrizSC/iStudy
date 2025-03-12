'use client';

import { useState } from "react";
import { Button } from "@/components/Button";
import { Template } from "@/components/Template";
import theme from '@/resources/assets/styles/Theme';
import { Input, MenuItem, Select } from "@mui/material";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Visibility, Edit, Delete, Search, Add } from "@mui/icons-material";

interface Discipline {
    id: string,
    name: string,
    category: string,
    totalTime: string,
    timeCompleted: string,
    isCompleted: boolean
}

const disciplines: Discipline[] = [
    {
        id: "1",
        name: "Estruturas de Dados",
        category: "Exact sciences",
        totalTime: "40h",
        timeCompleted: "10h",
        isCompleted: false
    },
    {
        id: "2",
        name: "Banco de Dados",
        category: "Exact sciences",
        totalTime: "35h",
        timeCompleted: "20h",
        isCompleted: false
    },
    {
        id: "3",
        name: "Redes de Computadores",
        category: "Exact sciences",
        totalTime: "30h",
        timeCompleted: "5h",
        isCompleted: false
    },
    {
        id: "4",
        name: "Desenvolvimento Web",
        category: "Exact sciences",
        totalTime: "50h",
        timeCompleted: "50h",
        isCompleted: true
    },
    {
        id: "5",
        name: "Engenharia de Software",
        category: "Exact sciences",
        totalTime: "25h",
        timeCompleted: "15h",
        isCompleted: false
    },
    {
        id: "6",
        name: "Inteligência Artificial",
        category: "Exact sciences",
        totalTime: "45h",
        timeCompleted: "30h",
        isCompleted: false
    },
    {
        id: "7",
        name: "Sistemas Operacionais",
        category: "Exact sciences",
        totalTime: "40h",
        timeCompleted: "25h",
        isCompleted: false
    },
    {
        id: "8",
        name: "Matemática Discreta",
        category: "Exact sciences",
        totalTime: "35h",
        timeCompleted: "15h",
        isCompleted: false
    },
    {
        id: "9",
        name: "Arquitetura de Computadores",
        category: "Exact sciences",
        totalTime: "30h",
        timeCompleted: "30h",
        isCompleted: true
    },
    {
        id: "10",
        name: "Segurança da Informação",
        category: "Exact sciences",
        totalTime: "40h",
        timeCompleted: "10h",
        isCompleted: false
    }
];

interface Column {
    id: 'subject' | 'category' | 'completed' | 'actions';
    label: string;
    minWidth?: number;
    align?: 'center';
    format?: (value: number) => string;
}
  
const columns: readonly Column[] = [
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
      id: 'completed',
      label: '% Completed',
      align: 'center',
    },
    {
      id: 'actions',
      label: 'Actions',
      align: 'center',
    }
];

export default function Subjects() {
    const [category, setCategory] = useState("");
  
    return (
        <Template>
            <h1 className="mb-3" style={{ color: theme.palette.text.secondary}}>Subjects</h1>
            <section className="w-full bg-white py-3 px-4 mb-4 rounded-lg shadow-[0_0_0.6rem_0.2rem_rgba(0,0,0,0.1)] flex flex-wrap items-center justify-center gap-5">
                <span className="flex-1 flex items-center">
                    <span className="mr-2">Search:</span>
                    <Input 
                        placeholder="Subject name" 
                        fullWidth={true} 
                        sx={{
                            minWidth: '170px',
                        }}
                    />
                </span>
                <span>
                    <span className="mr-2">Category:</span>
                    <Select
                        value={category}
                        onChange={(event) => setCategory(event.target.value)}
                        sx={{
                            width: '180px'
                        }}
                    >
                        <MenuItem value={""}>None</MenuItem>
                        <MenuItem value={"Biological Sciences"}>Biological Sciences</MenuItem>
                        <MenuItem value={"Human sciences"}>Human sciences</MenuItem>
                        <MenuItem value={"Exact sciences"}>Exact sciences</MenuItem>
                        <MenuItem value={"Languages"}>Social sciences</MenuItem>
                        <MenuItem value={"Exact sciences"}>Health sciences</MenuItem>
                        <MenuItem value={"Exact sciences"}>Arts and humanities</MenuItem>
                    </Select>
                </span>
                <Button>
                    <Search />
                </Button>
                <Button>
                    <Add />
                    New
                </Button>
            </section>

            <section className="w-full flex flex-col flex-grow bg-white py-3 px-4 rounded-lg shadow-[0_0_0.6rem_0.2rem_rgba(0,0,0,0.1)]">
                <TableContainer sx={{ maxHeight: "400px", overflowY: "auto" }} className="w-full rounded-lg">
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                {columns.map((column) => (
                                    <TableCell 
                                        key={column.id} 
                                        align={column.align}
                                        sx={{ backgroundColor: theme.palette.primary.main, color: "white" }}
                                    >
                                        {column.label}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {disciplines.map((discipline) => (
                                <TableRow hover role="checkbox" tabIndex={-1} key={discipline.id}>
                                    <TableCell className="text-center">{discipline.name}</TableCell>
                                    <TableCell className="text-center">{discipline.category}</TableCell>
                                    <TableCell className="text-center">{((parseInt(discipline.timeCompleted) / parseInt(discipline.totalTime)) * 100).toFixed(2)}%</TableCell>
                                    <TableCell className="flex gap-2 justify-center">
                                        <Button><Visibility /></Button>
                                        <Button color="green"><Edit /></Button>
                                        <Button color="red"><Delete /></Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </section>
        </Template>
    );
}