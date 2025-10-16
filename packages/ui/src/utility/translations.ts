import {
  ITranslateBadgeVariants,
  translateBase,
  TRANSLATE_VALUES_WITH_BADGE as translateBaseValues,
} from "@byte24/ui/utils";

export const TRANSLATE_VALUES_WITH_BADGE: ITranslateBadgeVariants = {
  ...translateBaseValues,
  user: {
    value: "Gebruiker",
    color: "!bg-blue-300 !text-blue-900",
  },
  admin: {
    value: "Admin",
    color: "!bg-purple-300 !text-purple-900",
  },
  finance: {
    value: "FINANCE",
    color: "!bg-purple-300 !text-purple-900",
  },
  backoffice: {
    value: "BACKOFFICE",
    color: "!bg-green-300 !text-green-900",
  },
  chief_sales_officer: {
    value: "CHIEF_SALES_OFFICER",
    color: "!bg-red-300 !text-red-900",
  },
  quality_assurance: {
    value: "Kwaliteit",
    color: "!bg-green-300 !text-green-900",
  },
  EQUAL_SPREAD: {
    value: "Equal spread",
    color: "!bg-green-300 !text-green-900",
  },
  CUSTOM_SCHEDULE: {
    value: "Afwijkend schema",
    color: "!bg-green-300 !text-green-900",
  },
  GRADE_1: {
    value: "Grade 1",
    color: "!bg-green-300 !text-green-900",
  },
  GRADE_2: {
    value: "Grade 2",
    color: "!bg-yellow-300 !text-yellow-900",
  },
  GRADE_3: {
    value: "Grade 3",
    color: "!bg-gray-300 !text-gray-900",
  },
  IN_NEGOTIATION: {
    value: "In onderhandeling",
    color: "!bg-yellow-300 !text-yellow-900",
  },
  DEFINITIVE: {
    value: "Definitief",
    color: "!bg-green-300 !text-green-900",
  },
  PENDING: {
    value: "In afwachting",
    color: "!bg-yellow-300 !text-yellow-900",
  },
  LOST: {
    value: "Verloren",
    color: "!bg-red-300 !text-red-900",
  },
  LEFT_THE_DOCK: {
    value: "Vertrokken van dok",
    color: "!bg-blue-300 !text-blue-900",
  },
  ON_THE_SEA: {
    value: "Onderweg over zee", // More explicit than just "op zee"
    color: "!bg-blue-300 !text-blue-900", // Deeper blue for ocean transit
  },
  ARRIVED: {
    value: "Aangekomen",
    color: "!bg-green-300 !text-green-900",
  },
  SALES: {
    value: "Verkoop", // "Sale"
    color: "!bg-blue-300 !text-blue-900", // Blue = sales
  },
  PURCHASE: {
    value: "Aankoop", // "Purchase"
    color: "!bg-purple-300 !text-purple-900", // Purple = purchases
  },

  LOT_ARRIVED: {
    value: "Partij aangekomen", // Purchase
    color: "!bg-purple-300 !text-purple-900", // Purple = purchases
  },
  LOT_EXCEL_IMPORT: {
    value: "Partij excel import aanpassing", // Correct Dutch formatting (hyphenated)
    color: "!bg-purple-100 !text-purple-800", // Optional: soft purple for imports
  },
  SALES_CONTRACT_CREATED: {
    value: "Verkoopcontract aangemaakt",
    color: "!bg-green-300 !text-green-900", // Green = sales
  },
  DISPATCH_CREATED: {
    value: "Verzending aangemaakt",
    color: "!bg-green-300 !text-green-900", // Consistent with sales
  },
  AVAILABLE: {
    value: "Beschikbaar",
    color: "!bg-green-300 !text-green-900", // Green = available
  },
  RESERVED: {
    value: "Gereserveerd",
    color: "!bg-yellow-300 !text-yellow-900", // Yellow = reserved
  },

  ADJUSTMENT: {
    value: "Aanpassing",
    color: "!bg-yellow-300 !text-yellow-900", // Yellow = adjustment
  },
  RETURN: {
    value: "Retour",
    color: "!bg-red-300 !text-red-900", // Red = return
  },
  PROCESSING: {
    value: "Verwerking",
    color: "!bg-blue-300 !text-blue-900", // Blue = processing
  },
  DISPATCHED: {
    value: "Verzonden",
    color: "!bg-blue-300 !text-blue-900", // Green = dispatched
  },
  PROCESSED: {
    value: "Verwerkt",
    color: "!bg-teal-300 !text-teal-900", // Green = processed
  },
  PLANNED: {
    value: "Gepland",
    color: "!bg-yellow-300 !text-yellow-900", // Yellow = planned
  },
  COMPLETED: {
    value: "Voltooid",
    color: "!bg-indigo-300 !text-indigo-900", // Green = completed
  },
  LATE: {
    value: "Te laat",
    color: "!bg-orange-300 !text-orange-900",
  },
  REMINDED: {
    value: "Herinnerd",
    color: "!bg-red-300 !text-red-900",
  },
  BACKOFFICE: {
    value: "Backoffice",
    color: "!bg-green-300 !text-green-900",
  },
  CHIEF_SALES_OFFICER: {
    value: "Chief Sales Officer",
    color: "!bg-red-300 !text-red-900",
  },
  Toegewezen: {
    value: "Toegewezen",
    color: "!bg-green-300 !text-green-900",
  },
  Niet_toegewezen: {
    value: "Niet toegewezen",
    color: "!bg-gray-300 !text-gray-900",
  },
  PRIVATE_USER: {
    value: "Particulier",
    color: "!bg-gray-300 !text-gray-900",
  },
  BUSINESS_USER: {
    value: "Zakelijk",
    color: "!bg-blue-300 !text-blue-900",
  },
  /*  BENZINE
  DIESEL
  ELECTRIC 
  HYBRID_BENZINE
  HYBRID_DIESEL*/
  BENZINE: {
    value: "Benzine",
    color: "!bg-yellow-300 !text-yellow-900",
  },
  DIESEL: {
    value: "Diesel",
    color: "!bg-gray-300 !text-gray-900",
  },
  ELECTRIC: {
    value: "Elektrisch",
    color: "!bg-green-300 !text-green-900",
  },
  HYBRID_BENZINE: {
    value: "Hybride Benzine",
    color: "!bg-yellow-300 !text-yellow-900",
  },
  HYBRID_DIESEL: {
    value: "Hybride Diesel",
    color: "!bg-gray-300 !text-gray-900",
  },
  OFF: {
    value: "Uit",
    color: "!bg-gray-300 !text-gray-900",
  },
  SMARTCAR: {
    value: "Smartcar",
    color: "!bg-green-300 !text-green-900",
  },
  "Niet beschikbaar": {
    value: "Niet beschikbaar",
    color: "!bg-gray-300 !text-gray-900", // Neutral / unavailable
  },
  Beschikbaar: {
    value: "Beschikbaar",
    color: "!bg-green-300 !text-green-900", // Available / good
  },
  Koppel: {
    value: "Koppel",
    color: "!bg-blue-300 !text-blue-900", // Action / interactive
  },
  Gekoppeld: {
    value: "Gekoppeld",
    color: "!bg-indigo-300 !text-indigo-900", // Connected / stable
  },
  "Apparaat aan": {
    value: "Apparaat aan",
    color: "!bg-green-300 !text-green-900", // Powered / attention
  },
  "Reeds gekoppeld": {
    value: "Reeds gekoppeld",
    color: "!bg-purple-300 !text-purple-900", // Calm, completed state
  },

  MONDAY: {
    value: "Maandag",
    color: "!bg-gray-300 !text-gray-900",
  },
  TUESDAY: {
    value: "Dinsdag",
    color: "!bg-gray-300 !text-gray-900",
  },
  WEDNESDAY: {
    value: "Woensdag",
    color: "!bg-gray-300 !text-gray-900",
  },
  THURSDAY: {
    value: "Donderdag",
    color: "!bg-gray-300 !text-gray-900",
  },
  FRIDAY: {
    value: "Vrijdag",
    color: "!bg-gray-300 !text-gray-900",
  },
  SATURDAY: {
    value: "Zaterdag",
    color: "!bg-gray-300 !text-gray-900",
  },
  SUNDAY: {
    value: "Zondag",
    color: "!bg-gray-300 !text-gray-900",
  },
  PAPER: {
    value: "Papier",
    color: "!bg-orange-300 !text-orange-900",
  },
  INK: {
    value: "Inkt",
    color: "!bg-lime-300 !text-lime-900",
  },
  ENVELOPE: {
    value: "Envelop",
    color: "!bg-indigo-300 !text-indigo-900",
  },
  FOIL: {
    value: "Folie",
    color: "!bg-yellow-300 !text-yellow-900",
  },
  FIXED: {
    value: "€",
    color: "!bg-green-300 !text-green-900",
  },
  PERCENTAGE: {
    value: "%",
    color: "!bg-yellow-300 !text-yellow-900",
  },
  POSTAGE_MAX_DISCOUNT_PERCENTAGE: {
    value: "Maximaal kortingspercentage Porto",
    color: "!bg-yellow-300 !text-yellow-900",
  },
  SMALL: {
    value: "Klein",
    color: "!bg-gray-300 !text-gray-900",
  },
  MIXED: {
    value: "Gemengd",
    color: "!bg-gray-300 !text-gray-900",
  },
  LARGE: {
    value: "Groot",
    color: "!bg-gray-300 !text-gray-900",
  },
  SPECIAL: {
    value: "Special",
    color: "!bg-gray-300 !text-gray-900",
  },
  MOVEMENT: {
    value: "Verplaatsing",
    color: "!bg-blue-300 !text-blue-900",
  },
  COUNT: {
    value: "Telling",
    color: "!bg-green-300 !text-green-900",
  },
  DECREASE: {
    value: "Afname",
    color: "!bg-red-300 !text-red-900",
  },
  ADD: {
    value: "Toevoeging",
    color: "!bg-green-300 !text-green-900",
  },
  MARKETING: {
    value: "Marketing",
    color: "!bg-yellow-300 !text-yellow-900",
  },
};
export const translate = (type: string) => {
  return translateBase(TRANSLATE_VALUES_WITH_BADGE, type);
};
