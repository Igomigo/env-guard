export class Validators {
  public static isString(value: string): boolean {
    return typeof value === "string" && value.trim().length > 0;
  }

  public static isNumber(value: number): boolean {
    return !isNaN(value);
  }

  public static isBoolean(value: boolean): boolean {
    return typeof value === "boolean";
  }

  public static isUrl(value: string): boolean {
    return /^https?:\/\/.+/.test(value);
  }

  public static isEmail(value: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  }
}
