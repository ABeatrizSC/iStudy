export const formatTime = (time: string = "00:00:00") => {
    return time.split(":").slice(0,2).join("h") + "min";
}