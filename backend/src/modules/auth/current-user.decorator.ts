import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import type { AuthedRequest } from './auth.types.js';

export const CurrentUserId = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext): number | undefined =>
    ctx.switchToHttp().getRequest<AuthedRequest>().user?.sub,
);