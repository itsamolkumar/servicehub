const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  passwordHash: { type: String, required: true },
  role: { type: String, enum: ['user', 'provider', 'admin'], default: 'user' },
  address: { type: String },
  mobile: { type: String },
  isApproved: { type: Boolean, default: false }, // for providers
  createdAt: { type: Date, default: Date.now }
});

userSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.passwordHash;
  return obj;
};

module.exports = mongoose.model('User', userSchema);
