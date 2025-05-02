export const formatNumberToTimeString = (value: number): string => {
    const hours = Math.floor(value);
    const minutes = Math.round((value - hours) * 60);
  
    const hStr = hours > 0 ? `${hours}h` : '';
    const mStr = minutes > 0 ? `${minutes}min` : '';
  
    return `${hStr} ${mStr}`.trim();
  }
  