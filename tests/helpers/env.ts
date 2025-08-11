/**
 * Utilities to snapshot and restore environment variables during tests.
 * Keeps each test isolated and avoids cross-test contamination.
 */

/**
 * Takes a shallow snapshot of process.env.
 */
export function snapshotEnv(): Record<string, string | undefined> {
  return { ...process.env };
}

/**
 * Restores process.env from a previous snapshot.
 */
export function restoreEnv(snapshot: Record<string, string | undefined>): void {
  process.env = { ...snapshot } as NodeJS.ProcessEnv;
}
