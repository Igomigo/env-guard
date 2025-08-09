export interface IOptions {
  exitOnFail: boolean;
  logStyle: "color" | "plain";
}

// A map of environment variable names to metadata/flags.
export type RequiredVarsMap = Record<string, unknown>;

export interface EnvGuardConfig {
  required: RequiredVarsMap;
  options?: IOptions;
}
