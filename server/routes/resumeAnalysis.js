const express = require('express');
const router = express.Router();
const multer = require('multer');
const pdf = require('pdf-parse');
const mammoth = require('mammoth');
const fs = require('fs');
const path = require('path');

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Configure multer for file upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadsDir);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only PDF, DOC and DOCX files are allowed.'));
  }
};

const upload = multer({ 
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB limit
  }
});

// Keywords that ATS systems typically look for
const atsKeywords = {
  skills: [
    'javascript', 'react', 'node.js', 'python', 'java', 'sql', 'mongodb',
    'aws', 'docker', 'kubernetes', 'ci/cd', 'agile', 'scrum', 'html', 'css',
    'git', 'rest api', 'typescript', 'angular', 'vue.js', 'express', 'php',
    'c++', 'c#', 'ruby', 'swift', 'kotlin', 'android', 'ios', 'mobile development',
    'web development', 'database', 'api', 'testing', 'debugging'
  ],
  action_verbs: [
    'developed', 'implemented', 'managed', 'led', 'created', 'designed',
    'improved', 'increased', 'reduced', 'achieved', 'collaborated', 'built',
    'optimized', 'architected', 'debugged', 'deployed', 'maintained', 'tested',
    'automated', 'streamlined', 'coordinated', 'mentored', 'launched'
  ],
  soft_skills: [
    'communication', 'leadership', 'teamwork', 'problem solving',
    'analytical', 'attention to detail', 'time management', 'project management',
    'critical thinking', 'adaptability', 'creativity', 'collaboration'
  ]
};

// Function to analyze resume content
const analyzeResume = (text) => {
  text = text.toLowerCase();
  console.log('Analyzing text:', text.substring(0, 200) + '...'); // Log first 200 chars for debugging

  const analysis = {
    score: 0,
    suggestions: [],
    details: {
      skillsFound: [],
      verbsFound: [],
      softSkillsFound: [],
      missingElements: []
    }
  };

  // Check for contact information
  if (!text.match(/[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/)) {
    analysis.suggestions.push('Add a professional email address');
    analysis.details.missingElements.push('email');
  }
  if (!text.match(/\b\d{10}\b|\b\d{3}[-.]?\d{3}[-.]?\d{4}\b/)) {
    analysis.suggestions.push('Include a phone number');
    analysis.details.missingElements.push('phone');
  }

  // Check for skills
  let skillsFound = 0;
  atsKeywords.skills.forEach(skill => {
    if (text.includes(skill)) {
      skillsFound++;
      analysis.details.skillsFound.push(skill);
    }
  });
  
  // Check for action verbs
  let verbsFound = 0;
  atsKeywords.action_verbs.forEach(verb => {
    if (text.includes(verb)) {
      verbsFound++;
      analysis.details.verbsFound.push(verb);
    }
  });

  // Check for soft skills
  let softSkillsFound = 0;
  atsKeywords.soft_skills.forEach(skill => {
    if (text.includes(skill)) {
      softSkillsFound++;
      analysis.details.softSkillsFound.push(skill);
    }
  });

  // Calculate scores
  const skillsScore = (skillsFound / atsKeywords.skills.length) * 35;
  const verbsScore = (verbsFound / atsKeywords.action_verbs.length) * 25;
  const softSkillsScore = (softSkillsFound / atsKeywords.soft_skills.length) * 20;
  
  // Check for education section
  const hasEducation = text.includes('education') || text.includes('university') || text.includes('college');
  const educationScore = hasEducation ? 10 : 0;
  
  // Check for experience section
  const hasExperience = text.includes('experience') || text.includes('work') || text.includes('employment');
  const experienceScore = hasExperience ? 10 : 0;

  analysis.score = Math.round(skillsScore + verbsScore + softSkillsScore + educationScore + experienceScore);

  // Add suggestions based on analysis
  if (skillsFound < atsKeywords.skills.length * 0.3) {
    analysis.suggestions.push('Include more relevant technical skills. Consider adding: ' + 
      atsKeywords.skills.filter(skill => !analysis.details.skillsFound.includes(skill)).slice(0, 5).join(', '));
  }
  if (verbsFound < atsKeywords.action_verbs.length * 0.3) {
    analysis.suggestions.push('Use more action verbs to describe your experiences. Consider using: ' + 
      atsKeywords.action_verbs.filter(verb => !analysis.details.verbsFound.includes(verb)).slice(0, 5).join(', '));
  }
  if (softSkillsFound < atsKeywords.soft_skills.length * 0.3) {
    analysis.suggestions.push('Add more soft skills to your resume. Consider adding: ' + 
      atsKeywords.soft_skills.filter(skill => !analysis.details.softSkillsFound.includes(skill)).slice(0, 3).join(', '));
  }
  if (!hasEducation) {
    analysis.suggestions.push('Add an education section to your resume');
  }
  if (!hasExperience) {
    analysis.suggestions.push('Add work experience section to your resume');
  }
  if (text.length < 2000) {
    analysis.suggestions.push('Your resume might be too short. Consider adding more details about your experiences');
  }

  console.log('Analysis result:', analysis); // Log analysis result for debugging
  return analysis;
};

// Route to handle resume upload and analysis
router.post('/analyze-resume', upload.single('resume'), async (req, res) => {
  console.log('Received resume analysis request'); // Log request received

  try {
    if (!req.file) {
      console.log('No file uploaded');
      return res.status(400).json({ error: 'No file uploaded' });
    }

    console.log('File received:', req.file); // Log file details

    let text = '';
    const filePath = req.file.path;
    const fileExt = req.file.originalname.split('.').pop().toLowerCase();

    // Extract text based on file type
    if (fileExt === 'pdf') {
      console.log('Processing PDF file');
      const dataBuffer = fs.readFileSync(filePath);
      const data = await pdf(dataBuffer);
      text = data.text;
    } else if (fileExt === 'docx' || fileExt === 'doc') {
      console.log('Processing Word document');
      const result = await mammoth.extractRawText({ path: filePath });
      text = result.value;
    } else {
      console.log('Unsupported file format:', fileExt);
      return res.status(400).json({ error: 'Unsupported file format' });
    }

    console.log('Text extracted successfully');

    // Analyze the resume
    const analysis = analyzeResume(text);

    // Clean up uploaded file
    fs.unlinkSync(filePath);

    console.log('Analysis completed successfully');
    res.json(analysis);
  } catch (error) {
    console.error('Error analyzing resume:', error);
    res.status(500).json({ error: 'Error analyzing resume', details: error.message });
  }
});

module.exports = router;
