// models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phoneNumber: { type: String, required: true, unique: true },
  isVerified: { type: Boolean, default: false },
  verificationCode: String,
  verificationExpires: Date,
  posts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }],
});

module.exports = mongoose.models.User || mongoose.model('User', userSchema);
