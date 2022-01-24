import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Reflector } from '@nestjs/core';
import { verify } from 'jsonwebtoken';

import authConfig from '@config/auth';
import { IS_PUBLIC_KEY } from '../decorators/SetPublicRoute.decorator';

interface TokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

@Injectable()
export class EnsureAuthenticated implements CanActivate {
  constructor(private reflector: Reflector) {}

  public async canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }

    const createGqlContext = GqlExecutionContext.create(context).getContext();

    const request = createGqlContext.req;

    const authHeader = request.headers.authorization;

    if (!authHeader) {
      throw new ForbiddenException('JWT token missing.');
    }

    const [, token] = authHeader.split(' ');

    try {
      console.log('a');

      const decoded = verify(token, authConfig.jwt.secret, {});
      console.log(decoded);

      const { sub } = decoded as TokenPayload;

      // Expose user object inside request
      request.user = {
        id: sub,
      };

      return true;
    } catch {
      throw new ForbiddenException('Invalid JWT token.');
    }
  }
}
