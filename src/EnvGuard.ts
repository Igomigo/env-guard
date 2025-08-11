import { DEFAULT_OPTIONS } from "./config/defaults";
import { EnvGuardConfig } from "./types";
import { ErrorFormatter } from "./utils/formatter";
import { getEnvVar } from "./utils/loader";
import { ValidationEngine } from "./utils/validationEngine";

export class EnvGuard {
  private requiredVars: EnvGuardConfig["required"];
  private options: EnvGuardConfig["options"];

  constructor(config: EnvGuardConfig) {
    this.requiredVars = config.required;
    this.options = { ...DEFAULT_OPTIONS, ...config.options };
  }

  /**
   * Validates environment variables against the required configuration rules.
   * When called, it checks if all variables defined in the config exist in .env
   * and match their specified validation rules (e.g. 'string', 'number', 'url', etc).
   * 
   * @returns {boolean} true if all environment variables are valid and present, false if validation fails
   * @example
   * const config = {
   *   required: {
   *     API_KEY: "string",
   *     PORT: "number"
   *   }
   * };
   * const guard = new EnvGuard(config);
   * guard.validate(); // Validates API_KEY and PORT in .env
   */
  public validate() {
    // Array of accumulated Errors if any
    const errors: string[] = [];

    // Validate each required variable
    for (const [varName, rule] of Object.entries(this.requiredVars)) {
      // Load once per variable
      const value = getEnvVar(varName);
      if (!value) {
        errors.push(`Missing required environment variable: ${varName}`);
        continue;
      }

      // Validate the value against the rule
      const isValid = ValidationEngine.validate(value, rule);

      if (!isValid) {
        errors.push(
          `Environment variable "${varName}" must be a valid ${rule}.`
        );
      }
    }

    // If there are errors, format them and exit if configured to do so
    if (errors.length > 0) {
      const formattedErrors = ErrorFormatter.formatErrors(
        errors,
        this.options?.logStyle!
      );
      if (this.options?.exitOnFail) {
        console.log(formattedErrors);
        process.exit(1);
      } else {
        console.log(formattedErrors);
      }
    } else {
      // Log success message when all env vars are valid
      console.log(
        "[env-guard] ✅ Environment variables validated successfully, server is cleared for takeoff! 🚀"
      );
    }

    return errors.length === 0;
  }
}
