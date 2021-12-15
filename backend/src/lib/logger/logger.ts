import { LoggerService } from '@nestjs/common';
import * as winston from 'winston';
import * as moment from 'moment';

// const { combine, timestamp, label, printf } = winston.format;

const myFormat = winston.format.printf(({ level, message, timestamp }) => {
  return `${timestamp} [${level}]: ${JSON.stringify(message)}`;
});

export class winstonLogger implements LoggerService {
  private logger: winston.Logger;

  constructor() {
    const { combine, timestamp } = winston.format;
    this.logger = winston.createLogger({
      format: combine(timestamp(), myFormat),
      transports: [
        new winston.transports.File({
          filename: `error-${moment().format('YYYY-MM-DD')}.log`,
          level: 'error',
          dirname: 'logs',
          maxsize: 500000,
        }),
      ],
    });
  }
  /**
   * Write a 'log' level log.
   */
  log(message: any, ...optionalParams: any[]) {
    this.logger.info(message);
  }

  /**
   * Write an 'error' level log.
   */
  error(message: any, ...optionalParams: any[]) {
    this.logger.error({
      message: message,
    });
  }

  /**
   * Write a 'warn' level log.
   */
  warn(message: any, ...optionalParams: any[]) {
    this.logger.warn(message);
  }

  /**
   * Write a 'debug' level log.
   */
  debug?(message: any, ...optionalParams: any[]) {
    this.logger.debug(message);
  }

  /**
   * Write a 'verbose' level log.
   */
  verbose?(message: any, ...optionalParams: any[]) {
    this.logger.verbose(message);
  }
}
``;
