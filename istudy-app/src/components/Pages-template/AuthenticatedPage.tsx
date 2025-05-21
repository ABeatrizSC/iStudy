'use client'

import Login from "@/app/login/page";
import { useSession } from "@/hooks/auth-user/useSession";
import { Loader } from "./Loader";

interface AuthenticatedPageProps {
    children: React.ReactNode
}

export const AuthenticatedPage: React.FC<AuthenticatedPageProps> = ({ children }) => {
    const { data: isSessionValid, isLoading } = useSession();

    if (isLoading) return <Loader />

    if(!isSessionValid) return <Login />

    return (
        <>
            {children}
        </>
    )
}