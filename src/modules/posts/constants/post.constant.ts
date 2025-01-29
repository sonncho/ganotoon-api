export enum PostTypeEnum {
  NOTICE = 'NOTICE', // 공지사항
  QNA = 'QNA', // Q&A
  FAQ = 'FAQ', // FAQ
  FREE = 'FREE', // 자유게시판
}

// 게시판 권한을 위한 상수 추가
export const POST_TYPE_PERMISSIONS = {
  [PostTypeEnum.NOTICE]: ['ADMIN'], // 공지사항: 관리자만
  [PostTypeEnum.QNA]: ['ADMIN', 'USER'], // QNA: 모든 사용자
  [PostTypeEnum.FAQ]: ['ADMIN'], // FAQ: 관리자만
  [PostTypeEnum.FREE]: ['ADMIN', 'USER'], // 자유게시판: 모든 사용자
} as const;

// 게시글 정렬 기준
export enum PostSortFieldEnum {
  CREATED_AT = 'createdAt',
  VIEW_COUNT = 'viewCount',
}
