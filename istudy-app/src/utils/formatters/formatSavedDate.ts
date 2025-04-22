import dayjs, { Dayjs } from "dayjs"

export const formatSavedDate = (date: Dayjs | Date | null | string) => {
    return dayjs(date).format("YYYY-MM-DD")
}