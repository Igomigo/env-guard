import { Validators } from "./validator";
import { ValidationRule } from "../types";

export class ValidationEngine {
  public static validate(value: string, rule: ValidationRule): boolean {
    switch (rule) {
      case "string":
        return Validators.isString(value);
      case "number":
        return Validators.isNumber(Number(value));
      case "boolean":
        return Validators.isBoolean(Boolean(value));
      case "url":
        return Validators.isUrl(value);
      case "email":
        return Validators.isEmail(value);
      default:
        return false;
    }
  }
}
