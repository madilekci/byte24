import {
  adminClient,
  inferAdditionalFields,
  twoFactorClient,
} from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,

  plugins: [
    twoFactorClient(),
    adminClient(),
    inferAdditionalFields({
      user: {
        firstName: {
          type: "string",
        },
        lastName: {
          type: "string",
        },
        role: {
          type: "string",
        },
        applicationRole: {
          type: "string",
        },
        insurancePolicyFileKey: {
          type: "string",
        },
      },
    }),
  ],
});

export type Session = typeof authClient.$Infer.Session;

type ErrorTypes = Partial<
  Record<
    keyof typeof authClient.$ERROR_CODES,
    {
      en: string;
      nl: string;
    }
  >
>;

const errorCodes = {
  USER_NOT_FOUND: {
    en: "User not found",
    nl: "Gebruiker niet gevonden",
  },
  FAILED_TO_CREATE_USER: {
    en: "Failed to create user",
    nl: "Gebruiker kon niet worden aangemaakt",
  },
  FAILED_TO_CREATE_SESSION: {
    en: "Failed to create session",
    nl: "Sessie kon niet worden aangemaakt",
  },
  FAILED_TO_UPDATE_USER: {
    en: "Failed to update user",
    nl: "Gebruiker kon niet worden bijgewerkt",
  },
  FAILED_TO_GET_SESSION: {
    en: "Failed to get session",
    nl: "Sessie kon niet worden opgehaald",
  },
  INVALID_PASSWORD: {
    en: "Invalid password",
    nl: "Ongeldig wachtwoord",
  },
  INVALID_EMAIL: {
    en: "Invalid email",
    nl: "Ongeldig e-mailadres",
  },
  INVALID_EMAIL_OR_PASSWORD: {
    en: "Invalid email or password",
    nl: "Ongeldig e-mailadres of wachtwoord",
  },
  SOCIAL_ACCOUNT_ALREADY_LINKED: {
    en: "Social account already linked",
    nl: "Sociaal account is al gekoppeld",
  },
  INVALID_TOKEN: {
    en: "Invalid token",
    nl: "Ongeldige token",
  },
  ID_TOKEN_NOT_SUPPORTED: {
    en: "Id token not supported",
    nl: "Id token wordt niet ondersteund",
  },
  FAILED_TO_GET_USER_INFO: {
    en: "Failed to get user info",
    nl: "Gebruikersinfo kon niet worden opgehaald",
  },
  USER_EMAIL_NOT_FOUND: {
    en: "User email not found",
    nl: "Gebruiker e-mail niet gevonden",
  },
  EMAIL_NOT_VERIFIED: {
    en: "Email not verified",
    nl: "E-mail niet geverifieerd",
  },
  PASSWORD_TOO_SHORT: {
    en: "Password too short",
    nl: "Wachtwoord te kort",
  },
  PASSWORD_TOO_LONG: {
    en: "Password too long",
    nl: "Wachtwoord te lang",
  },
  USER_ALREADY_EXISTS: {
    en: "User already exists",
    nl: "Gebruiker bestaat al",
  },
  EMAIL_CAN_NOT_BE_UPDATED: {
    en: "Email can not be updated",
    nl: "E-mail kan niet worden bijgewerkt",
  },
  CREDENTIAL_ACCOUNT_NOT_FOUND: {
    en: "Credential account not found",
    nl: "Referentie-account niet gevonden",
  },
  SESSION_EXPIRED: {
    en: "Session expired",
    nl: "Sessie verlopen",
  },
  FAILED_TO_UNLINK_LAST_ACCOUNT: {
    en: "Failed to unlink last account",
    nl: "Koppeling van laatste account mislukt",
  },
  ACCOUNT_NOT_FOUND: {
    en: "Account not found",
    nl: "Account niet gevonden",
  },
} satisfies ErrorTypes;

export const getErrorMessage = (
  code: string,
  lang: "en" | "nl",
  fallback?: string
) => {
  if (code in errorCodes) {
    return errorCodes[code as keyof typeof errorCodes][lang];
  }
  return fallback ?? "";
};
