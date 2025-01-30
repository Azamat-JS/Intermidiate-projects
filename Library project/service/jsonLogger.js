const { createLogger, format, transports } = require("winston");
const { combine, timestamp,  prettyPrint, printf} = format;
require("winston-mongodb");

const customFormat = printf(({ level, message, timestamp }) => {
  return `{
   "timestamp":"${timestamp}"
   "level":"${level}"
   "message": "${message}"
}`;
});

const logger = createLogger({
  level: "info",
  format: combine(timestamp(), customFormat),
  transports: [
    new transports.Console(),
    new transports.File({ filename: "log/json.log" }),
  ],
});

logger.info("A student entered to the system");

module.exports = logger;
