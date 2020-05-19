import winston from 'winston';

const { WINSTON_LOG_LEVEL } = process.env;

export const logger = winston.createLogger({
  level: WINSTON_LOG_LEVEL || 'info',
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple(),
      ),
    }),
  ],
});
