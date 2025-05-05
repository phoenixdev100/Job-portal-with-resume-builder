const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');
const Employer = require('../models/Employer');

// Register employer
router.post('/register', [
  check('companyName', 'Company name is required').not().isEmpty(),
  check('email', 'Please include a valid email').isEmail(),
  check('password', 'Password must be 6 or more characters').isLength({ min: 6 })
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    let employer = await Employer.findOne({ email: req.body.email });
    if (employer) {
      return res.status(400).json({ msg: 'Employer already exists' });
    }

    employer = new Employer({
      companyName: req.body.companyName,
      email: req.body.email,
      password: req.body.password,
      profile: req.body.profile || {}
    });

    await employer.save();

    const payload = {
      user: {
        id: employer.id,
        type: 'employer'
      }
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET || 'secret',
      { expiresIn: '24h' },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Login employer
router.post('/login', [
  check('email', 'Please include a valid email').isEmail(),
  check('password', 'Password is required').exists()
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const employer = await Employer.findOne({ email: req.body.email });
    if (!employer) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    const isMatch = await employer.comparePassword(req.body.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    const payload = {
      user: {
        id: employer.id,
        type: 'employer'
      }
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET || 'secret',
      { expiresIn: '24h' },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Get employer profile
router.get('/profile', auth, async (req, res) => {
  try {
    const employer = await Employer.findById(req.user.id).select('-password');
    if (!employer) {
      return res.status(404).json({ msg: 'Employer not found' });
    }
    res.json(employer);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Update employer profile
router.put('/profile', auth, async (req, res) => {
  try {
    const employer = await Employer.findByIdAndUpdate(
      req.user.id,
      { 
        $set: {
          profile: req.body.profile,
          socialMedia: req.body.socialMedia
        }
      },
      { new: true }
    ).select('-password');
    
    res.json(employer);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Get public employer profile
router.get('/:id', async (req, res) => {
  try {
    const employer = await Employer.findById(req.params.id)
      .select('-password -email')
      .populate('jobs');
    
    if (!employer) {
      return res.status(404).json({ msg: 'Employer not found' });
    }

    res.json(employer);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Employer not found' });
    }
    res.status(500).send('Server error');
  }
});

module.exports = router;
