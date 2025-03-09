import React from "react";
import theme from '@/resources/assets/styles/Theme';

interface ButtonProps {
    color?: "primary" | "secondary" | "red" | "green" | string;
    style ?: string;
    label?: string;
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
    type?: "submit" | "button" | "reset";
    disabled?: boolean;
    children?: React.ReactNode;
}

const colorClasses: Record<string, string> = {
    primary: theme.palette.primary.main,
    secondary: theme.palette.secondary.main,
    red: theme.palette.red.main,
    green: theme.palette.green.main,
};

export const Button: React.FC<ButtonProps> = ({ 
    color = "primary", 
    style,
    label, 
    children,
    onClick, 
    type = "button", 
    disabled = false 
}) => {
    const bgColor = colorClasses[color] || color; 

    return (
        <button 
            className={`${style} flex items-center justify-center gap-2 px-4 py-2 rounded-lg transition-colors duration-300 ease-in-out font-medium text-white
                ${disabled ? "opacity-50 cursor-not-allowed" : "hover:brightness-105"}
            `} 
            style={{ backgroundColor: bgColor }}
            onClick={onClick} 
            type={type}
            disabled={disabled}
        >
            {label}
            {children}
        </button>
    );
};
