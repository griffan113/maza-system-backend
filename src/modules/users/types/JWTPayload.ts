export type JWTPayload = {
  iat: number;
  exp: number;
  sub: string;
  is_admin: boolean;
};
