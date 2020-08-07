var winston = require('winston');
var expressWinston = require('express-winston');

module.exports = {
  logger(app) {
    app.use(
      expressWinston.logger({
        transports: [new winston.transports.Console()],
        format: winston.format.combine(
          winston.format.colorize(),
          winston.format.json()
        ),
      })
    );
  },
  errorLogger(app) {
    app.use(
      expressWinston.errorLogger({
        transports: [new winston.transports.Console()],
        format: winston.format.combine(
          winston.format.colorize(),
          winston.format.json()
        ),
      })
    );
  },
};
