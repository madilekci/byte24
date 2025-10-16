import { validationMsg as baseValidationMsg } from "@byte24/ui/utils";

export const validationMsg = {
  ...baseValidationMsg,
  lossPercentage: {
    required: "Verliespercentage is verplicht",
    min: "Verliespercentage mag niet lager zijn dan 0",
    max: "Verliespercentage mag niet hoger zijn dan 100",
  },
  monthlySubscriptionPrice: {
    required: "Maandelijkse abonnementsprijs is verplicht",
    min: "Maandelijkse abonnementsprijs moet groter zijn dan 0",
  },
  type: {
    required: "Type is verplicht",
  },
  fromMonth: {
    required: "Van maand is verplicht",
  },
  fromYear: {
    required: "Van jaar is verplicht",
  },
  toMonth: {
    required: "Tot maand is verplicht",
  },
  toYear: {
    required: "Tot jaar is verplicht",
  },
  boatName: {
    required: "Boatnaam is verplicht",
  },
  reference: {
    required: "Referentie is verplicht",
  },
  companyType: {
    required: "Het type van de bedrijf is verplicht.",
  },
  company: {
    required: "Bedrijf is verplicht.",
  },
  product: {
    required: "Product is verplicht",
  },
  paymentDays: {
    required: "Factuur vervaldagen is verplicht",
  },
  value: {
    required: "Totale waarde is verplicht",
  },
  currency: {
    required: "Valuta is verplicht",
  },
  file: {
    required: "Bestand is verplicht",
    maxSize: (size: number) => `Bestand mag niet groter zijn dan ${size}MB`,
    types: (types: string) => `Bestand moet van het type ${types} zijn`,
    genericType: (genericType: string) =>
      `Bestand moet een ${genericType} zijn`,
  },
  probability: {
    required: "Kans is verplicht",
  },
  quotationVersionType: {
    required: "Het type is verplicht",
  },
  unit: {
    required: "Eenheid is verplicht",
  },
  purchasePriceEx: {
    required: "Inkoopprijs ex. BTW is verplicht",
    min: "Inkoopprijs ex. BTW moet groter zijn dan 0",
  },
  vatCode: {
    required: "BTW code is verplicht",
  },
  status: {
    required: "Status is verplicht",
  },
  description: {
    required: "Omschrijving is verplicht",
  },
  title: {
    required: "Titel is verplicht",
  },
  totalProgressPaymentStatements: {
    required: "Aantal termijnen is verplicht",
    min: "Aantal termijnen moet minimaal 0 zijn",
    int: "Aantal termijnen moet een heel getal zijn",
  },
  content: {
    required: "Inhoud is verplicht",
  },
  isCompleted: {
    required: "Of de status afgerond is, is verplicht",
  },
  color: {
    required: "Kleur is verplicht",
  },
  currentVersion: {
    required: "Huidige versie is verplicht",
  },
  productGroup: {
    required: "Productgroep is verplicht",
  },
  price: {
    required: "Prijs is verplicht",
  },
  totalQuantity: {
    required: "Kilogrammen zijn verplicht",
  },
  stockVariant: {
    required: "Voorraad variant is verplicht",
  },
  spreadType: {
    required: "Schema is verplicht",
  },
  cropYearId: {
    required: "Crop is verplicht",
  },
  term: {
    required: "Term is verplicht",
  },
  leaseCompany: {
    required: "Leasemaatschappij is verplicht",
  },
  employer: {
    required: "Werkgever is verplicht",
  },
  startDay: {
    required: "Start dag is verplicht",
  },
  endDay: {
    required: "Eind dag is verplicht",
  },

  /*  message: validationMsg.businessMileage.invalid,
    }),
  includedMileagePrivate: z
    .number({
      required_error: validationMsg.privateMileage.required,
    })
    .min(0, {
      message: validationMsg.privateMileage.invalid,
    }),
  startDate: z.string({
    required_error: validationMsg.startDate.required,
  }),
  endDate: z.string({
    required_error: validationMsg.endDate.required,
  }),
  monthlyLeasePrice: z
    .number({
      required_error: validationMsg.monthlyLeasePrice.required,
    })
    .min(0, {
      message: validationMsg.monthlyLeasePrice.invalid,
    }),
  exceedingKmPrice: z
    .number({
      required_error: validationMsg.kmPrice.required,
    })
    .min(0, {
      message: validationMsg.kmPrice.invalid,
    }),
  totalKilometers: z.number().optional(),*/
  businessMileage: {
    required: "Kilometers zakelijk is verplicht",
    invalid: "Kilometers zakelijk moet een positief getal zijn",
  },
  privateMileage: {
    required: "Kilometers privé is verplicht",
    invalid: "Kilometers privé moet een positief getal zijn",
  },
  monthlyLeasePrice: {
    required: "Leaseprijs is verplicht",
    invalid: "Leaseprijs moet een positief getal zijn",
  },
  kmPrice: {
    required: "Prijs per kilometer is verplicht",
    invalid: "Prijs per kilometer moet een positief getal zijn",
  },
  mileage: {
    required: "Kilometerstand is verplicht",
    invalid: "Kilometerstand moet een positief getal zijn",
  },
  startDate: {
    required: "Startdatum is verplicht",
  },
  endDate: {
    required: "Einddatum is verplicht",
  },
  availableStartDay: {
    required: "Beschikbare start dag is verplicht",
  },
  availableEndDay: {
    required: "Beschikbare eind dag is verplicht",
  },
  startHour: {
    required: "Beschikbare start uur is verplicht",
  },
  endHour: {
    required: "Beschikbare eind uur is verplicht",
  },
  fuelType: {
    required: "Brandstoftype is verplicht",
  },
  brand: {
    required: "Merk is verplicht",
  },

  year: {
    required: "Jaar is verplicht",
    invalid: "Jaar moet een geldig getal zijn",
  },
  licensePlate: {
    required: "Kenteken is verplicht",
    invalid: "Kenteken moet een geldig formaat hebben",
  },
  listPrice: {
    required: "Cataloguswaarde is verplicht",
    invalid: "Cataloguswaarde moet een positief getal zijn",
  },
  openCloseType: {
    required: "Openen/sluiten type is verplicht",
  },
  discountPercentage: {
    required: "Kortingspercentage is vereist",
  },
  expireDate: {
    required: "Verloopdatum is verplicht",
  },
  isCompletedStatus: {
    required: "Of de status afgerond is, is verplicht",
  },
  isExpiredStatus: {
    required: "Of de status verlopen is, is verplicht",
  },
  accountManager: {
    required: "Accountmanager is verplicht",
  },
  reminderDate: {
    required: "Reminder datum is verplicht",
  },
  date: {
    required: "Datum is verplicht",
  },
  startTime: {
    required: "Starttijd is verplicht",
  },
  endTime: {
    required: "Eindtijd is verplicht",
  },
  hours: {
    required: "Aantal uren is verplicht",
  },
  code: {
    required: "Code is verplicht",
  },
  productType: {
    required: "Producttype is verplicht",
  },
  active: {
    required: "Actief is verplicht",
  },
  markupType: {
    required: "Winstopslag type is verplicht",
  },
  discountId: {
    required: "Operationele korting is verplicht",
  },
  discountTypeId: {
    required: "Operationele korting type is verplicht",
  },
  minimumQuantity: {
    required: "Minimum hoeveelheid is verplicht",
  },
  transitionPrice: {
    required: "Nieuwe prijs is verplicht",
  },
  fromLocation: {
    required: "Bronlocatie is verplicht",
  },
  toLocation: {
    required: "Doellocatie is verplicht",
  },
  quantity: {
    required: "Het aantal is verplicht",
  },
};
