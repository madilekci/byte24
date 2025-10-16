import { ApplicationRole } from '@prisma/client';

const superAdmins = [
  {
    id: 'bPQQMzyEE1BoQuUPtm95ggUrMExsiv6b',
    name: 'Candidate Byte24',
    email: 'candidate@byte24.nl',
    emailVerified: true,
    image: '123',
    twoFactorEnabled: null,
    role: 'admin',
    banned: null,
    banReason: null,
    banExpires: null,
    firstName: 'Candidate',
    lastName: 'Byte24',
    defaultViewId: null,
    createdAt: new Date(),
    updatedAt: new Date(),
    applicationRole: ApplicationRole.SUPER_ADMIN,
  },
];

const users = [...superAdmins];

module.exports = users;
