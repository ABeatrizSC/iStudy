import { LocalizationProvider, TimeField } from "@mui/x-date-pickers"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import dayjs, { Dayjs } from "dayjs";

interface TimeInputProps {
    format: "HH:mm" | "HH:mm:ss";
    value: string | Dayjs;
    onChangeFunc: (value: any) => void;
}

export const TimeInput: React.FC<TimeInputProps> = ({ format, value, onChangeFunc }) => {
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <TimeField
                id={'time'}
                format={format}
                value={dayjs(value, format)}
                onChange={onChangeFunc}
                required
            />
        </LocalizationProvider>
    );
};
