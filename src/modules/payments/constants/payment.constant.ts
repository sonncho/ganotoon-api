export enum DiamondProductType {
  BUNDLE = 'BUNDLE', // 묶음 상품
  SINGLE = 'SINGLE', // 낱개 상품
}

export enum PaymentStatus {
  PENDING = 'PENDING', // 결제 대기
  COMPLETED = 'COMPLETED', // 결제 완료
  FAILED = 'FAILED', // 결제 실패
  REFUNDED = 'REFUNDED', // 환불됨
}

export enum PaymentMethod {
  CARD = 'CARD', // 신용카드
  BANK_TRANSFER = 'BANK_TRANSFER', // 계좌이체
  VIRTUAL_ACCOUNT = 'VIRTUAL_ACCOUNT', // 가상계좌
}

export enum TransactionType {
  CHARGE = 'CHARGE', // 충전
  PURCHASE = 'PURCHASE', // 구매(사용)
  REFUND = 'REFUND', // 환불
  EVENT = 'EVENT', // 이벤트 지급
}
