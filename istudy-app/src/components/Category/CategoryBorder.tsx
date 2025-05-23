import { CATEGORY_COLOR } from "@/constants/colors/categoriesColors";
import { formatCategory } from "@/utils/formatters";

interface CategoryBorderProps {
    category: string;
}

export const CategoryBorder: React.FC<CategoryBorderProps> = ({ category }) => {
    const categoryKey = formatCategory(category) as keyof typeof CATEGORY_COLOR;
    const bgColor = CATEGORY_COLOR[categoryKey]
  
    return (
        <div className="absolute bottom-0 left-0 w-full h-5 text-center text-white flex items-center justify-center" style={{ backgroundColor: bgColor }}>
            <span className="!text-xs">
                {formatCategory(category)}
            </span>
        </div>
    )
}