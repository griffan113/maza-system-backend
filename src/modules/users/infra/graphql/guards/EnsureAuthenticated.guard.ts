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
import type { UserRole } from '@prisma/client';

import authConfig from '@config/auth';
import { IS_PUBLIC_KEY } from '@modules/users/infra/graphql/decorators/SetPublicRoute.decorator';
import { REQUIRED_ROLES } from '@modules/users/infra/graphql/decorators/SetRequiredRoles.decorator';
import { JWTPayload } from '@modules/users/types/JWTPayload';

@Injectable()
export class EnsureAuthenticated implements CanActivate {
  constructor(private reflector: Reflector) {}

  public async canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    const rolesRequired = this.reflector.getAllAndOverride<UserRole[]>(
      REQUIRED_ROLES,
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

      const { sub, role } = decoded as JWTPayload;

      if (role !== 'ADMIN' && rolesRequired && !rolesRequired.includes(role))
        throw new UnauthorizedException(
          `Você necessita dos privilegios de ${rolesRequired.join(
            ', '
          )} para acessar esse recurso`
        );

      // Expose user object inside request
      request.user = {
        id: sub,
        role,
      };

      return true;
    } catch (error) {
      if (error instanceof UnauthorizedException)
        throw new UnauthorizedException(error.message);

      throw new ForbiddenException('Token JWT inválido.');
    }
  }
}
