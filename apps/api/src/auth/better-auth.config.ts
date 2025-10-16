import { GlobalConfig } from '@/config/config.type';
import { loggerConfig } from '@/config/logger.config';
import { ConfigService } from '@nestjs/config';
import { PrismaClient } from '@prisma/client';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import { admin, createAuthMiddleware, twoFactor } from 'better-auth/plugins';
import { BetterAuthOptions } from 'better-auth/types';
import { createLogger } from 'winston';

/**
 * Better auth configuration
 * Visit https://www.better-auth.com/docs/reference/options to see full options
 */
const prisma = new PrismaClient();

export function getConfig({
  configService,
}: {
  configService: ConfigService<GlobalConfig>;
}): BetterAuthOptions {
  const logger = createLogger({
    ...loggerConfig,
  });
  const appConfig = configService.getOrThrow('app', { infer: true });
  const authConfig = configService.getOrThrow('auth', { infer: true });

  // Create the configuration with hooks explicitly defined
  const config: BetterAuthOptions = {
    appName: appConfig.name,
    secret: authConfig.authSecret,
    baseURL: appConfig.frontendUrl,
    plugins: [twoFactor(), admin()],
    database: prismaAdapter(prisma, {
      provider: 'postgresql',
    }),
    trustedOrigins: ['http://localhost:3000', 'http://localhost:3001', 'http://localhost:3002'],
    emailAndPassword: {
      enabled: true,
      autoSignIn: false,
      requireEmailVerification: true,
      disableSignUp: appConfig.nodeEnv !== 'development',

      sendResetPassword: async ({ user, url, token }, request) => {
        logger.info('sendResetPassword', {
          user,
          url,
          token,
        });
      },
    },
    emailVerification: {
      autoSignInAfterVerification: true,
      sendVerificationEmail: async ({ user, url, token }, request) => {
        logger.info('sendVerificationEmail', {
          user,
          url,
          token,
        });
      },
    },
    hooks: {
      // Logging for
      after: createAuthMiddleware(async (ctx: any) => {
        const headers = Object.fromEntries(ctx.headers.entries());

        if (ctx.path === '/sign-in/email') {
          const { email, password } = ctx.body;
          if (!ctx.context.returned?.statusCode) {
            logger.info(`Successful sign in for ${email}`, {
              email: ctx.body.email,
              headers: JSON.stringify(headers),
              statusCode: ctx.context.returned.statusCode,
            });
          } else {
            logger.warn(`Unsuccessful sign in for ${email}`, {
              email: ctx.body.email,
              headers: JSON.stringify(headers),
              returned: ctx.context.returned,
            });
          }
          return;
        }

        if (ctx.path === '/two-factor/verify-totp') {
          if (!ctx.context.returned?.statusCode) {
            logger.info(`Successful verify totp for ${ctx.body?.email}`, {
              email: ctx.body.email,
              headers: JSON.stringify(headers),
            });
          } else {
            logger.warn(`Unsuccessful verify totp for ${ctx.body?.email}`, {
              email: ctx.body.email,
              headers: JSON.stringify(headers),
              returned: ctx.context.returned,
              statusCode: ctx.context.returned.statusCode,
            });
          }
          return;
        }

        if (ctx.path === '/reset-password') {
          if (!ctx.context.returned?.statusCode) {
            logger.info(`Successful reset password for ${ctx.body?.email}`, {
              email: ctx.body?.email,
              headers: JSON.stringify(headers),
            });
          } else {
            logger.warn(`Unsuccessful reset password for ${ctx.body?.email}`, {
              email: ctx.body?.email,
              headers: JSON.stringify(headers),
              returned: ctx.context.returned,
              statusCode: ctx.context.returned.statusCode,
            });
          }
          return;
        }
      }),
    },
    user: {
      changeEmail: {
        enabled: true,
        sendChangeEmailVerification: async ({ user, newEmail, token, url }, request) => {
          logger.info('sendChangeEmailVerification', {
            user,
            newEmail,
            token,
            url,
          });
        },
      },
      additionalFields: {
        role: {
          type: 'string',
          required: false,
          defaultValue: 'user',
          input: false, // don't allow user to set role
        },
        applicationRole: {
          type: 'string',
          required: false,
          defaultValue: 'ADMIN',
          input: false, // don't allow user to set role
        },
        firstName: {
          type: 'string',
          required: true,
          input: true,
        },
        lastName: {
          type: 'string',
          required: true,
          input: true,
        },
        insurancePolicyFileKey: {
          type: 'string',
          required: true,
          input: true,
        },
      },
    },
    advanced: {
      cookiePrefix: 'byte24',
      crossSubDomainCookies: {
        enabled: appConfig.nodeEnv !== 'development',
        domain: '.byte24.app', // Domain with a leading period
      },
      defaultCookieAttributes: {
        secure: true,
        httpOnly: appConfig.nodeEnv !== 'development',
        sameSite: 'none', // Allows CORS-based cookie sharing across subdomains
        partitioned: true, // New browser standards will mandate this for foreign cookies
      },
    },
    rateLimit: {
      enabled: true,
      window: 60, // time window in seconds
      max: 100, // max requests in the window
      customRules: {
        '/sign-in/email': {
          window: 10,
          max: 3,
        },
        '/forget-password': {
          window: 60,
          max: 1,
        },
        '/two-factor/*': async (request) => {
          // custom function to return rate limit window and max
          return {
            window: 10,
            max: 3,
          };
        },
      },
    },
  };

  return config;
}
