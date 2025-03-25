export const formatCategory = (category?: string) => {
    if (!category) return "-";
    return category
      .toLocaleLowerCase()
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
};