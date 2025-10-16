import { ExecutionContext, Injectable } from '@nestjs/common';
import { ThrottlerGuard } from '@nestjs/throttler';
import { Request } from 'express';

@Injectable()
export class AppThrottlerGuard extends ThrottlerGuard {
  getRequestResponse(context: ExecutionContext) {
    return super.getRequestResponse(context);
  }

  protected async getTracker(req: Request): Promise<string> {
    const proxyIp =
      req?.headers['X-Forwarded'] ??
      req?.headers['x-forwarded'] ??
      req?.headers['X-Forwarded-For'] ??
      req?.headers['x-forwarded-for'] ??
      req?.headers?.['X-Real-IP'] ??
      req?.headers?.['x-real-ip'];

    return (proxyIp ?? req?.ips?.length) ? req?.ips[0] : req?.ip;
  }
}
