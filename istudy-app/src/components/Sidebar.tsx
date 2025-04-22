'use client'

import React, { useState } from "react";
import theme from '@/resources/assets/styles/Theme';
import Image from "next/image";
import { useRouter } from "next/navigation";
import { BookCheckIcon, Calendar, ChevronDown, ClipboardList, Gamepad2, Home, LogOut, Menu, SquareGanttChart, StickyNote, Timer } from "lucide-react";
import istudyLogo from '../resources/assets/images/iStudyLogo.png';
import { Button } from '@/components';
import Link from "next/link";
import { useAuthService } from "@/resources/services/auth-user/authentication.service";

export const Sidebar: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isSidebarOpened, setIsSidebarOpened] = useState(true);
    const [openedDropdownIndex, setOpenedDropdownIndex] = useState<number | null>(null);
    const router = useRouter();
    const authService = useAuthService();
    
    const toggleSidebar = () => setIsSidebarOpened(!isSidebarOpened);
    const toggleDropdown = (index: number) => setOpenedDropdownIndex(openedDropdownIndex === index ? null : index);
    
    const handleLogout = () => {
        authService.logoutSession();
        router.push("/login");
    }

    const menuItems = [
        { path: "/", name: "Home", icon: <Home /> },
        {
            path: "/subjects", name: "Subjects", icon: <ClipboardList />},
        {
            path: "#", name: "Studies", icon: <BookCheckIcon />, dropdown: [
                { path: "/studies", name: "Management" },
                { path: "/studies/statistical-information", name: "Statistical Information" },
            ]
        },
        { path: "/schedules", name: "Schedule", icon: <SquareGanttChart /> },
        { path: "/reminders", name: "Reminders", icon: <StickyNote /> },
        { path: "/calendars", name: "Calendar", icon: <Calendar /> },
        {
            path: "#", name: "Games", icon: <Gamepad2 />, dropdown: [
                { path: "/games/flashcards", name: "Flashcards" },
                { path: "/games/quizzes", name: "Quizzes" },
            ]
        },
        {
            path: "#", name: "Time tracker", icon: <Timer />, dropdown: [
                { path: "/time-tools/timer", name: "Timer" },
                { path: "/time-tools/pomodoro", name: "Pomodoro" },
            ]
        }
    ];
    
    return (
        <div className="flex" style={{ height: '100%'}}>
            <aside className={`text-white h-screen min-w-fit transition-all duration-300 ${isSidebarOpened ? 'w-64' : 'w-16'} flex flex-col p-4`} style={{ backgroundColor: theme.palette.primary.main }}> 
                <div className="flex items-center justify-between mb-6">
                {isSidebarOpened && <Image src={istudyLogo} alt="Logo" className="w-28" />}
                    <Menu className="cursor-pointer" onClick={toggleSidebar} />
                </div>
                <nav>
                    <ul>
                        {menuItems.map((item, index) => (
                        <li key={index} className="relative">
                            <div className={`flex items-center gap-3 py-3 rounded-lg cursor-pointer hover:{ theme.palette.primary.main }`} onClick={() => item.dropdown ? toggleDropdown(index) : router.push(item.path)}>
                                {item.icon}
                                {isSidebarOpened && <span>{item.name}</span>}
                                {item.dropdown && isSidebarOpened && <ChevronDown className="ml-auto" />}
                            </div>
                            {item.dropdown && openedDropdownIndex === index && (
                                <ul className="ml-4">
                                    {item.dropdown.map((dropdownItem, dropdownIndex) => (
                                        <Link href={dropdownItem.path} key={dropdownIndex} className="block py-2 text-sm hover:text-gray-200">
                                            {dropdownItem.name}
                                        </Link>
                                    ))} 
                                </ul>
                            )}
                        </li>
                        ))}
                    </ul>
                </nav>
                <Button onClick={handleLogout} color='red' style="mt-auto p-3 flex items-center gap-2">
                    <LogOut />
                    {isSidebarOpened && "Logout"}
                </Button>
            </aside>
            <main className="flex-1 overflow-y-auto !items-start !justify-start relative">
                {children}
            </main>
        </div>
    );     
}