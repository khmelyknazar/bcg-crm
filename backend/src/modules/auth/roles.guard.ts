import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from './roles.decorator.js';
import type { AuthedRequest, JwtPayload } from './auth.types.js';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    if (process.env.AUTH_ENABLED !== 'true') return true;

    const roles = this.reflector.getAllAndOverride<JwtPayload['role'][] | undefined>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );
    if (!roles || roles.length === 0) return true;

    const req = context.switchToHttp().getRequest<AuthedRequest>();
    if (!req.user || !roles.includes(req.user.role)) {
      throw new ForbiddenException('Недостатньо прав');
    }
    return true;
  }
}