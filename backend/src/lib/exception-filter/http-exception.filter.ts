import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';

import { winstonLogger } from 'src/lib/logger/logger';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    const logger = new winstonLogger();

    const res = response.status(status).send({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
    });

    logger.error({
      statusCode: status,
      path: request.url,
      message: exception.message,
    });
  }
}
