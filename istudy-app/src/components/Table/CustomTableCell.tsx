import { TableCell, SxProps, Theme } from "@mui/material";

interface CustomTableCellProps {
  children: React.ReactNode;
  sx?: SxProps<Theme>;
}

export const CustomTableCell: React.FC<CustomTableCellProps> = ({ children, sx }) => {
  return (
    <TableCell sx={{ textAlign: "center", ...sx }}>
      {children}
    </TableCell>
  );
};