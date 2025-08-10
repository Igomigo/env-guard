export class Validators {
  /**
   * Validates if the value is a string
   * @param value - The value to validate
   * @returns true if the value is a string, false otherwise
   */
  public static isString(value: string): boolean {
    return typeof value === "string" && value.trim().length > 0;
  }

  /**
   * Validates if the value is a number
   * @param value - The value to validate
   * @returns true if the value is a number, false otherwise
   */
  public static isNumber(value: number): boolean {
    return !isNaN(value);
  }

  /**
   * Validates common boolean string representations.
   */
  public static isBooleanString(value: string): boolean {
    const normalized = value.trim().toLowerCase();
    return ["true", "false", "1", "0", "yes", "no"].includes(normalized);
  }

  /**
   * Validates if the value is a URL
   * @param value - The value to validate
   * @returns true if the value is a URL, false otherwise
   */
  public static isUrl(value: string): boolean {
    return /^(http|https):\/\/.+/.test(value);
  }

  /**
   * Validates if the value is a valid email address
   * @param value - The value to validate
   * @returns true if the value is a valid email address, false otherwise
   */
  public static isEmail(value: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  }
}
