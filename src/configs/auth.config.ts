import { registerAs } from '@nestjs/config';

export const authConfig = registerAs('auth', () => ({
  jwt: {
    accessSecret: process.env.JWT_ACCESS_SECRET,
    refreshSecret: process.env.JWT_REFRESH_SECRET,
    accessExpiresIn: process.env.JWT_ACCESS_EXPIRES_IN || '15m',
    refreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '7d',
  },
  // oauth: {
  //   google: {
  //     clientId: process.env.GOOGLE_CLIENT_ID,
  //     clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  //     callbackURL: process.env.GOOGLE_CALLBACK_URL,
  //   },
  //   kakao: {
  //     clientId: process.env.KAKAO_CLIENT_ID,
  //     clientSecret: process.env.KAKAO_CLIENT_SECRET,
  //     callbackURL: process.env.KAKAO_CALLBACK_URL,
  //   },
  //   naver: {
  //     clientId: process.env.NAVER_CLIENT_ID,
  //     clientSecret: process.env.NAVER_CLIENT_SECRET,
  //     callbackURL: process.env.NAVER_CALLBACK_URL,
  //   },
  // },
}));
