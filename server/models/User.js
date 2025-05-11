const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  profile: {
    disability: String,
    accommodations: [String],
    skills: [String],
    experience: [{
      title: String,
      company: String,
      startDate: Date,
      endDate: Date,
      description: String
    }],
    education: [{
      institution: String,
      degree: String,
      field: String,
      graduationDate: Date
    }],
    preferences: {
      remoteOnly: Boolean,
      industries: [String],
      jobTypes: [String]
    }
  },
  settings: {
    highContrast: {
      type: Boolean,
      default: false
    },
    fontSize: {
      type: String,
      default: 'medium'
    },
    screenReader: {
      type: Boolean,
      default: false
    }
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Method to compare passwords
userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
