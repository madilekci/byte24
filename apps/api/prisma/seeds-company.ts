const companyData = require('./seeds/company/company.ts');
const companyStatusData = require('./seeds/company/company-status.ts');
const companyStatusHistoryData = require('./seeds/company/company-status-history.ts');
const companyTypeData = require('./seeds/company/company-type.ts');
const companyContactPersonsData = require('./seeds/company/company-contact-persons.ts');
import Bluebird from 'bluebird';

const companySeeds = async (prisma) => {
  await prisma.companyStatusHistory.deleteMany();
  await prisma.companyStatus.deleteMany();
  await prisma.companyType.deleteMany();
  await prisma.contactPerson.deleteMany();
  await prisma.company.deleteMany();

  await prisma.companyStatus.createMany({
    data: companyStatusData,
  });

  await prisma.companyType.createMany({
    data: companyTypeData,
  });

  await Bluebird.map(
    companyData,
    async (company: any) => {
      await prisma.company.create({
        data: {
          name: company.name,
          email: company.email,
          phone: company.phone,
          website: company.website,
          vatNumber: company.vatNumber,
          cocNumber: company.cocNumber,
          iban: company.iban,
          typeId: company.typeId,

          city: company.city,
          zipCode: company.zipCode,
          street: company.street,
          houseNumber: company.houseNumber,
          countryId: company.countryId,

          invoiceEmail: company.invoiceEmail,
          invoiceCity: company.invoiceCity,
          invoiceZipCode: company.invoiceZipCode,
          invoiceStreet: company.invoiceStreet,
          invoiceHouseNumber: company.invoiceHouseNumber,
          invoiceCountryId: company.invoiceCountryId,

          paymentDays: company.paymentDays,
          environmentalCharge: company.environmentalCharge,
          kycCheck: company?.kycCheck,

          createdById: company.createdById,
          vatCodeId: company.vatCodeId,
        },
      });
    },
    {
      concurrency: 1,
    }
  );

  await prisma.companyStatusHistory.createMany({
    data: companyStatusHistoryData,
  });

  await prisma.contactPerson.createMany({
    data: companyContactPersonsData,
  });
};

module.exports = { companySeeds };
