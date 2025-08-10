import { LogStyle } from "../types";
import chalk from "chalk";

/**
 * Formats the errors into a developer-friendly block
 * @param errors - The errors to format
 * @param logStyle - The style of the log
 * @returns The formatted errors
 */
export const formatErrors = (errors: string[], logStyle: LogStyle): string => {
  if (!errors || errors.length === 0) return "";

  const isColor = logStyle === "color";

  const dim = (s: string) => (isColor ? chalk.dim(s) : s);
  const bold = (s: string) => (isColor ? chalk.bold(s) : s);
  const yellowBold = (s: string) => (isColor ? chalk.yellow.bold(s) : s);
  const red = (s: string) => (isColor ? chalk.red(s) : s);
  const redBold = (s: string) => (isColor ? chalk.red.bold(s) : s);
  const cyan = (s: string) => (isColor ? chalk.cyan(s) : s);
  const gray = (s: string) => (isColor ? chalk.gray(s) : s);

  const prefix = dim("[env-guard]");
  const title = `${prefix} ${yellowBold("Oops… preflight checks failed")}`;
  const header = dim("The following environment variables need attention:");

  const colorizeMessage = (msg: string): string => {
    if (!isColor) return msg;
    // Highlight quoted variable names: "VAR_NAME"
    let colored = msg.replace(/"([^"]+)"/g, (_: string, p1: string) =>
      cyan(`"${p1}"`)
    );
    // Highlight ALLCAPS env-like tokens
    colored = colored.replace(/\b[A-Z][A-Z0-9_]{1,}\b/g, (m) => cyan(m));
    return colored;
  };

  const lines: string[] = [];
  lines.push(title);
  lines.push("");
  lines.push(header);

  for (const msg of errors) {
    const bullet = isColor ? red("✖") : "✖";
    lines.push(`- ${bullet} ${colorizeMessage(msg)}`);
  }

  lines.push("");
  lines.push(
    `${gray(
      "Action:"
    )} Update your environment (.env, shell, CI) and restart the app.`
  );
  lines.push(`${redBold("Status: Not cleared for takeoff")} ${dim("🚫🚀")}`);

  return lines.join("\n");
};
