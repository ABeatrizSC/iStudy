import React from "react";

interface ButtonProps {
    color?: string;
    label?: string;
    onClick?: (event: any) => void;
    type?: "submit" | "button" | "reset" | undefined;
}

export const Button: React.FC<ButtonProps> = ({ color = "#6F4BD8", label, onClick, type }) => {
    return (
        <button 
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors duration-300 ease-in-out font-medium text-white`} 
            style={{ backgroundColor: color }}
            onClick={onClick} 
            type={type}
        >
            {label}
        </button>
    );
};