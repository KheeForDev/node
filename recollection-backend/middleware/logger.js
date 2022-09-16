// refer to the following for documentation
// https://github.com/winstonjs/winston

const path = require("path");
const { createLogger, transports, format } = require("winston");

const customeFormat = format.combine(format.timestamp(), format.printf((info) => {
    return `${info.timestamp} - [${info.level.toLowerCase().padEnd(7)}] - ${info.message}`
}))

const logger = createLogger({
    format: customeFormat,
    transports: [
        new transports.Console(),
        new transports.File({
            filename: path.join(__dirname, "..", "logs", "app.log")
        })
    ]
});

module.exports = logger;