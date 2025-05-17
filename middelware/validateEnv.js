// config/validateEnv.js
const requiredEnv = [
  'CLOUD_NAME',
  'CLOUD_KEY',
  'CLOUD_SECRET',
  'CONNECT_DB',
  'SECRET_JWT'
];

requiredEnv.forEach((key) => {
  if (!process.env[key]) {
    console.error(`❌ Missing required env variable: ${key}`);
    process.exit(1);
  }
});
