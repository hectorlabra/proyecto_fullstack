import pino from "pino";
import { config } from "./envs";

const isDevelopment = config.NODE_ENV === "development";

export const logger = pino({
  level: isDevelopment ? "debug" : "info",
  transport: isDevelopment
    ? {
        target: "pino-pretty",
        options: {
          colorize: true,
          translateTime: "SYS:standard",
          ignore: "pid,hostname",
        },
      }
    : undefined,
  formatters: {
    level: (label) => {
      return { level: label };
    },
  },
  redact: {
    paths: ["password", "*.password", "authorization", "*.token"],
    censor: "[REDACTED]",
  },
});
