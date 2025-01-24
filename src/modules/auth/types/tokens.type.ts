export type Tokens = {
  accessToken: string;
  refreshToken: string;
};

export interface BlacklistedToken {
  token: string;
  exp: number;
}

export type JwtPayload = {
  sub: number;
  email: string;
  iat?: number;
  exp?: number;
};
