export type Tokens = {
  accessToken: string;
  refreshToken: string;
};

export interface BlacklistedToken {
  token: string;
  exp: number;
}
