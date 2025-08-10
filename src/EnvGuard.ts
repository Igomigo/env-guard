import { DEFAULT_OPTIONS } from "./config/defaults";
import { EnvGuardConfig } from "./types";
import { formatErrors } from "./utils/formatter";
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
   * Validates the environment variables against the required variables
   * @returns true if the environment variables are valid, false otherwise
   */
  public validate() {
    // Array of accumulated Errors if any
    let errors: string[] = [];

    // Validate each required variable
    for (const [varName, rule] of Object.entries(this.requiredVars)) {
      // Check if the variable is set
      if (!getEnvVar(varName)) {
        errors.push(`Missing required environment variable: ${varName}`);
        continue;
      }

      // Validate the value against the rule
      const isValid = ValidationEngine.validate(
        getEnvVar(varName) as string,
        rule
      );

      if (!isValid) {
        errors.push(
          `Environment variable "${varName}" must be a valid ${rule}.`
        );
      }
    }

    // If there are errors, format them and exit if configured to do so
    if (errors.length > 0) {
      const formattedErrors = formatErrors(errors, this.options?.logStyle!);
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

    return true;
  }
}
