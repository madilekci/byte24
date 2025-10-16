const { execSync } = require('child_process');
const path = require('path');

// Resolve the absolute path to the `api` directory
const apiPath = path.resolve(__dirname, '../api');

try {
  console.log('Running Prisma generate...');
  execSync(`cd ${apiPath} && prisma generate`, {
    stdio: 'inherit',
  });
} catch (error) {
  console.error('Error running Prisma generate:');
  process.exit(1);
}
