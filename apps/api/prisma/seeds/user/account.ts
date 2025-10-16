const userFullData = require('./user.ts');
// Password: ByteStock123.
const accounts = userFullData?.map((user) => {
  return {
    createdAt: new Date(),
    updatedAt: new Date(),
    id: user?.id,
    accountId: user?.id,
    providerId: 'credential',
    userId: user?.id,
    accessToken: null,
    refreshToken: null,
    idToken: null,
    accessTokenExpiresAt: null,
    refreshTokenExpiresAt: null,
    scope: null,
    password:
      '90811539718e1cbd7e84602294a03b4c:0f6b49577408ba3bb57379ae0d8d3d68015c173e92900dc89d81b5d261b392b42f00eba66e2fa7e1ebeb5c19dacae9456827a34d51b55cea3f95d7e93e1a3e9d',
  };
});

module.exports = accounts;
