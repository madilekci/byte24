import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const seed = async () => {
  const { userSeeds } = require('./seeds-user.ts');
  const { vatCodeSeeds } = require('./seeds-vatCode.ts');
  const { companySeeds } = require('./seeds-company.ts');
  const { countrySeeds } = require('./seeds-country.ts');

  try {
    await userSeeds(prisma);
    await vatCodeSeeds(prisma);
    await countrySeeds(prisma);
    await companySeeds(prisma);
  } catch (error) {
    console.error(error);
    process.exit(1);
  } finally {
    console.log('🌱 Database seeded successfully ✅');
    console.log('🔌 Disconnecting from database...');
    await prisma.$disconnect();
    console.log('👋 Database connection closed');
  }
};

seed();
