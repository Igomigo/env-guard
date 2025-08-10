export const loadEnv = (varName: string): string | undefined => {
  return process.env[varName];
};
