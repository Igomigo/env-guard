import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import request from "supertest";
import { createApp } from "./expressApp";
import { snapshotEnv, restoreEnv } from "../helpers/env";

let snap: Record<string, string | undefined>;

const baseConfig = {
  required: {
    API_KEY: "string",
    PORT: "number",
    DATABASE_URL: "url",
  },
  options: {
    exitOnFail: false, // keep process alive during tests
    logStyle: "plain", // deterministic string asserts
  },
} as const;

describe("E2E: Express + EnvGuard", () => {
  beforeEach(() => {
    snap = snapshotEnv();
  });

  afterEach(() => {
    restoreEnv(snap);
    vi.restoreAllMocks();
  });

  it("does not start app when required var is missing and logs formatted errors", async () => {
    delete process.env.API_KEY;
    process.env.PORT = "3000";
    process.env.DATABASE_URL = "https://db.example.com";

    const logSpy = vi.spyOn(console, "log");

    const app = createApp(baseConfig);
    expect(app).toBeNull();

    const calls = logSpy.mock.calls.map((c) => String(c[0])).join("\n");
    expect(calls).toContain("[env-guard] Oops… preflight checks failed");
    expect(calls).toContain(
      "The following environment variables need attention:"
    );
    expect(calls).toContain("Missing required environment variable: API_KEY");
    expect(calls).toContain("Status: Not cleared for takeoff");
  });

  it("does not start app when a type is wrong and logs formatted errors", async () => {
    process.env.API_KEY = "secret";
    process.env.PORT = "not-a-number";
    process.env.DATABASE_URL = "https://db.example.com";

    const logSpy = vi.spyOn(console, "log");

    const app = createApp(baseConfig);
    expect(app).toBeNull();

    const calls = logSpy.mock.calls.map((c) => String(c[0])).join("\n");
    expect(calls).toContain("must be a valid number");
  });

  it("starts app when env is valid and responds 200", async () => {
    process.env.API_KEY = "secret";
    process.env.PORT = "3000";
    process.env.DATABASE_URL = "https://db.example.com";

    const app = createApp(baseConfig)!;
    const res = await request(app).get("/health");
    expect(res.status).toBe(200);
    expect(res.body).toMatchObject({ ok: true, port: 3000 });
  });
});
