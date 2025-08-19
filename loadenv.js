// This file ensures environment variables persist across different accounts
// Run this with: node loadenv.js

import { writeFileSync, existsSync } from 'fs';

const envContent = `VITE_SUPABASE_URL=https://dcukhspidlkabkyqzevz.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRjdWtoc3BpZGxrYWJreXF6ZXZ6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTUxMDg5NjEsImV4cCI6MjA3MDY4NDk2MX0.vAY8PN2DLyA35LjHDFYVqJuqBfG6eHzSefjlb0wM9zc
VITE_RAWG_API_KEY=e55a752ed9f445e4b59f1bfa4419373c`;

if (!existsSync('.env')) {
  writeFileSync('.env', envContent);
  console.log('✅ .env file created successfully');
} else {
  console.log('ℹ️  .env file already exists');
}

console.log('🔧 Remember to update VITE_SUPABASE_ANON_KEY with your actual Supabase anon key');