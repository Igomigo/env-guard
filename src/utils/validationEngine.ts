import { Validators } from "./validator";
import { ValidationRule } from "../types";
export class ValidationEngine {
  /**
   * Validates the environment variable value against the rule
   * @param value - The value to validate
   * @param rule - The rule to validate against
   * @returns true if the value is valid, false otherwise
   */
  public static validate(value: string, rule: ValidationRule): boolean {
    switch (rule) {
      case "string":
        return Validators.isString(value);
      case "number":
        return Validators.isNumber(Number(value));
      case "boolean":
        return Validators.isBooleanString(value);
      case "url":
        return Validators.isUrl(value);
      case "email":
        return Validators.isEmail(value);
      default:
        return false;
    }
  }
}
