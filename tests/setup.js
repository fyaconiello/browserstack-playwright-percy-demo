// Test setup file - loads environment variables for all tests
require('dotenv').config();

// Ensure Percy token is available
if (!process.env.PERCY_TOKEN) {
  console.warn('⚠️  PERCY_TOKEN not found in environment variables. Percy tests may fail.');
}

// Ensure BrowserStack credentials are available
if (!process.env.BROWSERSTACK_USERNAME || !process.env.BROWSERSTACK_ACCESS_KEY) {
  console.warn('⚠️  BrowserStack credentials not found in environment variables. Tests may fail.');
}

console.log('✅ Environment variables loaded successfully');
console.log(`   BrowserStack: ${process.env.BROWSERSTACK_USERNAME ? '✅' : '❌'}`);
console.log(`   Percy: ${process.env.PERCY_TOKEN ? '✅' : '❌'}`);
