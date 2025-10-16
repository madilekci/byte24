'use client';
import { MainQueryKey } from '@byte24/ui/constants';
import { IBranding, IOption } from '@byte24/ui/interfaces';

export {
  ACCEPTED_DOCUMENT_FILE_TYPES,
  MAX_FILE_SIZE,
  VAT_TYPES,
} from '@byte24/ui/constants';

export const ACCEPTED_IMAGE_FILE_TYPES = ['image/jpeg', 'image/png'];

export const ACCEPTED_INSURANCE_POLICY_FILE_TYPES = ['application/pdf'];

export const BRANDING_OVERRIDE: IBranding = {
  logoSmall: '/images/logo.png',
  logoLarge: '/images/logo-white.png',
  primaryColor: '',
  secondaryColor: '',
  accentColor: '',
  sidebarColor: '',
};

export const AUTH_STYLE = {
  logo: 'https://cdn.byte24.nl/logo/modulairesoftware-full.svg',
  primary: '#00a69c',
  background: '#dddddd',
};
export const LOGIN_LOGO = 'https://cdn.byte24.nl/logo/modulairesoftware-full.svg';
export const NOTIFICATION_SOUND = '/sounds/correct-answer-tone.wav';

// Custom query keys for this project
enum QueryKeyEnum {
  DATATABLE = 'datatable',
  AUTH = 'auth',
  USER = 'user',
  NOTIFICATIONS = 'notifications',
  COMPANIES = 'company',
  COMPANY_NOTES = 'company-notes',
  COMPANY_STATUSES = 'company-status',
  COMPANY_TYPES = 'company-type',
  COMPANY_CONTACT_PERSONS = 'company-contact-person',
  COUNTRIES = 'countries',
  COMPANIES_UPDATES = 'company-updates',
  SETTINGS_TYPES = 'settings-types',
  SETTINGS_STATUSES = 'settings-statuses',
  SETTINGS_COMPANY_STATUS = 'settings-company-status',
  SETTINGS_COMPANY_TYPES = 'settings-company-types',
  SETTINGS_QUOTATION_STATUS = 'settings-quotation-status',
  SETTINGS_ORDER_STATUS = 'settings-order-status',
  SETTINGS_ACTIVITY_TYPES = 'settings-activity-types',
  SETTINGS_PURCHASE_ORDER_STATUS = 'settings-purchase-order-status',
  SETTINGS_TIME_ENTRY_TYPES = 'settings-time-entry-types',
  SETTINGS_PRODUCT_TYPES = 'settings-product-types',
  FILE_SYSTEM = 'file-system',
  FILE_SYSTEM_GLOBAL = 'file-system-global',
  COMPANY_CONTRACTS = 'company-contracts',
  VAT_CODES = 'vat-codes',
  QUOTATIONS = 'quotations',
  QUOTATION_VERSIONS = 'quotation-versions',
  QUOTATION_STATUSES = 'quotation-statuses',
  ACTIONS_RECENT = 'actions-recent',
  ACTIONS = 'actions',
  NOTES = 'notes',
  ORDERS = 'orders',
  ORDER_NOTES = 'order-notes',
  ORDER_STATUSES = 'order-statuses',
  ACTIVITIES = 'activities',
  TASKS = 'tasks',
  PURCHASE_ORDER_INVOICES = 'purchase-order-invoices',
  TIME_ENTRIES = 'time-entries',
  TOTALS = 'totals',
  LOCATIONS = 'locations',
  PRICELISTS = 'pricelists',
  PRODUCT_PRICES = 'product-prices',
  POSTAGE_OPTION_PRICES = 'postage-option-prices',
  POSTAGE_OPERATIONAL_DISCOUNT_TYPE_PRICES = 'postage-operational-discount-type-prices',
  PRICELIST_CONSTANTS = 'pricelist-constants',
  OPTION_PRICES = 'option-prices',
  COMBINATION_PRICES = 'combination-prices',
  CONFIGURATIONS = 'configurations',
  CONFIGURATION_CATEGORIES = 'configuration-categories',
  CONFIGURATION_LINE_PRELIMINARY_CALCULATION = 'configuration-line-preliminary-calculation',
  CONFIGURATION_SUMMARY = 'configuration-summary',
  CONFIGURATION_POSTAGE_OPTIONS = 'configuration-postage-options',
  STOCK_LOCATIONS = 'stock-locations',
  STOCK_PRODUCTS = 'stock-products',
  STOCK_LOCATIONS_LETTER = 'stock-locations-letter',
  STOCK_LOCATIONS_NUMBER = 'stock-locations-number',
  CONFIGURATION_SHIPPING_TYPES = 'configuration-shipping-types',
  COMPANY_PRODUCTS = 'company-products',
  STOCK_MUTATIONS = 'stock-mutations',
  CONFIGURATION_GROUPS_WITH_PRODUCTS = 'configuration-groups-with-products',
  CONFIGURATION_LINE_PRODUCTS = 'configuration-line-products',
}

