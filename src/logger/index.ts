import winston from "winston";

import devLogger from "./devLogger";
import prodLogger from "./prodLogger";

enum levels {
  error,
  warn,
  info,
  http,
  verbose,
  debug,
  silly,
}

let logger = devLogger;

if (process.env.ENV == "prod") {
}

export default logger;
