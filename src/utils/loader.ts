/**
 * Loads an environment variable from the process.env object
 * @param varName - The name of the environment variable to load
 * @returns The value of the environment variable or undefined if it is not set
 */
export const loadEnv = (varName: string): string | undefined => {
  const value = process.env[varName];

  if (!value) {
    return undefined;
  }

  return value;
};
