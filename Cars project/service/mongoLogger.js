const { createLogger, format, transports } = require("winston");
const { combine, timestamp, prettyPrint, colorize } = format;
require("winston-mongodb");


const mongoLog = createLogger({
  level: "info",
  format: combine(timestamp(), prettyPrint(), colorize()),
  transports: [
    new transports.Console({ level: "info" }),
    new transports.MongoDB({ db: process.env.MONGO_URI }),
  ],
});

module.exports = mongoLog;