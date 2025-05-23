export const formatStatus = (status: string) => {
    if (status == "complete") {
        return true;
    } else if (status == "incomplete") {
        return false;
    }
    return null;
}