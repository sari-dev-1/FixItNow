const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');
const SALT_ROUNDS = 10;
const UserSchema = new Schema({
  userId: { type: Number, required: true },
  username: {
    type: String,
    required: true,
    minlength: 2,
    trim: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  phone: {
    type: String,
    required: true,
    trim: true,
    match: /^05[0-9]-?\d{7}$/
  },
  email: {
    type: String,
    required: true,
    match: /.+\@.+\..+/,
    trim: true,
    lowercase: true,
    unique: true
  },
  role: {
    type: String,
    enum: ['admin', 'developer', 'support'],
    default: 'support',
    required: true
  },
  isActive: {
    type: Boolean,
    default: true
  },
  canApprove: {
    type: Boolean,
    default: false
  }
}, { timestamps: true });

UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  try {
    const hashed = await bcrypt.hash(this.password, SALT_ROUNDS);
    this.password = hashed;
    next();
  } catch (err) {
    next(err);
  }
});

UserSchema.methods.comparePassword = function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

UserSchema.index({ email: 1 });
UserSchema.index({ username: 1 });

module.exports = model("User", UserSchema);
