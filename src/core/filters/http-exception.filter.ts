import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';
import { ConfigService } from 'src/config/config.service';
import { ErrorObject } from './error-object.interface';
import { OgmaLogger, OgmaService } from '@ogma/nestjs-module';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  constructor(
    @OgmaLogger(HttpExceptionFilter) private readonly logger: OgmaService,
    private readonly configService: ConfigService,
  ) {}

  catch(exception: HttpException | any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const { url, method } = request;
    const requestId = request.session.id;
    const timestamp = new Date().toISOString();

    // Catch HttpExceptions
    if (exception instanceof HttpException) {
      const status = exception.getStatus();
      const errorMessage = exception.getResponse() as HttpException;

      const errorObject: ErrorObject = {
        statusCode: exception.getStatus(),
        method,
        url,
        timestamp,
        ...errorMessage,
        body: request.body,
      };

      this.logger.warn({ requestId, errorObject });

      return response.status(status).json(errorObject);
    }

    // Catch all other errors with a 500 status
    const status = exception.graph ? HttpStatus.BAD_REQUEST : HttpStatus.INTERNAL_SERVER_ERROR;
    const errorObject: ErrorObject = {
      statusCode: status,
      method,
      url,
      timestamp,
      body: request.body,
    };

    if (exception instanceof Error) {
      errorObject.error = exception.name;
      errorObject.message = exception.message;
    } else {
      errorObject.error = 'INTERNAL SERVER';
    }

    this.logger.error({ requestId, errorObject });

    return response.status(status).json(errorObject);
  }


}
