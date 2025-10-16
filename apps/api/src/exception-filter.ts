import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';
import {
  PrismaClientKnownRequestError,
  PrismaClientUnknownRequestError,
  PrismaClientValidationError,
} from '@prisma/client/runtime/library';
import { Response } from 'express';

const prismaErrors = [
  PrismaClientValidationError,
  PrismaClientKnownRequestError,
  PrismaClientUnknownRequestError,
];

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const httpStatus =
      exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;

    if (prismaErrors.some((error) => exception instanceof error)) {
      console.log('PrismaError', exception);

      return response.status(httpStatus).json({
        message: 'Er is iets misgegaan. Probeer het later opnieuw.',
        error: 'PrismaError',
        statusCode: httpStatus,
      });
    }

    const body =
      exception instanceof HttpException
        ? exception.getResponse()
        : {
            message: exception instanceof Error ? exception.message : 'Internal server error',
            error: exception instanceof Error ? exception.name : 'Error',
            statusCode: httpStatus,
          };

    return response.status(httpStatus).json(body);
  }
}
