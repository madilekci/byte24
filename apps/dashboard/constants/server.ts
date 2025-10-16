import { MainRoutePath } from '@byte24/ui/constants';

export const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export const PROJECT_NAME = 'BYTE24 Assignment';
export const PROJECT_DESCRIPTION = 'BYTE24 Assignment';

enum RoutePathEnum {
  AUTH = 'auth',
  USER = 'user',
  NOTIFICATION = 'notification',
  COMPANY = 'company',
  CONTACT_PERSONS = 'contact-person',
  NOTIFICATIONS = 'notification',
  SETTINGS = 'settings',
  FILE_SYSTEM = 'file-system',
  GENERAL = 'general',
  QUOTATION = 'quotation',
  NOTE = 'note',
  ORDER = 'order',
  ACTION = 'action',
  TASK = 'task',
  TIME_ENTRY = 'time-entry',
  LOCATION = 'location',
  GL_ACCOUNT = 'gl-account',
  PRICELIST = 'pricelist',
  CONFIGURATION = 'configuration',
  STOCK = 'stock',
}

export const RoutePath = {
  ...RoutePathEnum,
  ...MainRoutePath,
};
