import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { Response } from 'express';

@Catch(PrismaClientKnownRequestError)
export class PrismaExceptionFilter implements ExceptionFilter {
  private send(response: Response<any, Record<string, any>>) {
    return (statusCode: HttpStatus = HttpStatus.INTERNAL_SERVER_ERROR) => {
      return (message: string = 'Internal Server Error') => {
        return response.status(statusCode).json({ statusCode, message });
      };
    };
  }

  catch(exception: PrismaClientKnownRequestError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse<Response>();

    if (exception.code === 'P2002') {
      let message = exception.message;
      const target =
        (exception.meta?.target as string | undefined)?.toLowerCase() ?? '';
      if (target.includes('user')) {
        message = 'Usuário já cadastrado';
      }
      return this.send(res)(HttpStatus.BAD_REQUEST)(message);
    }

    return this.send(res)()();
  }
}
