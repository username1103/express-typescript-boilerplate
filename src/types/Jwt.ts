export type TokenType = 'ACCESS' | 'REFRESH';

export interface JwtPayload {
  sub: string;
  iat: number;
  exp: number;
  type: TokenType;
}
