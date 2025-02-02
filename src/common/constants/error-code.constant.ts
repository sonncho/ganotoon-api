export const ErrorCode = {
  AUTH: {
    UNAUTHORIZED: {
      code: 'AUTH_UNAUTHORIZED',
      message: '인증이 필요합니다.',
    },
    INVALID_TOKEN: {
      code: 'AUTH_INVALID_TOKEN',
      message: '유효하지 않은 토큰입니다.',
    },
    TOKEN_EXPIRED: {
      code: 'AUTH_TOKEN_EXPIRED',
      message: '만료된 토큰입니다.',
    },
    TOKEN_BLACKLISTED: {
      code: 'AUTH_TOKEN_BLACKLISTED',
      message: '폐기된 토큰입니다.',
    },
  },
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
    EMAIL_NOT_VERIFIED: {
      code: 'USER_EMAIL_NOT_VERIFIED',
      message: '이메일 인증이 필요합니다.',
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
    DAILY_LIMIT_EXCEEDED: {
      code: 'COMMON_DAILY_LIMIT_EXCEEDED',
      message: '일일 최대 전송 횟수를 초과했습니다. 내일 다시 시도해주세요.',
    },
    EMAIL_SEND_FAILED: {
      code: 'COMMON_EMAIL_SEND_FAILED',
      message: '이메일 발송에 실패했습니다.',
    },
  },
  POST: {
    NOT_FOUND: {
      code: 'POST_NOT_FOUND',
      message: '게시글을 찾을 수 없습니다.',
    },
    TYPE_NOT_FOUND: {
      code: 'POST_TYPE_NOT_FOUND',
      message: '존재하지 않는 게시판 유형입니다.',
    },
    NO_WRITE_PERMISSION: {
      code: 'POST_NO_WRITE_PERMISSION',
      message: '해당 게시판에 글을 작성할 권한이 없습니다.',
    },
  },
  COMMENT: {
    NOT_FOUND: {
      code: 'COMMENT_NOT_FOUND',
      message: '댓글을 찾을 수 없습니다',
    },
    NO_PERMISSION: {
      code: 'COMMENT_NO_PERMISSION',
      message: '댓글을 수정할 권한이 없습니다',
    },
    PARENT_NOT_FOUND: {
      code: 'COMMENT_PARENT_NOT_FOUND',
      message: '부모 댓글을 찾을 수 없습니다',
    },
    NESTED_REPLY_NOT_ALLOWED: {
      code: 'COMMENT_NESTED_REPLY_NOT_ALLOWED',
      message: '대댓글에는 답글을 작성할 수 없습니다',
    },
  },
} as const;
