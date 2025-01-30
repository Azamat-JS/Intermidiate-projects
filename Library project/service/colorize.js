const { createLogger, format, transports } = require("winston");
const { combine, json, colorize,simple } = format;
require("winston-mongodb");


const colorizeLogger = createLogger({
  level: "info",
  format: combine( json(), colorize({all: true})),
  transports: [
    new transports.Console(),
  ],
});


module.exports = colorizeLogger;