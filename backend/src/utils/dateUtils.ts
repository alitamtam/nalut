// src/utils/dateUtils.ts

/**
 * Format a date to a human-readable string.
 * @param date - The date to format.
 * @returns A formatted date string (e.g., "October 5, 2023").
 */
export const formatDate = (date: Date): string => {
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };
  
  /**
   * Calculate the difference between two dates in days.
   * @param date1 - The first date.
   * @param date2 - The second date.
   * @returns The difference in days.
   */
  export const getDateDifferenceInDays = (date1: Date, date2: Date): number => {
    const timeDifference = Math.abs(date1.getTime() - date2.getTime());
    return Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
  };