#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🚀 Setting up SanTOK Tokenizer Frontend...\n');

// Check if package.json exists
if (!fs.existsSync('package.json')) {
  console.error('❌ package.json not found. Please run this from the project root.');
  process.exit(1);
}

// Check Node.js version
const nodeVersion = process.version;
const majorVersion = parseInt(nodeVersion.slice(1).split('.')[0]);

if (majorVersion < 18) {
  console.error(`❌ Node.js 18+ required. Current version: ${nodeVersion}`);
  process.exit(1);
}

console.log(`✅ Node.js version: ${nodeVersion}`);

// Install dependencies
console.log('\n📦 Installing dependencies...');
try {
  execSync('npm install', { stdio: 'inherit' });
  console.log('✅ Dependencies installed successfully');
} catch (error) {
  console.error('❌ Failed to install dependencies');
  console.error('Try running: npm install');
  process.exit(1);
}

// Create .env.local if it doesn't exist
const envFile = '.env.local';
if (!fs.existsSync(envFile)) {
  const envContent = `# SanTOK Tokenizer Frontend Environment Variables
NEXT_PUBLIC_API_URL=http://localhost:8000
`;
  fs.writeFileSync(envFile, envContent);
  console.log('✅ Created .env.local file');
}

// Check if all required files exist
const requiredFiles = [
  'app/layout.tsx',
  'app/page.tsx',
  'components/dashboard.tsx',
  'lib/api.ts',
  'store/useAppStore.ts'
];

let allFilesExist = true;
for (const file of requiredFiles) {
  if (!fs.existsSync(file)) {
    console.error(`❌ Missing required file: ${file}`);
    allFilesExist = false;
  }
}

if (!allFilesExist) {
  console.error('\n❌ Some required files are missing. Please check the project structure.');
  process.exit(1);
}

console.log('✅ All required files present');

console.log('\n🎉 Setup complete!');
console.log('\nTo start the development server:');
console.log('  npm run dev');
console.log('\nTo build for production:');
console.log('  npm run build');
console.log('\nTo start production server:');
console.log('  npm start');
console.log('\nOpen http://localhost:3000 in your browser to view the application.');
