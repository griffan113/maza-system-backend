import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Reflector } from '@nestjs/core';
import { verify } from 'jsonwebtoken';

import authConfig from '@config/auth';
import { IS_PUBLIC_KEY } from '@modules/users/infra/graphql/decorators/SetPublicRoute.decorator';
import { IS_ADMIN_KEY } from '@modules/users/infra/graphql/decorators/SetAdminRoute.decorator';
import { JWTPayload } from '@modules/users/types/JWTPayload';

@Injectable()
export class EnsureAuthenticated implements CanActivate {
  constructor(private reflector: Reflector) {}

  public async canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    const isAdminRequired = this.reflector.getAllAndOverride<boolean>(
      IS_ADMIN_KEY,
      [context.getHandler(), context.getClass()]
    );

    if (isPublic) {
      return true;
    }

    const createGqlContext = GqlExecutionContext.create(context).getContext();

    const request = createGqlContext.req;

    const authHeader = request.headers.authorization;

    if (!authHeader) {
      throw new ForbiddenException('Token JWT não encontrado.');
    }

    const [, token] = authHeader.split(' ');

    try {
      const decoded = verify(token, authConfig.jwt.secret, {});
      console.log(decoded);

      const { sub, is_admin } = decoded as JWTPayload;

      if (!isAdminRequired && !is_admin)
        throw new UnauthorizedException('Você não tem acesso a este recurso.');

      // Expose user object inside request
      request.user = {
        id: sub,
        is_admin,
      };

      return true;
    } catch {
      throw new ForbiddenException('Token JWT inválido.');
    }
  }
}
