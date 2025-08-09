import { DEFAULT_OPTIONS } from "./config/defaults";
import { EnvGuardConfig, IOptions } from "./types";

export class EnvGuard {
  private requiredVars: EnvGuardConfig["required"];
  private options: IOptions;

  constructor(config: EnvGuardConfig) {
    this.requiredVars = config.required;
    this.options = { ...DEFAULT_OPTIONS, ...config.options };
  }

  private validate() {}
}
