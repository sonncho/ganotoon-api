import { HttpException } from '@nestjs/common';

export class BusinessException extends HttpException {
  constructor(error: { code: string; message: string }) {
    super(
      {
        success: false,
        data: null,
        error: {
          code: error.code,
          message: error.message,
        },
      },
      200,
    );
  }
}
