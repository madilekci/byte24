// product-seed.js
const countryData = require('./seeds/country/country.ts');

const countrySeeds = async (prisma) => {
  await prisma.country.deleteMany();

  await prisma.country.createMany({ data: countryData });
};

module.exports = { countrySeeds };
