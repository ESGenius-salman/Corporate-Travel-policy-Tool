// modules/verifications/otp.js
const User = require('../User'); // your User model
const nodemailer = require('nodemailer');

// Function to send OTP via email
async function sendOtpEmail(to, otp) {
  try {
    const transporter = nodemailer.createTransport({
      service: 'Gmail', // or any other email service
      auth: {
        user: process.env.EMAIL, // your email
        pass: process.env.EMAIL_PASSWORD, // your email password or app-specific password
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL,
      to,
      subject: 'Your OTP Code',
      text: `Your OTP is: ${otp}. It is valid for 5 minutes.`,
    });
  } catch (err) {
    console.error('Error sending OTP email:', err);
    throw new Error('Failed to send OTP email');
  }
}

// Generate OTP and send it to user's email
async function generateOtp(userId) {
  const otp = Math.floor(100000 + Math.random() * 900000); // 6-digit OTP
  const expiry = Date.now() + 5 * 60 * 1000; // OTP valid for 5 minutes

  const user = await User.findById(userId);
  if (!user) throw new Error('User not found');

  user.otp = otp;
  user.otpExpiry = expiry;
  await user.save();

  await sendOtpEmail(user.email, otp);

  return otp; // optional, mainly for logging
}

// Verify the OTP entered by the user
async function verifyOtp(userId, otp) {
  const user = await User.findById(userId);
  if (!user) throw new Error('User not found');

  if (user.otp !== Number(otp)) throw new Error('Invalid OTP');
  if (Date.now() > user.otpExpiry) throw new Error('OTP expired');

  // Clear OTP after successful verification
  user.otp = null;
  user.otpExpiry = null;
  await user.save();

  return true;
}

module.exports = { generateOtp, verifyOtp };
