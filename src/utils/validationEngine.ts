import { Validators } from "./validator";
import { ValidationRule } from "../types";

class ValidationEngine {
  public static validate(rule: ValidationRule): boolean {
    return true;
  }
}

const validationEngine = new ValidationEngine();

export default validationEngine;
