// product-seed.js
const vatCodeData = require('./seeds/vatCode/vatCode.ts');

const vatCodeSeeds = async (prisma) => {
  await prisma.vatCode.deleteMany();

  await prisma.vatCode.createMany({ data: vatCodeData });
};

module.exports = { vatCodeSeeds };
