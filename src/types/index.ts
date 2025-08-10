type LogStyle = "color" | "plain";

export type ValidationRule = "string" | "number" | "boolean" | "url" | "email";

type RequiredVarsMap = Record<string, ValidationRule>;

export interface IOptions {
  exitOnFail: boolean;
  logStyle: LogStyle;
}
export interface EnvGuardConfig {
  required: RequiredVarsMap;
  options?: IOptions;
}
