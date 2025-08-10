export type LogStyle = "color" | "plain";

export type ValidationRule = "string" | "number" | "boolean" | "url" | "email";

export type RequiredVarsMap = Record<string, ValidationRule>;

/**
 * The options object for the EnvGuard class
 */
export interface IOptions {
  exitOnFail: boolean;
  logStyle: LogStyle;
}

/**
 * The configuration object for the EnvGuard class
 */
export interface EnvGuardConfig {
  required: RequiredVarsMap;
  options?: IOptions;
}
