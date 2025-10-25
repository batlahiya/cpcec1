#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🚀 Setting up Port City Chat Agent...\n');

// Check if package.json exists
if (!fs.existsSync('package.json')) {
  console.error('❌ package.json not found. Please run this script from the project root.');
  process.exit(1);
}

// Check Node.js version
const nodeVersion = process.version;
const majorVersion = parseInt(nodeVersion.slice(1).split('.')[0]);

if (majorVersion < 16) {
  console.error('❌ Node.js 16 or higher is required. Current version:', nodeVersion);
  process.exit(1);
}

console.log('✅ Node.js version check passed:', nodeVersion);

// Check if dependencies are installed
if (!fs.existsSync('node_modules')) {
  console.log('📦 Installing dependencies...');
  const { execSync } = require('child_process');
  try {
    execSync('npm install', { stdio: 'inherit' });
    console.log('✅ Dependencies installed successfully');
  } catch (error) {
    console.error('❌ Failed to install dependencies:', error.message);
    process.exit(1);
  }
} else {
  console.log('✅ Dependencies already installed');
}

// Create .env file if it doesn't exist
if (!fs.existsSync('.env')) {
  const envContent = `# Port City Chat Agent Environment Variables
REACT_APP_API_URL=http://localhost:3001
REACT_APP_MAP_API_KEY=your_map_api_key_here
REACT_APP_ANALYTICS_ID=your_analytics_id_here
`;
  fs.writeFileSync('.env', envContent);
  console.log('✅ Created .env file');
} else {
  console.log('✅ .env file already exists');
}

console.log('\n🎉 Setup complete! You can now run:');
console.log('  npm start     - Start development server');
console.log('  npm run build - Build for production');
console.log('  npm test      - Run tests\n');

console.log('📚 For more information, check the README.md file');

