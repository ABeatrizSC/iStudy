import React from "react"

interface StudyInfoProps {
    info: string | number,
    children?: React.ReactNode,
}

export const StudyInfo: React.FC<StudyInfoProps> = ({ info, children }) => {
    return (
        <div className="text-gray-500 flex items-center gap-2">
            {children}
            <span className="text-sm">{info}</span>
        </div>
    )
}