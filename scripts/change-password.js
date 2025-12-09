const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config({ path: '.env.local' });

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
    console.error('Please define the MONGODB_URI environment variable inside .env.local');
    process.exit(1);
}

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        default: 'user',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const User = mongoose.models.User || mongoose.model('User', UserSchema);

async function changePassword() {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log('Connected to MongoDB');

        const email = process.argv[2];
        const newPassword = process.argv[3];

        if (!email || !newPassword) {
            console.error('Usage: node scripts/change-password.js <email> <new-password>');
            process.exit(1);
        }

        const existingUser = await User.findOne({ email });
        if (!existingUser) {
            console.error('User not found');
            process.exit(1);
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);

        await User.updateOne(
            { email },
            { $set: { password: hashedPassword } }
        );

        console.log(`Password updated successfully for user: ${email}`);
        process.exit(0);
    } catch (error) {
        console.error('Error changing password:', error);
        process.exit(1);
    }
}

changePassword();
