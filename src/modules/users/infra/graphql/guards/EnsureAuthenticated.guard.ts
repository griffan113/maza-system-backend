import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { verify } from 'jsonwebtoken';

import authConfig from '@config/auth';

interface TokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

export class EnsureAuthenticated implements CanActivate {
  public async canActivate(ctx: ExecutionContext) {
    const createGqlContext = GqlExecutionContext.create(ctx).getContext();

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
