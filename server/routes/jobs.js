const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../middleware/auth');
const Job = require('../models/Job');
const Employer = require('../models/Employer');
const mongoose = require('mongoose');

// Utility function to check if string is valid ObjectId
const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

// Get all jobs with filters
router.get('/', async (req, res) => {
  try {
    const {
      remoteWork,
      location,
      type,
      accessibility,
      skills,
      page = 1,
      limit = 10
    } = req.query;

    let query = {};

    if (remoteWork) {
      query['accessibility.remoteWork'] = remoteWork === 'true';
    }
    if (location) {
      query.location = new RegExp(location, 'i');
    }
    if (type) {
      query.type = type;
    }
    if (accessibility) {
      query['accessibility.accommodations'] = { $in: [accessibility] };
    }
    if (skills) {
      query.skills = { $in: skills.split(',') };
    }

    const jobs = await Job.find(query)
      .populate('company', 'companyName profile.logo')
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);

    const total = await Job.countDocuments(query);

    res.json({
      jobs,
      totalPages: Math.ceil(total / limit),
      currentPage: parseInt(page)
    });
  } catch (err) {
    console.error('Error fetching jobs:', err);
    res.status(500).json({ message: 'Server error while fetching jobs' });
  }
});

// Get job by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    // Handle special routes
    if (id === 'saved' || id === 'applied') {
      return res.json({ 
        jobs: [], 
        message: `No ${id} jobs found` 
      });
    }

    // Validate ObjectId
    if (!isValidObjectId(id)) {
      return res.status(400).json({ 
        message: 'Invalid job ID format' 
      });
    }

    const job = await Job.findById(id).populate('company', 'companyName profile.logo');
    
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    res.json(job);
  } catch (err) {
    console.error('Error fetching job:', err);
    res.status(500).json({ message: 'Server error while fetching job details' });
  }
});

// Create a new job
router.post('/', [auth, [
  check('title', 'Title is required').not().isEmpty(),
  check('description', 'Description is required').not().isEmpty(),
  check('location', 'Location is required').not().isEmpty(),
  check('type', 'Job type is required').not().isEmpty()
]], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const employer = await Employer.findOne({ user: req.user.id });
    if (!employer) {
      return res.status(401).json({ message: 'Not authorized as an employer' });
    }

    const newJob = new Job({
      ...req.body,
      company: employer._id,
      createdAt: new Date()
    });

    const job = await newJob.save();
    res.json(job);
  } catch (err) {
    console.error('Error creating job:', err);
    res.status(500).json({ message: 'Server error while creating job' });
  }
});

// Update job
router.put('/:id', [auth], async (req, res) => {
  try {
    const { id } = req.params;

    // Validate ObjectId
    if (!isValidObjectId(id)) {
      return res.status(400).json({ 
        message: 'Invalid job ID format' 
      });
    }

    const job = await Job.findById(id);
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    const employer = await Employer.findOne({ user: req.user.id });
    if (!employer || job.company.toString() !== employer._id.toString()) {
      return res.status(401).json({ message: 'Not authorized to update this job' });
    }

    const updatedJob = await Job.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true }
    );

    res.json(updatedJob);
  } catch (err) {
    console.error('Error updating job:', err);
    res.status(500).json({ message: 'Server error while updating job' });
  }
});

// Delete job
router.delete('/:id', auth, async (req, res) => {
  try {
    const { id } = req.params;

    // Validate ObjectId
    if (!isValidObjectId(id)) {
      return res.status(400).json({ 
        message: 'Invalid job ID format' 
      });
    }

    const job = await Job.findById(id);
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    const employer = await Employer.findOne({ user: req.user.id });
    if (!employer || job.company.toString() !== employer._id.toString()) {
      return res.status(401).json({ message: 'Not authorized to delete this job' });
    }

    await job.remove();
    res.json({ message: 'Job removed' });
  } catch (err) {
    console.error('Error deleting job:', err);
    res.status(500).json({ message: 'Server error while deleting job' });
  }
});

module.exports = router;
