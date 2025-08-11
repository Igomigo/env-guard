/**
 * Minimal Express fixture used by E2E tests.
 * It validates env variables via EnvGuard before starting.
 */
import express from "express";
import { EnvGuard } from "../../src/EnvGuard";
import type { EnvGuardConfig } from "../../src/types";

export function createApp(config: EnvGuardConfig) {
  const guard = new EnvGuard(config);
  const ok = guard.validate();
  if (!ok) return null;

  const app = express();
  app.get("/health", (_req, res) => {
    res.json({ ok: true, port: Number(process.env.PORT || 0) });
  });

  return app;
}
