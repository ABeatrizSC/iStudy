export const formatDate = (date: string) => {
    const formattedDate = new Date(date)
    return formattedDate.toLocaleDateString("en-us");
}