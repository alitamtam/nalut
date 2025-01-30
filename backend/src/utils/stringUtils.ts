// src/utils/stringUtils.ts

/**
 * Capitalize the first letter of a string.
 * @param str - The string to capitalize.
 * @returns The capitalized string.
 */
export const capitalize = (str: string): string => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };
  
  /**
   * Truncate a string to a specified length.
   * @param str - The string to truncate.
   * @param maxLength - The maximum length of the string.
   * @returns The truncated string.
   */
  export const truncate = (str: string, maxLength: number): string => {
    return str.length > maxLength ? str.slice(0, maxLength) + "..." : str;
  };