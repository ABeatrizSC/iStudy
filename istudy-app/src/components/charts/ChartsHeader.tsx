interface ChartsTitleProps {
    title: string
    description?: string
}

export const ChartsHeader: React.FC<ChartsTitleProps> = ({ title, description }) => {
    return (
        <div className="text-center">
            <h2 className="uppercase text-base text-zinc-700 font-semibold">{title}</h2>
            {description && <p className="text-zinc-600">{description}</p>}
        </div> 
    )
}