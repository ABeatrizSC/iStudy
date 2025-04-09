import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import dayjs from "dayjs";

interface DateInputProps {
    value: string,
    onChangeFunc: (value: any) => void;
}

export const DateInput: React.FC<DateInputProps> = ({ value, onChangeFunc }) => {
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
                value={dayjs(value)}
                onChange={onChangeFunc}
                slotProps={{ textField: { fullWidth: true } }}
            />
        </LocalizationProvider>
    );
};
