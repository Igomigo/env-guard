export interface IOptions {
  exitOnFail: boolean;
  logStyle: "color" | "plain";
}

export type RequiredVarsMap = Record<string, unknown>;

export interface EnvGuardConfig {
  required: RequiredVarsMap;
  options?: IOptions;
}
