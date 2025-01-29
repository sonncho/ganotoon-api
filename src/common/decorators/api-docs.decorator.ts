import { applyDecorators } from '@nestjs/common';
import { ApiExtraModels, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ErrorCode } from '../constants';

interface ApiDocsOptions {
  summary: string; // API 요약 설명
  description?: string; // API 상세 설명 (optional)
  response?: any; // 성공 응답의 타입 (DTO 클래스)
  errorCodes?: string[]; // 발생 가능한 에러 코드 목록
}

export function ApiDocs(options: ApiDocsOptions) {
  const { summary, description, response, errorCodes = [] } = options;

  // 성공 응답의 예제 데이터 생성
  const successExampleData = response?.example?.() || {};

  return applyDecorators(
    ...(response ? [ApiExtraModels(response)] : []),
    ApiOperation({ summary, description }),
    ApiResponse({
      status: 200,
      description: '성공 및 비즈니스 에러',
      content: {
        'application/json': {
          schema: {
            oneOf: [
              {
                type: 'object',
                properties: {
                  success: { type: 'boolean' },
                  data: response
                    ? {
                        $ref: `#/components/schemas/${response.name}`,
                      }
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
            '정상 응답': {
              summary: '정상 응답',
              description: 'API 호출 성공',
              value: {
                success: true,
                data: successExampleData,
                error: null,
              },
            },
            ...errorCodes.reduce((acc, errorCode) => {
              const [domain, code] = errorCode.split('.');
              const error = ErrorCode[domain][code];

              acc[`비즈니스 에러: ${error.code}`] = {
                summary: `비즈니스 에러: ${error.code}`,
                description: error.message,
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
            }, {}),
          },
        },
      },
    }),
  );
}
