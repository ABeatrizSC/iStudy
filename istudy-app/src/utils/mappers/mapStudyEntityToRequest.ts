import { StudyRequest, Study } from "@/resources/services/study/study.resource";
import { formatSavedDate } from "../formatters";
import dayjs from "dayjs";

export const mapStudyToRequest = (data?: Study): StudyRequest => ({
    disciplineName: data?.disciplineName ?? "",
    topicName: data?.topicName ?? "",
    time: data?.time ?? "00:00",
    date: data?.date ?? formatSavedDate(dayjs().format("MM/DD/YY")),
    isCompleted: data?.isCompleted ?? false
});
