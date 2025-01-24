import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';
import { ErrorCode } from '../constants/error-code.constant';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    if (exception instanceof HttpException) {
      const exceptionResponse = exception.getResponse() as any;

      // BusinessException에서 발생한 에러
      if (exceptionResponse.error) {
        response.status(200).json(exceptionResponse);
        return;
      }

      // ValidationPipe 등에서 발생한 에러
      response.status(200).json({
        success: false,
        data: null,
        error: ErrorCode.COMMON.VALIDATION_ERROR,
      });
      return;
    }

    // 예상치 못한 서버 에러
    console.error(exception);
    response.status(500).json({
      success: false,
      data: null,
      error: ErrorCode.COMMON.INTERNAL_ERROR,
    });
  }
}
