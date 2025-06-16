import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';
// PDF Styles (commented out since not currently in use)
/*
import { StyleSheet } from '@react-pdf/renderer';
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    padding: 30,
  },
  section: {
    margin: 10,
    padding: 10,
  },
  title: {
    fontSize: 24,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 5,
  },
  text: {
    fontSize: 12,
    marginBottom: 5,
  },
});
*/

const templates = [
  {
    id: 'modern',
    name: 'Modern Professional',
    description: 'Clean and professional design with a modern touch',
    icon: (
      <svg className="w-12 h-12" viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h14a2 2 0 012 2v14a2 2 0 01-2 2zM16 11l-4 4m0 0l-4-4m4 4V3" />
      </svg>
    ),
    color: 'purple',
    style: {
      headingColor: 'text-purple-600',
      borderColor: 'border-purple-200',
      bgAccent: 'bg-purple-50',
      gradientFrom: 'from-purple-500',
      gradientTo: 'to-purple-600',
    }
  },
  {
    id: 'minimal',
    name: 'Minimal Clean',
    description: 'Simple and elegant design focusing on content',
    icon: (
      <svg className="w-12 h-12" viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
      </svg>
    ),
    color: 'blue',
    style: {
      headingColor: 'text-blue-600',
      borderColor: 'border-blue-200',
      bgAccent: 'bg-blue-50',
      gradientFrom: 'from-blue-500',
      gradientTo: 'to-blue-600',
    }
  },
  {
    id: 'creative',
    name: 'Creative Bold',
    description: 'Stand out with a bold and creative layout',
    icon: (
      <svg className="w-12 h-12" viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
    color: 'green',
    style: {
      headingColor: 'text-green-600',
      borderColor: 'border-green-200',
      bgAccent: 'bg-green-50',
      gradientFrom: 'from-green-500',
      gradientTo: 'to-green-600',
    }
  },
];

const ResumeBuilder = () => {
  const [selectedTemplate, setSelectedTemplate] = useState(templates[0]);
  const [sections, setSections] = useState([
    {
      id: 'personal',
      title: 'Personal Information',
      content: {
        name: '',
        email: '',
        phone: '',
        location: '',
      },
    },
    {
      id: 'experience',
      title: 'Work Experience',
      content: [],
    },
    {
      id: 'education',
      title: 'Education',
      content: [],
    },
    {
      id: 'skills',
      title: 'Skills',
      content: [],
    },
    {
      id: 'achievements',
      title: 'Achievements',
      content: [],
    },
  ]);

  const [activeSection, setActiveSection] = useState('personal');
  const [formData, setFormData] = useState({
    personal: { name: '', email: '', phone: '', location: '' },
    experience: [],
    education: [],
    skills: [],
    achievements: [],
  });
  const [atsScore, setAtsScore] = useState(0);

  // Handle template selection
  const handleTemplateSelect = (template) => {
    setSelectedTemplate(template);
    // Apply template-specific styling to the preview
    const previewElement = document.getElementById('resume-preview');
    if (previewElement) {
      previewElement.className = `border rounded-lg p-8 min-h-[600px] bg-white ${template.style.bgAccent}`;
    }
  };

  // Update form data
  const handleInputChange = (sectionId, field, value, index = null) => {
    setFormData(prev => {
      const newData = { ...prev };
      
      if (index !== null) {
        // Handle array fields (experience, education, etc.)
        if (!newData[sectionId]) newData[sectionId] = [];
        if (!newData[sectionId][index]) newData[sectionId][index] = {};
        newData[sectionId][index][field] = value;
      } else {
        // Handle simple fields (personal info)
        if (!newData[sectionId]) newData[sectionId] = {};
        newData[sectionId][field] = value;
      }
      
      return newData;
    });
  };

  // Add new item to a section
  const handleAddItem = (sectionId) => {
    setSections(sections.map(section => {
      if (section.id === sectionId) {
        return {
          ...section,
          content: [...section.content, { id: Date.now(), fields: {} }],
        };
      }
      return section;
    }));

    setFormData(prev => ({
      ...prev,
      [sectionId]: [...(prev[sectionId] || []), {}],
    }));
  };

  // Calculate ATS score
  const updateATSScore = useCallback(() => {
    let score = 0;
    
    // Check personal information completeness (20%)
    const personalInfo = formData.personal || {};
    const personalFields = ['name', 'email', 'phone', 'location'];
    const personalScore = personalFields.filter(field => personalInfo[field]?.trim()).length;
    score += (personalScore / personalFields.length) * 20;

    // Check work experience (30%)
    const experiences = formData.experience || [];
    if (experiences.length > 0) {
      const experienceScore = experiences.filter(exp => 
        exp.company?.trim() && exp.position?.trim() && exp.description?.trim()
      ).length;
      score += (experienceScore / experiences.length) * 30;
    }

    // Check education (20%)
    const education = formData.education || [];
    if (education.length > 0) {
      const educationScore = education.filter(edu => 
        edu.school?.trim() && edu.degree?.trim()
      ).length;
      score += (educationScore / education.length) * 20;
    }

    // Check skills (20%)
    const skills = formData.skills || [];
    if (skills.length > 0) {
      score += Math.min((skills.length / 5) * 20, 20); // Max 20% for skills
    }

    // Check achievements (10%)
    const achievements = formData.achievements || [];
    if (achievements.length > 0) {
      score += Math.min((achievements.length / 3) * 10, 10); // Max 10% for achievements
    }

    setAtsScore(Math.round(score));
  }, [formData]);

  // Update ATS score whenever form data changes
  useEffect(() => {
    updateATSScore();
  }, [updateATSScore]);

  // Export as PDF
  const exportPDF = async () => {
    try {
      const content = document.getElementById('resume-preview');
      if (!content) return;

      const canvas = await html2canvas(content, {
        scale: 2, // Better quality
        useCORS: true,
        logging: false,
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
      const imgX = (pdfWidth - imgWidth * ratio) / 2;
      const imgY = 0;

      pdf.addImage(imgData, 'PNG', imgX, imgY, imgWidth * ratio, imgHeight * ratio);
      pdf.save('resume.pdf');
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  };

  // Export as Word
  const exportWord = () => {
    try {
      const content = document.getElementById('resume-preview');
      if (!content) return;

      const preHtml = "<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'><head><meta charset='utf-8'><title>Resume</title></head><body>";
      const postHtml = "</body></html>";
      const html = preHtml + content.innerHTML + postHtml;

      const blob = new Blob([html], {
        type: 'application/msword'
      });

      // Create download link
      const downloadLink = document.createElement("a");
      document.body.appendChild(downloadLink);
      downloadLink.href = URL.createObjectURL(blob);
      downloadLink.download = 'resume.doc';
      downloadLink.click();
      document.body.removeChild(downloadLink);
    } catch (error) {
      console.error('Error generating Word document:', error);
    }
  };

  // Render preview based on template
  const renderPreview = () => {
    const { style } = selectedTemplate;
    return (
      <div className={`space-y-6 ${style.bgAccent} p-6 rounded-lg`}>
        {/* Personal Information */}
        <div>
          <h2 className={`text-2xl font-bold ${style.headingColor} mb-4`}>
            {formData.personal?.name || 'Your Name'}
          </h2>
          <div className="text-gray-600">
            <p>{formData.personal?.email}</p>
            <p>{formData.personal?.phone}</p>
            <p>{formData.personal?.location}</p>
          </div>
        </div>

        {/* Experience */}
        {formData.experience?.length > 0 && (
          <div>
            <h3 className={`text-xl font-semibold ${style.headingColor} mb-3`}>
              Work Experience
            </h3>
            {formData.experience.map((exp, index) => (
              <div key={index} className="mb-4">
                <h4 className="font-medium">{exp.company}</h4>
                <p className="text-gray-600">{exp.position}</p>
                <p className="text-gray-500">{exp.description}</p>
              </div>
            ))}
          </div>
        )}

        {/* Education */}
        {formData.education?.length > 0 && (
          <div>
            <h3 className={`text-xl font-semibold ${style.headingColor} mb-3`}>
              Education
            </h3>
            {formData.education.map((edu, index) => (
              <div key={index} className="mb-4">
                <h4 className="font-medium">{edu.school}</h4>
                <p className="text-gray-600">{edu.degree}</p>
              </div>
            ))}
          </div>
        )}

        {/* Skills */}
        {formData.skills?.length > 0 && (
          <div>
            <h3 className={`text-xl font-semibold ${style.headingColor} mb-3`}>
              Skills
            </h3>
            <div className="flex flex-wrap gap-2">
              {formData.skills.map((skill, index) => (
                <span key={index} className={`${style.bgAccent} px-3 py-1 rounded-full text-sm`}>
                  {skill.name}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Achievements */}
        {formData.achievements?.length > 0 && (
          <div>
            <h3 className={`text-xl font-semibold ${style.headingColor} mb-3`}>
              Achievements
            </h3>
            <ul className="list-disc list-inside">
              {formData.achievements.map((achievement, index) => (
                <li key={index}>{achievement.description}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  };

  const [uploadedFile, setUploadedFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [uploadError, setUploadError] = useState(null);

  const onDrop = useCallback(async (acceptedFiles) => {
    const file = acceptedFiles[0];
    setUploadedFile(file);
    setUploadProgress(0);
    setIsAnalyzing(true);
    setUploadError(null);

    const formData = new FormData();
    formData.append('resume', file);

    try {
      const response = await axios.post('/api/analyze-resume', formData, {
        onUploadProgress: (progressEvent) => {
          const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          setUploadProgress(progress);
        },
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data) {
        setAnalysisResult(response.data);
        setAtsScore(response.data.score);
      } else {
        throw new Error('No analysis data received');
      }
    } catch (error) {
      console.error('Error analyzing resume:', error);
      setUploadError(error.response?.data?.error || error.message || 'Error analyzing resume');
      setAnalysisResult(null);
    } finally {
      setIsAnalyzing(false);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx']
    },
    maxFiles: 1
  });

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">AI-Powered Resume Builder</h1>
          <p className="text-xl text-gray-600">Create a professional, ATS-friendly resume in minutes</p>
        </motion.div>

        {/* Template Selection */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Choose a Template</h2>
          <p className="text-gray-600 mb-6">Select a template that best fits your professional style</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {templates.map((template) => (
              <motion.div
                key={template.id}
                className={`relative group rounded-xl overflow-hidden shadow-lg transition-all duration-300 cursor-pointer ${
                  selectedTemplate.id === template.id
                    ? `ring-2 ring-${template.color}-500 ring-offset-2`
                    : 'hover:shadow-xl'
                }`}
                onClick={() => handleTemplateSelect(template)}
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                {/* Template Preview */}
                <div className={`relative p-8 ${template.style.bgAccent} flex flex-col items-center justify-center min-h-[200px]`}>
                  <div className={`text-${template.color}-500 mb-4 transform group-hover:scale-110 transition-transform duration-300`}>
                    {template.icon}
                  </div>
                  <div className={`absolute inset-0 bg-gradient-to-br ${template.style.gradientFrom} ${template.style.gradientTo} opacity-5 group-hover:opacity-10 transition-opacity duration-300`}></div>
                </div>
                
                {/* Template Info */}
                <div className="p-6 bg-white">
                  <h3 className={`text-lg font-semibold ${template.style.headingColor} mb-2`}>
                    {template.name}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {template.description}
                  </p>
                </div>

                {/* Selected Indicator */}
                {selectedTemplate.id === template.id && (
                  <div className="absolute top-4 right-4">
                    <span className={`flex items-center justify-center w-8 h-8 rounded-full bg-${template.color}-500 text-white`}>
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"></path>
                      </svg>
                    </span>
                  </div>
                )}

                {/* Hover Overlay with Button */}
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button className={`w-full py-2 bg-${template.color}-500 text-white rounded-lg hover:bg-${template.color}-600 transition-colors duration-300`}>
                    {selectedTemplate.id === template.id ? 'Selected' : 'Select Template'}
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Upload Resume */}
          <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
              <svg className="w-6 h-6 mr-2 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
              Upload Existing Resume
            </h2>

            <div 
              {...getRootProps()} 
              className={`border-2 border-dashed rounded-lg p-8 text-center transition-all duration-200 ${
                isDragActive 
                  ? 'border-purple-500 bg-purple-50' 
                  : 'border-gray-300 hover:border-purple-400 hover:bg-gray-50'
              }`}
            >
              <input {...getInputProps()} />
              <div className="space-y-4">
                <svg 
                  className={`w-12 h-12 mx-auto ${isDragActive ? 'text-purple-500' : 'text-gray-400'}`} 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" 
                  />
                </svg>
                <div className="text-lg font-medium text-gray-900">
                  {isDragActive ? (
                    <span className="text-purple-600">Drop your resume here</span>
                  ) : (
                    <span>
                      Drag & drop your resume here, or{' '}
                      <span className="text-purple-600 hover:text-purple-700 cursor-pointer">browse</span>
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-500">
                  Supports PDF, DOC, DOCX (up to 10MB)
                </p>
              </div>
            </div>

            {uploadedFile && (
              <div className="mt-6 space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <div>
                      <p className="font-medium text-gray-900">{uploadedFile.name}</p>
                      <p className="text-sm text-gray-500">{Math.round(uploadedFile.size / 1024)} KB</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setUploadedFile(null)}
                    className="text-gray-400 hover:text-gray-500"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                {uploadProgress < 100 && (
                  <div className="relative pt-1">
                    <div className="flex mb-2 items-center justify-between">
                      <div>
                        <span className="text-xs font-semibold inline-block text-purple-600">
                          Uploading...
                        </span>
                      </div>
                      <div className="text-right">
                        <span className="text-xs font-semibold inline-block text-purple-600">
                          {uploadProgress}%
                        </span>
                      </div>
                    </div>
                    <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-purple-100">
                      <motion.div
                        style={{ width: `${uploadProgress}%` }}
                        className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-purple-500"
                        initial={{ width: 0 }}
                        animate={{ width: `${uploadProgress}%` }}
                        transition={{ duration: 0.5 }}
                      />
                    </div>
                  </div>
                )}

                {isAnalyzing && (
                  <div className="flex items-center justify-center space-x-3 text-purple-600">
                    <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    <span>Analyzing your resume...</span>
                  </div>
                )}

                {uploadError && (
                  <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                    <div className="flex items-center space-x-2 text-red-600">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="font-medium">{uploadError}</span>
                    </div>
                  </div>
                )}

                {analysisResult && (
                  <div className="mt-6 p-6 bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg">
                    <h3 className="text-lg font-medium text-purple-900 mb-4">Analysis Results</h3>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium text-purple-900">ATS Score</span>
                          <span className="text-sm font-medium text-purple-900">{analysisResult.score}%</span>
                        </div>
                        <div className="w-full bg-white rounded-full h-2.5">
                          <motion.div
                            className="bg-purple-600 h-2.5 rounded-full"
                            initial={{ width: 0 }}
                            animate={{ width: `${analysisResult.score}%` }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                          />
                        </div>
                      </div>

                      {analysisResult.details && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {analysisResult.details.skillsFound.length > 0 && (
                            <div className="bg-white p-4 rounded-lg">
                              <h4 className="font-medium text-purple-900 mb-2">Skills Found</h4>
                              <div className="flex flex-wrap gap-2">
                                {analysisResult.details.skillsFound.map((skill, index) => (
                                  <span key={index} className="px-2 py-1 bg-purple-100 text-purple-700 rounded text-sm">
                                    {skill}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}

                          {analysisResult.details.verbsFound.length > 0 && (
                            <div className="bg-white p-4 rounded-lg">
                              <h4 className="font-medium text-purple-900 mb-2">Action Verbs Found</h4>
                              <div className="flex flex-wrap gap-2">
                                {analysisResult.details.verbsFound.map((verb, index) => (
                                  <span key={index} className="px-2 py-1 bg-green-100 text-green-700 rounded text-sm">
                                    {verb}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      )}

                      {analysisResult.suggestions && analysisResult.suggestions.length > 0 && (
                        <div className="space-y-3">
                          <h4 className="font-medium text-purple-900">Suggestions for Improvement</h4>
                          <ul className="space-y-2">
                            {analysisResult.suggestions.map((suggestion, index) => (
                              <motion.li
                                key={index}
                                className="flex items-start space-x-2 text-sm text-gray-600"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.1 }}
                              >
                                <svg className="w-5 h-5 text-purple-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <span>{suggestion}</span>
                              </motion.li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Builder Section */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
              <svg className="w-6 h-6 mr-2 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Build Your Resume
            </h2>
            
            {/* Section Navigation */}
            <div className="flex space-x-2 mb-8 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-purple-500 scrollbar-track-purple-100">
              {sections.map((section) => (
                <motion.button
                  key={section.id}
                  className={`px-6 py-3 rounded-lg whitespace-nowrap flex items-center space-x-2 transition-all duration-200 ${
                    activeSection === section.id
                      ? `bg-purple-600 text-white shadow-lg shadow-purple-200`
                      : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                  }`}
                  onClick={() => setActiveSection(section.id)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {section.id === 'personal' && (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  )}
                  {section.id === 'experience' && (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  )}
                  {section.id === 'education' && (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path d="M12 14l9-5-9-5-9 5 9 5z" />
                      <path d="M12 14l6.16-3.422a12.083 12.083 0 014.678 9.89M12 14l-.01.01m0-.01L10.294 8m-5 12v1m0 0l5-1-5-1V6a1 1 0 010-2 1 1 0 012 0v7a4 4 0 011.01-.93l-.46-2.24A7.5 7.5 0 0112 7.17v7.625a4.5 4.5 0 01-.5 3.93L8 13l4 2V8.25A2.5 2.5 0 0012 5.75V7" />
                    </svg>
                  )}
                  {section.id === 'skills' && (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                  )}
                  <span>{section.title}</span>
                </motion.button>
              ))}
            </div>

            {/* Section Content */}
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {activeSection === 'personal' && (
                <div className="space-y-4">
                  <motion.div
                    className="group"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                  >
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                    <input
                      type="text"
                      placeholder="e.g., John Doe"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 bg-gray-50 group-hover:bg-white"
                      value={formData.personal?.name || ''}
                      onChange={(e) => handleInputChange('personal', 'name', e.target.value)}
                    />
                  </motion.div>
                  <motion.div
                    className="group"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input
                      type="email"
                      placeholder="e.g., john@example.com"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 bg-gray-50 group-hover:bg-white"
                      value={formData.personal?.email || ''}
                      onChange={(e) => handleInputChange('personal', 'email', e.target.value)}
                    />
                  </motion.div>
                  <motion.div
                    className="group"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                    <input
                      type="tel"
                      placeholder="e.g., +1 234 567 8900"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 bg-gray-50 group-hover:bg-white"
                      value={formData.personal?.phone || ''}
                      onChange={(e) => handleInputChange('personal', 'phone', e.target.value)}
                    />
                  </motion.div>
                  <motion.div
                    className="group"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                    <input
                      type="text"
                      placeholder="e.g., New York, NY"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 bg-gray-50 group-hover:bg-white"
                      value={formData.personal?.location || ''}
                      onChange={(e) => handleInputChange('personal', 'location', e.target.value)}
                    />
                  </motion.div>
                </div>
              )}

              {activeSection === 'experience' && (
                <div className="space-y-6">
                  {formData.experience?.map((exp, index) => (
                    <motion.div
                      key={index}
                      className="p-6 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 bg-white"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <div className="space-y-4">
                        <input
                          type="text"
                          placeholder="Company Name"
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                          value={exp.company || ''}
                          onChange={(e) => handleInputChange('experience', 'company', e.target.value, index)}
                        />
                        <input
                          type="text"
                          placeholder="Position"
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                          value={exp.position || ''}
                          onChange={(e) => handleInputChange('experience', 'position', e.target.value, index)}
                        />
                        <textarea
                          placeholder="Description"
                          rows="3"
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 resize-none"
                          value={exp.description || ''}
                          onChange={(e) => handleInputChange('experience', 'description', e.target.value, index)}
                        />
                      </div>
                    </motion.div>
                  ))}
                  <motion.button
                    className="w-full py-3 px-4 border-2 border-dashed border-purple-300 rounded-lg text-purple-600 hover:bg-purple-50 hover:border-purple-400 transition-all duration-200 flex items-center justify-center space-x-2"
                    onClick={() => handleAddItem('experience')}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6a2 2 0 002-2V5a2 2 0 012-2h14a2 2 0 012 2v14a2 2 0 01-2 2zM16 11l-4 4m0 0l-4-4m4 4V3" />
                    </svg>
                    <span>Add Experience</span>
                  </motion.button>
                </div>
              )}

              {/* Similar enhanced styling for education and skills sections */}
            </motion.div>
          </div>

          {/* Preview Section */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold text-gray-900 flex items-center">
                <svg className="w-6 h-6 mr-2 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                Preview
              </h2>
              <div className="flex space-x-3">
                <motion.button
                  onClick={exportPDF}
                  className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors duration-200 flex items-center space-x-2"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  <span>Export PDF</span>
                </motion.button>
                <motion.button
                  onClick={exportWord}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors duration-200 flex items-center space-x-2"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <span>Export Word</span>
                </motion.button>
              </div>
            </div>

            {/* ATS Score */}
            <div className="mb-6 p-6 bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg">
              <h3 className="text-lg font-medium text-purple-900 mb-3 flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                ATS Score
              </h3>
              <div className="flex items-center">
                <div className="flex-1 mr-4">
                  <div className="w-full bg-white rounded-full h-3">
                    <motion.div
                      className="bg-purple-600 h-3 rounded-full"
                      style={{ width: `${atsScore}%` }}
                      initial={{ width: 0 }}
                      animate={{ width: `${atsScore}%` }}
                      transition={{ duration: 0.5, ease: "easeOut" }}
                    />
                  </div>
                </div>
                <motion.span
                  className="text-purple-600 font-semibold text-lg"
                  key={atsScore}
                  initial={{ scale: 1.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  {atsScore}%
                </motion.span>
              </div>
            </div>

            {/* Resume Preview */}
            <motion.div
              id="resume-preview"
              className="border rounded-lg p-8 bg-white shadow-inner min-h-[600px]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {renderPreview()}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeBuilder;
