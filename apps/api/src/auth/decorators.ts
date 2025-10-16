import type { ExecutionContext } from '@nestjs/common';
import { SetMetadata, createParamDecorator } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ApplicationRole } from '@prisma/client';
import { UserSession as UserSessionType } from './auth.type';
import { AFTER_HOOK_KEY, BEFORE_HOOK_KEY, HOOK_KEY } from './symbols';

/**
 * Marks a route as public, allowing unauthenticated access.
 * When applied to a controller method, the AuthGuard will skip authentication checks.
 */
export const PublicAuth = () => SetMetadata('PUBLIC', true);

/**
 * Marks a route as having optional authentication.
 * When applied to a controller method, the AuthGuard will allow the request to proceed
 * even if no session is present.
 */
export const OptionalAuth = () => SetMetadata('OPTIONAL', true);

/**
 * Marks a route as having specific application roles.
 * When applied to a controller method, the AuthGuard will check if the user has one of the specified roles.
 */
export const ApplicationRoles = Reflector.createDecorator<ApplicationRole[]>();

/**
 * Parameter decorator that extracts the user session from the request.
 * Provides easy access to the authenticated user's session data in controller methods.
 */
export const CurrentUserSession = createParamDecorator(
  (_data: keyof UserSessionType, context: ExecutionContext): UserSessionType => {
    const request = context.switchToHttp().getRequest();
    return _data == null ? request.session : request.session[_data];
  }
);

/**
 * Registers a method to be executed before a specific auth route is processed.
 * @param path - The auth route path that triggers this hook (must start with '/')
 */
export const BeforeHook = (path: `/${string}`) => SetMetadata(BEFORE_HOOK_KEY, path);

/**
 * Registers a method to be executed after a specific auth route is processed.
 * @param path - The auth route path that triggers this hook (must start with '/')
 */
export const AfterHook = (path: `/${string}`) => SetMetadata(AFTER_HOOK_KEY, path);

/**
 * Class decorator that marks a provider as containing hook methods.
 * Must be applied to classes that use BeforeHook or AfterHook decorators.
 */
export const Hook = () => SetMetadata(HOOK_KEY, true);
