export function formatTimeToNumber(time?: string): number {
    if (!time) return 0;
    const [hours, minutes] = time.split(':').map(Number);
    return hours + minutes / 60;
}
