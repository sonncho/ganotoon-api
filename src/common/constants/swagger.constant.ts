export const SWAGGER_API_TAG = {
  HEALTH: {
    name: 'Health',
    description: '서버 상태 체크 API',
    order: 1, // 가장 먼저 보이도록
  },
  AUTH: {
    name: 'Auth',
    description: '인증 관련 API',
    order: 2,
  },
  USERS: {
    name: 'Users',
    description: '사용자 관리 API',
    order: 3,
  },
  WEBTOONS: {
    name: 'Webtoons',
    description: '웹툰 관리 API',
    order: 4,
  },
  EPISODES: {
    name: 'Episodes',
    description: '에피소드 관리 API',
    order: 5,
  },
  COMMENTS: {
    name: 'Comments',
    description: '댓글 관리 API',
    order: 6,
  },
  LIKES: {
    name: 'Likes',
    description: '좋아요 관리 API',
    order: 7,
  },
} as const;
