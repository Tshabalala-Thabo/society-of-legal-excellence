const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config({ path: '.env.local' });

const adminSchema = new mongoose.Schema({
  email: String,
  password: String,
  name: String,
});

const Admin = mongoose.models.Admin || mongoose.model('Admin', adminSchema);

async function createAdmin() {
  await mongoose.connect(process.env.MONGODB_URI);
  
  const hashedPassword = await bcrypt.hash('your-password', 10);
  
  await Admin.create({
    email: 'admin@sle.org.za',
    password: hashedPassword,
    name: 'Admin User',
  });
  
  console.log('Admin user created successfully!');
  process.exit(0);
}

createAdmin().catch(console.error);