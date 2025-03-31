import { LocalizationProvider, TimeField } from "@mui/x-date-pickers"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import dayjs, { Dayjs } from "dayjs";

interface TimeInputProps {
    id: string,
    format: "HH:mm" | "HH:mm:ss",
    value: string | Dayjs,
    onChangeFunc: (value: any) => void;
}

export const TimeInput: React.FC<TimeInputProps> = ({ id, format, value, onChangeFunc }) => {
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <TimeField
                id={id}
                format={format}
                value={dayjs(value, format)}
                onChange={onChangeFunc}
                required
            />
        </LocalizationProvider>
    );
};
