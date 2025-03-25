'use client'

import React from "react";
import { ThemeProvider } from '@mui/material/styles';
import theme from '@/resources/assets/styles/Theme';
import { ToastContainer } from 'react-toastify';
import { Sidebar, Loader } from "./";


interface TemplateProps {
    children: React.ReactNode;
    loading ?: boolean;
}

export const Template: React.FC<TemplateProps> = ({ children, loading = false }: TemplateProps) => {
    return (
        <ThemeProvider theme={theme}>
            <Sidebar>
                <div className={`${loading ? 'animate-pulse' : ''} w-full flex flex-col gap-4 justify-start`}>
                        {!loading ? children : <Loader />}
                </div>
            </Sidebar>
            <ToastContainer position='bottom-right' />
        </ ThemeProvider>
    )
}

interface RenderIfProps {
    condition?: boolean;
    children: React.ReactNode;
}

export const RenderIf: React.FC<RenderIfProps> = ({condition = true, children}) => {
    if(condition){
        return children
    }

    return false;
}