interface AuthCookies {
  access_token?: string;
  refresh_token?: string;
}

export interface AuthRequest extends Request {
  user?: JwtPayload;
  cookies: AuthCookies;
}

export interface JwtPayload {
  sub: string;
  email: string;
  role?: string;
}
