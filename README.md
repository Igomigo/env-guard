## EnvGuard 🛡️⚔️

Simple, framework-agnostic SDK for validating required environment variables in Node.js apps. Keep configs clean, fail fast with friendly, well-formatted logs.

### Features

- **Zero coupling to dotenv** (or any loader) – you bring envs, EnvGuard validates
- **Simple rules**: 'string' | 'number' | 'boolean' | 'url' | 'email'
- **Clean output** with minimal color (or plain mode)
- **Fail-fast** option to exit process on invalid/missing envs
- **Tiny surface area** and TypeScript types out of the box

### Installation

```bash
npm install env-guard
# or
yarn add env-guard
# or
pnpm add env-guard
```

### Quick Start (TypeScript)

```ts
import { EnvGuard, EnvGuardConfig } from "env-guard";

const config: EnvGuardConfig = {
  required: {
    API_KEY: "string",
    PORT: "number",
    DATABASE_URL: "url",
    ADMIN_EMAIL: "email",
    DEBUG_MODE: "boolean",
  },
  options: {
    exitOnFail: true,
    logStyle: "color",
  },
};

new EnvGuard(config).validate();
```

### Quick Start (JavaScript)

```js
const { EnvGuard } = require("env-guard");

const config = {
  required: {
    API_KEY: "string",
    PORT: "number",
    DATABASE_URL: "url",
    ADMIN_EMAIL: "email",
    DEBUG_MODE: "boolean",
  },
  options: {
    exitOnFail: true,
    logStyle: "color",
  },
};

new EnvGuard(config).validate();
```

### Using with dotenv (optional)

```ts
import dotenv from "dotenv";
dotenv.config();

import { EnvGuard } from "env-guard";
new EnvGuard({ required: { API_KEY: "string" } }).validate();
```

EnvGuard only reads `process.env`. Load envs however you prefer (dotenv, shell, CI vars, Docker, etc.).

### Configuration

- **required**: map of env var names to rule strings
  - Allowed rules: `'string' | 'number' | 'boolean' | 'url' | 'email'`
  - Note on enums: treat enums as strings in phase 1; enforce allowed values in your app logic
  - Important: use string literals for rules. Do not pass TypeScript types like `string`/`number`.
- **options** (optional):
  - `exitOnFail` (boolean): exit process with code 1 when invalid – default `true`
  - `logStyle` ("color" | "plain"): colorized or plain output – default `color`

Default options:

```ts
{
  exitOnFail: true,
  logStyle: 'color'
}
```

### Runtime behavior

- `validate()` checks each required env var:
  - Missing → error collected
  - Present but wrong type → error collected
- If there are errors:
  - A friendly block is printed
  - If `exitOnFail` is `true`, the process exits with code `1`
- Returns `true` when valid, `false` otherwise

### Output examples

Color style (colors not rendered here):

```text
[env-guard] Oops… preflight checks failed

The following environment variables need attention:
- ✖ Missing required environment variable: "DATABASE_URL"
- ✖ Environment variable "PORT" must be a valid number.
- ✖ Environment variable "ADMIN_EMAIL" must be a valid email.

Action: Update your environment (.env, shell, CI) and restart the app.
Status: Not cleared for takeoff 🚫🚀
```

Plain style:

```text
[env-guard] Oops… preflight checks failed

The following environment variables need attention:
- ✖ Missing required environment variable: "DATABASE_URL"
- ✖ Environment variable "PORT" must be a valid number.
- ✖ Environment variable "ADMIN_EMAIL" must be a valid email.

Action: Update your environment (.env, shell, CI) and restart the app.
Status: Not cleared for takeoff 🚫🚀
```

Success message:

```text
[env-guard] ✅ Environment variables validated successfully, server is cleared for takeoff! 🚀
```

### Best practices

- Load envs early (before creating your server/app)
- Keep secrets out of source control; use `.env` for local dev and CI secrets for pipelines
- Run EnvGuard in CI to catch misconfigurations before deploy

### Compatibility

- Node.js: 14+ recommended
- Module format: CommonJS build
- Colors: Uses `chalk@4` (CommonJS). If your app is pure ESM and you prefer `chalk@5`, migrate your project to ESM.

### API Reference

```ts
class EnvGuard {
  constructor(config: EnvGuardConfig);
  validate(): boolean;
}

type ValidationRule = "string" | "number" | "boolean" | "url" | "email";

interface IOptions {
  exitOnFail: boolean;
  logStyle: "color" | "plain";
}

interface EnvGuardConfig {
  required: Record<string, ValidationRule>;
  options?: IOptions;
}
```

### Troubleshooting

- “Why isn’t `{ PORT: number }` working?”
  - Rules must be string literals (e.g., `{ PORT: 'number' }`). TypeScript types do not exist at runtime.
- “What counts as a boolean?”
  - Accepted: `"true" | "false" | "1" | "0" | "yes" | "no"` (case-insensitive)
- “Do I need dotenv?”
  - No. EnvGuard only reads `process.env`. Use any loader or deployment env.

### Contributing

Issues and PRs are welcome.

### License

ISC © Igomigo Fatai Victor
