'use client'

import { useSession } from "@/hooks/auth-user/useSession";
import { Loader } from "./Loader";
import { redirect } from "next/navigation";
import { PATH } from "@/constants/path";

interface AuthenticatedPageProps {
    children: React.ReactNode
}

export const AuthenticatedPage: React.FC<AuthenticatedPageProps> = ({ children }) => {
    const { data: isSessionValid, isLoading } = useSession();
    
    if (isLoading) return <Loader />
    
    if (!isSessionValid) return redirect(PATH.LOGIN);

    return (
        <>
            {children}
        </>
    )
}