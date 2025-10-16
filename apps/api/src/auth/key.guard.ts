import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class KeyGuard implements CanActivate {
  constructor() {}

  async canActivate(context: ExecutionContext) {
    const request: any = context.switchToHttp().getRequest<Request>();

    const key = request.headers['x-api-key'];

    if (key !== process.env.API_KEY) {
      throw new ForbiddenException('Authentication is denied.');
    }

    return true;
  }
}
