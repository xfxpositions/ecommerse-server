import winston from "winston";
import path from "path";
import { format } from "winston";
import moment from "moment-timezone";

const logsFolder = path.join(__dirname, "logs", "dev");

// PC'nin yerel zaman dilimini alalım
const localTimezone = moment.tz.guess();

const logger = winston.createLogger({
  level: "info",
  format: format.combine(
    format.colorize(),
    format.timestamp({
      format: "DD-MM-YYYY HH:mm:ss",
    }),
    format.printf(({ timestamp, level, message }) => {
      return `[${timestamp}] ${level}: ${message}`;
    })
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({
      filename: path.join(logsFolder, "info.log"),
      level: "info",
    }),
    new winston.transports.File({
      filename: path.join(logsFolder, "error.log"),
      level: "error",
    }),
    new winston.transports.File({
      filename: path.join(logsFolder, "warn.log"),
      level: "warn",
    }),
    new winston.transports.File({
      filename: path.join(logsFolder, "debug.log"),
      level: "debug",
    }),
    new winston.transports.File({
      filename: path.join(logsFolder, "verbose.log"),
      level: "verbose",
    }),
    new winston.transports.File({
      filename: path.join(logsFolder, "silly.log"),
      level: "silly",
    }),
    new winston.transports.File({
      filename: path.join(logsFolder, "combined.log"),
    }),
  ],
});

export default logger;
