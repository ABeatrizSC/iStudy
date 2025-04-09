export const formatDate = (date: string, locale: string = "en-us", timeZone: string = "America/Sao_Paulo") => {
    const formattedDate = new Date(date + "T00:00:00");
    return formattedDate.toLocaleDateString(locale, { timeZone });
};