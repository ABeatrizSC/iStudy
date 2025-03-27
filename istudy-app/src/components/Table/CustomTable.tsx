import Table from '@mui/material/Table';
import TableContainer from '@mui/material/TableContainer';

interface TableProps {
    children: React.ReactNode,
}
export const CustomTable: React.FC<TableProps> = ({ children }) => {
    return (
        <TableContainer sx={{ overflowY: "auto" }} className="w-full rounded-lg">
            <Table stickyHeader aria-label="sticky table">
                {children}
            </Table>
        </TableContainer>
    )
}