export const QueryKey = {
  ...QueryKeyEnum,
  ...MainQueryKey,
};

export const PRODUCT_STATUSSES = [
  {
    id: 1,
    name: 'Open',
    meta: {
      key: 'OPEN',
    },
  },
  {
    id: 2,
    name: 'Offerte aangevraagd',
    meta: {
      key: 'QUOTATION_REQUESTED',
    },
  },
  {
    id: 3,
    name: 'Besteld',
    meta: {
      key: 'ORDERED',
    },
  },
  {
    id: 4,
    name: 'Geleverd',
    meta: {
      key: 'DELIVERED',
    },
  },
  {
    id: 5,
    name: 'Voorraad',
    meta: {
      key: 'STOCK',
    },
  },
];

export const PURCHASE_ORDER_STATUSSES = [
  {
    id: 1,
    name: 'Open',
    meta: {
      key: 'OPEN',
    },
  },
  {
    id: 2,
    name: 'Offerte aangevraagd',
    meta: {
      key: 'QUOTATION_REQUESTED',
    },
  },
  {
    id: 3,
    name: 'Besteld',
    meta: {
      key: 'ORDERED',
    },
  },
  {
    id: 4,
    name: 'Geleverd',
    meta: {
      key: 'DELIVERED',
    },
  },
];

export const BOOLEAN_VALUES: IOption[] = [
  {
    id: 1,
    name: 'Ja',
    meta: {
      key: 'true',
    },
  },
  {
    id: 2,
    name: 'Nee',
    meta: {
      key: 'false',
    },
  },
];

export const NULLABLE_BOOLEAN_VALUES: IOption[] = [
  ...BOOLEAN_VALUES,
  {
    id: 3,
    name: 'Onbekend',
    meta: {
      key: 'unknown',
    },
  },
];

export const COMPANY_STATUSSES = {
  ACTIVE: {
    id: 1,
    name: 'Actief',
  },

  INACTIVE: {
    id: 2,
    name: 'Inactief',
  },

  DISAPPROVED: {
    id: 3,
    name: 'Afgewezen',
  },

  SOLVENCY_CHECK: {
    id: 4,
    name: 'Solvabiliteitscontrole',
  },

  INSURANCE_REQUEST: {
    id: 5,
    name: 'Kredietverzekering aanvraag',
  },
};

export const COMPANY_TYPES = {
  SUPPLIER: {
    id: 1,
    name: 'Leverancier',
  },

  BUYER: {
    id: 2,
    name: 'Koper',
  },
};

export const fuelExtras = [
  { id: 1, label: 'Ja', value: true },
  { id: 2, label: 'Nee', value: false },
];

export const NUMBER_FORMAT = {
  thousandSeparator: '.',
  decimalSeparator: ',',
};
