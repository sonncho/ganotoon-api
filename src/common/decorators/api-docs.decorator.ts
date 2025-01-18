import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ErrorCode } from '../constants';

interface ApiDocsOptions {
  summary: string; // API 요약 설명
  description?: string; // API 상세 설명 (optional)
  successType?: any; // 성공 응답의 타입 (DTO 클래스)
  errorCodes?: string[]; // 발생 가능한 에러 코드 목록
}

export function ApiDocs(options: ApiDocsOptions) {
  const { summary, description, successType, errorCodes = [] } = options;

  // successType의 example 데이터 생성
  const successExampleData = successType
    ? Reflect.construct(successType, [])
    : {};

  const errorExamples = errorCodes.reduce((acc, errorCode) => {
    const [domain, code] = errorCode.split('.');
    const error = ErrorCode[domain][code];

    acc[error.code] = {
      summary: error.code,
      value: {
        success: false,
        data: null,
        error: {
          code: error.code,
          message: error.message,
        },
      },
    };

    return acc;
  }, {});

  return applyDecorators(
    ApiOperation({ summary, description }),
    ApiResponse({
      status: 200,
      description: '성공 또는 비즈니스 에러',
      content: {
        'application/json': {
          schema: {
            oneOf: [
              {
                type: 'object',
                properties: {
                  success: { type: 'boolean' },
                  data: successType
                    ? { $ref: `#/components/schemas/${successType.name}` }
                    : { type: 'object' },
                  error: { type: 'null' },
                },
              },
              {
                type: 'object',
                properties: {
                  success: { type: 'boolean' },
                  data: { type: 'null' },
                  error: {
                    type: 'object',
                    properties: {
                      code: { type: 'string' },
                      message: { type: 'string' },
                    },
                  },
                },
              },
            ],
          },
          examples: {
            success: {
              summary: 'Success',
              value: {
                success: true,
                data: successExampleData,
                error: null,
              },
            },
            ...errorExamples,
          },
        },
      },
    }),
  );
}
