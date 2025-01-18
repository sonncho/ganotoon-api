export function parseDuration(duration: string): number {
  const value = parseInt(duration.slice(0, -1));
  const unit = duration.slice(-1);

  switch (unit) {
    case 'd':
      return value * 24 * 60 * 60 * 1000; // 일 -> 밀리초
    case 'h':
      return value * 60 * 60 * 1000; // 시간 -> 밀리초
    case 'm':
      return value * 60 * 1000; // 분 -> 밀리초
    case 's':
      return value * 1000; // 초 -> 밀리초
    default:
      throw new Error('Invalid duration format');
  }
}

// 사용 예시:
// parseDuration('7d')  // 604800000 (7일)
// parseDuration('24h') // 86400000 (24시간)
// parseDuration('30m') // 1800000 (30분)
// parseDuration('60s') // 60000 (60초)
