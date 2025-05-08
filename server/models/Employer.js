const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const employerSchema = new mongoose.Schema({
  companyName: {
    type: String,
    required: true
  },
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
  profile: {
    description: String,
    industry: String,
    website: String,
    logo: String,
    size: {
      type: String,
      enum: ['1-10', '11-50', '51-200', '201-500', '501-1000', '1000+']
    },
    location: String,
    inclusivityMetrics: {
      disabilityAccommodations: [String],
      accessibilityFeatures: [String],
      inclusivityCertifications: [String]
    }
  },
  socialMedia: {
    linkedin: String,
    twitter: String,
    facebook: String
  },
  verificationStatus: {
    type: String,
    enum: ['pending', 'verified', 'rejected'],
    default: 'pending'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Hash password before saving
employerSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Update timestamp before saving
employerSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Method to compare passwords
employerSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('Employer', employerSchema);
