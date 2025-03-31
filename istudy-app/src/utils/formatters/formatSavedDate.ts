import dayjs, { Dayjs } from "dayjs"

export const formatSavedDate = (date: Dayjs | null | string) => {
    return dayjs(date).format("YYYY-MM-DD")
}