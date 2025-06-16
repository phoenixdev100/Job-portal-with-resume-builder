const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log('🚀 Setting up environment configuration...\n');

// Function to create .env file from .env.example
const createEnvFile = (source, target, isServer = false) => {
  if (fs.existsSync(target)) {
    console.log(`ℹ️  ${target} already exists. Skipping...`);
    return Promise.resolve();
  }

  console.log(`\n🔧 Creating ${target}...`);
  
  return new Promise((resolve) => {
    fs.copyFile(source, target, (err) => {
      if (err) {
        console.error(`❌ Error creating ${target}:`, err.message);
        resolve();
        return;
      }
      
      if (isServer) {
        console.log(`✅ Created ${target} - Please update it with your configuration`);
        console.log('   Required fields to update:');
        console.log('   - MONGODB_URI: Your MongoDB connection string');
        console.log('   - JWT_SECRET: A secure random string for JWT signing');
        console.log('   - GOOGLE_CLIENT_ID & GOOGLE_CLIENT_SECRET: For Google OAuth');
        console.log('   - SMTP settings: For email functionality\n');
      } else {
        console.log(`✅ Created ${target} - Please update it with your configuration\n`);
      }
      resolve();
    });
  });
};

// Main setup function
const setup = async () => {
  try {
    // Create client .env files
    await createEnvFile(
      path.join(__dirname, 'client', '.env.development'),
      path.join(__dirname, 'client', '.env')
    );
    
    // Create server .env file
    await createEnvFile(
      path.join(__dirname, 'server', '.env.example'),
      path.join(__dirname, 'server', '.env'),
      true
    );

    console.log('\n🎉 Environment setup completed!');
    console.log('\nNext steps:');
    console.log('1. Update the .env files with your configuration');
    console.log('2. For production, set the same environment variables in your hosting platform');
    console.log('3. For local development, you can start the servers with:');
    console.log('   - Server: cd server && npm install && npm run dev');
    console.log('   - Client: cd client && npm install && npm start');
    
  } catch (error) {
    console.error('❌ Error during setup:', error.message);
  } finally {
    rl.close();
  }
};

// Start the setup
setup();
