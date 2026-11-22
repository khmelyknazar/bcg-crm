import type { Request } from 'express';

export interface JwtPayload {
  sub: number;
  email: string;
  role: 'OWNER' | 'MANAGER';
}

export interface AuthedRequest extends Request {
  user?: JwtPayload;
}