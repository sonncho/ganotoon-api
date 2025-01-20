export const ErrorCode = {
  USER: {
    NOT_FOUND: {
      code: 'USER_NOT_FOUND',
      message: '사용자를 찾을 수 없습니다.',
    },
    EMAIL_DUPLICATE: {
      code: 'USER_EMAIL_DUPLICATE',
      message: '이미 사용중인 이메일입니다.',
    },
    NICKNAME_DUPLICATE: {
      code: 'USER_NICKNAME_DUPLICATE',
      message: '이미 사용중인 닉네임입니다.',
    },
    INVALID: {
      code: 'USER_INVALID',
      message: '잘못된 이메일 또는 비밀번호입니다',
    },
    ACCESS_DENIED: {
      code: 'USER_ACCESS_DENIED',
      message: '접근이 거부됬습니다',
    },
  },
  COMMON: {
    INTERNAL_ERROR: {
      code: 'COMMON_INTERNAL_ERROR',
      message: '서버 오류가 발생했습니다.',
    },
    VALIDATION_ERROR: {
      code: 'COMMON_VALIDATION_ERROR',
      message: '입력값이 올바르지 않습니다.',
    },
    INVALID_CODE: {
      code: 'COMMON_INVALID_CODE',
      message: '유효한 인증코드가 아닙니다.',
    },
  },
} as const;
