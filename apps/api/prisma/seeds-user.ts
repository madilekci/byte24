const userData = require('./seeds/user/user.ts');
const accountData = require('./seeds/user/account.ts');

const userSeeds = async (prisma) => {
  await prisma.user.deleteMany();
  await prisma.account.deleteMany();

  await prisma.user.createMany({
    data: userData,
  });

  await prisma.account.createMany({
    data: accountData,
  });
};
module.exports = { userSeeds };
