const { createLogger, format, transports } = require("winston");
const { combine, timestamp, prettyPrint, colorize, printf,json } = format;
require("winston-mongodb");

const customFormat = printf(({ level, message, timestamp }) => {
  return `[${timestamp}] (${level}): ${message}`;
});

const logger = createLogger({
  level: "info",
  format: combine(timestamp(), prettyPrint(), customFormat),
  transports: [
    new transports.Console({ level: "debug" }),
    new transports.File({ filename: "log/info.log", level: "info" }),
    new transports.File({ filename: "log/errors.log", level: "error" }),
  ],
});

module.exports = logger;
