import { DEFAULT_OPTIONS } from "./config/defaults";
import { EnvGuardConfig, IOptions } from "./types";
import { loadEnv } from "./utils/loader";

export class EnvGuard {
  private requiredVars: EnvGuardConfig["required"];
  private options: IOptions;

  constructor(config: EnvGuardConfig) {
    this.requiredVars = config.required;
    this.options = { ...DEFAULT_OPTIONS, ...config.options };
  }

  public validate() {
    // Array of accumulated Errors if any
    let errors: string[] = [];

    // Validate each required variable
    for (const [varName, rule] of Object.entries(this.requiredVars)) {
      // Check if the variable is set
      if (!loadEnv(varName)) {
        errors.push(
          `Missing required environment variable - ${varName} with rule ${rule}`
        );
        continue;
      }


    }
  }
}
