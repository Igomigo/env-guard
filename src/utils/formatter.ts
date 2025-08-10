import { LogStyle } from "../types";
import chalk from "chalk";

export class ErrorFormatter {
  /**
   * Formats the errors into a developer-friendly block
   * @param errors - The errors to format
   * @param logStyle - The style of the log
   * @returns The formatted errors
   */
  public static formatErrors(errors: string[], logStyle: LogStyle): string {
    if (!errors || errors.length === 0) return "";

    const isColor = logStyle === "color";

    const dim = (s: string) => (isColor ? chalk.dim(s) : s);
    const yellowBold = (s: string) => (isColor ? chalk.yellow.bold(s) : s);
    const red = (s: string) => (isColor ? chalk.red(s) : s);
    const redBold = (s: string) => (isColor ? chalk.red.bold(s) : s);
    const gray = (s: string) => (isColor ? chalk.gray(s) : s);

    const prefix = dim("[env-guard]");
    const title = `${prefix} ${yellowBold("Oops… preflight checks failed")}`;
    const header = dim("The following environment variables need attention:");

    const lines: string[] = [];
    lines.push(title);
    lines.push("");
    lines.push(header);

    for (const msg of errors) {
      const bullet = isColor ? red("✖") : "✖";
      lines.push(`- ${bullet} ${this.colorizeEnvMessage(msg, isColor)}`);
    }

    lines.push("");
    lines.push(
      `${gray(
        "Action:"
      )} Update your environment (.env, shell, CI) and restart the app.`
    );
    lines.push(`${redBold("Status: Not cleared for takeoff")} ${dim("🚫🚀")}`);

    return lines.join("\n");
  }

  /**
   * Colorizes a single error message by lightly highlighting env variable tokens.
   * - Highlights quoted names: "VAR_NAME"
   * - Highlights ALLCAPS tokens that look like env vars: FOO_BAR, NODE_ENV
   * When color is disabled, returns the original message.
   */
  private static colorizeEnvMessage(
    message: string,
    enableColor: boolean
  ): string {
    if (!enableColor) return message;
    // Highlight quoted variable names: "VAR_NAME"
    let output = message.replace(/"([^"]+)"/g, (_: string, p1: string) =>
      chalk.cyan(`"${p1}"`)
    );
    // Highlight ALLCAPS env-like tokens
    output = output.replace(/\b[A-Z][A-Z0-9_]{1,}\b/g, (m) => chalk.cyan(m));
    return output;
  }
}
