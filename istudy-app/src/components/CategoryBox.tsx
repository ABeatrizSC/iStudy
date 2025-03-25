import { CATEGORY_COLOR } from "@/app/constants/colors/categoriesColors";
import { formatCategory } from "@/app/utils/formatters";

interface CategoryBoxProps {
    category: string;
    style?: string;
    fontSize?: string;
}

export const CategoryBox: React.FC<CategoryBoxProps> = ({ category, style, fontSize = "text-xs" }) => {
    const categoryKey = formatCategory(category) as keyof typeof CATEGORY_COLOR;
    const bgColor = CATEGORY_COLOR[categoryKey]
  
    return (
        <div className={`text-white rounded-2xl px-2 max-w-fit inline ${style}`} style={{ backgroundColor: bgColor }}>
            <span className={`${fontSize}`}>
                {formatCategory(category)}
            </span>
        </div>
    )
}