export enum CommentReportTypeEnum {
  SPAM = 'SPAM', // 스팸
  INAPPROPRIATE = 'INAPPROPRIATE', // 부적절한 내용
  HARASSMENT = 'HARASSMENT', // 괴롭힘
  HATE_SPEECH = 'HATE_SPEECH', // 혐오 발언
  FAKE_NEWS = 'FAKE_NEWS', // 허위 정보
  OTHER = 'OTHER', // 기타
}

export enum CommentReportStatusEnum {
  PENDING = 'PENDING', // 대기중
  APPROVED = 'APPROVED', // 승인됨 (신고 인정)
  REJECTED = 'REJECTED', // 거절됨 (신고 기각)
  IN_REVIEW = 'IN_REVIEW', // 검토중
}
