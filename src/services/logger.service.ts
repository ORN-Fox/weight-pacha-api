import winston from "winston";
import DailyRotateFile from "winston-daily-rotate-file";

const { combine, timestamp, printf, colorize, align } = winston.format;

const logger = winston.createLogger({
  level: "info",
  format: combine(
    colorize({ all: true }),
    timestamp({
      format: "YYYY-MM-DD hh:mm:ss.SSS A",
    }),
    align(),
    printf((info) => `${info.timestamp as string} - ${info.level}: ${info.message as string}`),
  ),
  defaultMeta: { service: "weight-pacha-api" },
  transports: [
    new DailyRotateFile({
      dirname: "logs",
      filename: "weight-pacha-api-%DATE%.log", // Filename format including date
      datePattern: "YYYY-MM-DD", // Rotate every day
      maxSize: "20m", // Maximum file size of 20MB
      maxFiles: "14d", // Keep logs for a maximum of 14 days (or a number of files)
      zippedArchive: true, // Zip archived files
    }),
  ],
});

//
// If we're not in production then log to the `console` with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
//
if (process.env.NODE_ENV !== "production") {
  logger.add(
    new winston.transports.Console({
      format: winston.format.simple(),
    }),
  );
}

export default logger;
