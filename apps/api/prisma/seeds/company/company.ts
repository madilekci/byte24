import { fakerNL as faker } from '@faker-js/faker';

function createCompany(v: unknown, index: number) {
  return {
    name: faker.company.name(),
    typeId: faker.helpers.arrayElement([1, 2]),
    vatNumber: `NL865440463B01`,
    cocNumber: faker.number.int({ min: 10000000, max: 99999999 }).toString(),
    iban: faker.finance.iban(),
    email: faker.internet.email(),
    phone: faker.phone.number({ style: 'international' }),
    website: faker.internet.url(),

    city: faker.location.city(),
    zipCode: faker.location.zipCode(),
    street: faker.location.street(),
    houseNumber: faker.number.int({ min: 1, max: 999 }).toString(),
    countryId: 157,

    invoiceEmail: faker.internet.email(),
    invoiceCity: faker.location.city(),
    invoiceZipCode: faker.location.zipCode(),
    invoiceStreet: faker.location.street(),
    invoiceHouseNumber: faker.number.int({ min: 1, max: 999 }).toString(),
    invoiceCountryId: 157,

    paymentDays: 30,

    // contactPersons: [
    //   {
    //     title: faker.person.jobTitle(),
    //     initials: faker.person.firstName().charAt(0),
    //     lastName: faker.person.lastName(),
    //     email: faker.internet.email(),
    //     phone: faker.phone.number({ style: 'international' }),
    //     isMainContactPerson: true,
    //     createdBy: {
    //         connect: {
    //             id: 'bPQQMzyEE1BoQuUPtm95ggUrMExsiv6b',
    //         },
    //     },
    // } ,
    // ],

    notes: [
      {
        content:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        createdById: 'bPQQMzyEE1BoQuUPtm95ggUrMExsiv6b',
      },
    ],
    vatCodeId: 1,
    createdById: 'bPQQMzyEE1BoQuUPtm95ggUrMExsiv6b',
  };
}

const COMPANIES = faker.helpers.multiple(createCompany, { count: 5 });

module.exports = [
  {
    name: 'BYTE24',
    typeId: 1,
    vatNumber: 'NL865440463B01',
    cocNumber: '90752848',
    iban: 'TR736918640040966092800056',
    email: 'devon@byte24.nl',

    city: 'Schagen',
    zipCode: '1742LE',
    street: 'Witte Paal',
    houseNumber: '324',
    countryId: 157,

    invoiceEmail: 'devon@byte24.nl',
    invoiceCity: 'Schagen',
    invoiceZipCode: '1742LE',
    invoiceStreet: 'Witte Paal',
    invoiceHouseNumber: '324',
    invoiceCountryId: 157,

    paymentDays: 30,
    environmentalCharge: true,
    kycCheck: true,

    notes: [
      {
        content:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        createdById: 'bPQQMzyEE1BoQuUPtm95ggUrMExsiv6b',
      },
    ],
    vatCodeId: 1,
    createdById: 'bPQQMzyEE1BoQuUPtm95ggUrMExsiv6b',
  },
  ...COMPANIES,
];
