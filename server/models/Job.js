const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  company: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employer',
    required: true
  },
  description: {
    type: String,
    required: true
  },
  requirements: [{
    type: String
  }],
  accessibility: {
    remoteWork: {
      type: Boolean,
      default: false
    },
    flexibleHours: {
      type: Boolean,
      default: false
    },
    wheelchairAccessible: {
      type: Boolean,
      default: false
    },
    assistiveTechnology: {
      available: Boolean,
      description: String
    },
    accommodations: [{
      type: String
    }]
  },
  location: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['full-time', 'part-time', 'contract', 'internship'],
    required: true
  },
  salary: {
    min: Number,
    max: Number,
    currency: {
      type: String,
      default: 'USD'
    }
  },
  skills: [{
    type: String
  }],
  applicationDeadline: Date,
  status: {
    type: String,
    enum: ['active', 'closed', 'draft'],
    default: 'active'
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

// Update the updatedAt timestamp before saving
jobSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Job', jobSchema);
