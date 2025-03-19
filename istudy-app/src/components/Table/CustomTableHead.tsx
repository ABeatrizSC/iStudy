import theme from '@/resources/assets/styles/Theme';
import { TableCell, TableHead, TableRow } from '@mui/material';

export interface Column {
    id: 'subject' | 'category' | 'total-time' | 'time-completed' | 'actions';
    label: string;
    minWidth?: number;
    align?: 'center';
    format?: (value: number) => string;
}

interface TableHeadProps {
    columns: Column[],
    bgColor?: string,
}

export const CustomTableHead: React.FC<TableHeadProps> = ({ columns , bgColor = theme.palette.primary.main}) => {
    return (
        <TableHead>
            <TableRow>
                {columns.map((column) => (
                    <TableCell 
                        key={column.id} 
                        align={column.align}
                        sx={{ backgroundColor: bgColor, color: "white" }}
                    >
                        {column.label}
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    )
}