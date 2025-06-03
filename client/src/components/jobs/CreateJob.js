import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from 'react-query';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const CreateJob = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    requirements: [''],
    location: '',
    type: 'full-time',
    salary: {
      min: '',
      max: '',
      currency: 'USD'
    },
    skills: [''],
    accessibility: {
      remoteWork: false,
      flexibleHours: false,
      wheelchairAccessible: false,
      assistiveTechnology: {
        available: false,
        description: ''
      },
      accommodations: []
    }
  });

  const createJobMutation = useMutation(
    async (jobData) => {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': token
        }
      };
      const res = await axios.post('/api/jobs', jobData, config);
      return res.data;
    },
    {
      onSuccess: () => {
        toast.success('Job posted successfully!');
        navigate('/dashboard');
      },
      onError: (error) => {
        toast.error(error.response?.data?.msg || 'Error creating job');
      }
    }
  );

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name.startsWith('accessibility.')) {
      const accessibilityField = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        accessibility: {
          ...prev.accessibility,
          [accessibilityField]: type === 'checkbox' ? checked : value
        }
      }));
    } else if (name.startsWith('salary.')) {
      const salaryField = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        salary: {
          ...prev.salary,
          [salaryField]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleRequirementChange = (index, value) => {
    const newRequirements = [...formData.requirements];
    newRequirements[index] = value;
    setFormData(prev => ({
      ...prev,
      requirements: newRequirements
    }));
  };

  const addRequirement = () => {
    setFormData(prev => ({
      ...prev,
      requirements: [...prev.requirements, '']
    }));
  };

  const removeRequirement = (index) => {
    setFormData(prev => ({
      ...prev,
      requirements: prev.requirements.filter((_, i) => i !== index)
    }));
  };

  const handleSkillChange = (index, value) => {
    const newSkills = [...formData.skills];
    newSkills[index] = value;
    setFormData(prev => ({
      ...prev,
      skills: newSkills
    }));
  };

  const addSkill = () => {
    setFormData(prev => ({
      ...prev,
      skills: [...prev.skills, '']
    }));
  };

  const removeSkill = (index) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Filter out empty requirements and skills
    const cleanedData = {
      ...formData,
      requirements: formData.requirements.filter(req => req.trim()),
      skills: formData.skills.filter(skill => skill.trim())
    };
    createJobMutation.mutate(cleanedData);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8" tabIndex="0">
        Post a New Job
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-4" tabIndex="0">
            Basic Information
          </h2>
          
          <div className="space-y-4">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                Job Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                className="form-input mt-1"
                aria-label="Job Title"
              />
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                Job Description
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                rows="5"
                className="form-textarea mt-1"
                aria-label="Job Description"
              />
            </div>

            <div>
              <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                Location
              </label>
              <input
                type="text"
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                required
                className="form-input mt-1"
                aria-label="Job Location"
              />
            </div>

            <div>
              <label htmlFor="type" className="block text-sm font-medium text-gray-700">
                Job Type
              </label>
              <select
                id="type"
                name="type"
                value={formData.type}
                onChange={handleChange}
                required
                className="form-select mt-1"
                aria-label="Job Type"
              >
                <option value="full-time">Full Time</option>
                <option value="part-time">Part Time</option>
                <option value="contract">Contract</option>
                <option value="internship">Internship</option>
              </select>
            </div>
          </div>
        </div>

        {/* Salary Information */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-4" tabIndex="0">
            Salary Information
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label htmlFor="salary.min" className="block text-sm font-medium text-gray-700">
                Minimum Salary
              </label>
              <input
                type="number"
                id="salary.min"
                name="salary.min"
                value={formData.salary.min}
                onChange={handleChange}
                className="form-input mt-1"
                aria-label="Minimum Salary"
              />
            </div>

            <div>
              <label htmlFor="salary.max" className="block text-sm font-medium text-gray-700">
                Maximum Salary
              </label>
              <input
                type="number"
                id="salary.max"
                name="salary.max"
                value={formData.salary.max}
                onChange={handleChange}
                className="form-input mt-1"
                aria-label="Maximum Salary"
              />
            </div>

            <div>
              <label htmlFor="salary.currency" className="block text-sm font-medium text-gray-700">
                Currency
              </label>
              <select
                id="salary.currency"
                name="salary.currency"
                value={formData.salary.currency}
                onChange={handleChange}
                className="form-select mt-1"
                aria-label="Salary Currency"
              >
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
                <option value="GBP">GBP</option>
              </select>
            </div>
          </div>
        </div>

        {/* Requirements */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-4" tabIndex="0">
            Requirements
          </h2>
          
          <div className="space-y-4">
            {formData.requirements.map((requirement, index) => (
              <div key={index} className="flex gap-2">
                <input
                  type="text"
                  value={requirement}
                  onChange={(e) => handleRequirementChange(index, e.target.value)}
                  className="form-input flex-1"
                  placeholder="Enter a requirement"
                  aria-label={`Requirement ${index + 1}`}
                />
                <button
                  type="button"
                  onClick={() => removeRequirement(index)}
                  className="btn-secondary"
                  aria-label={`Remove requirement ${index + 1}`}
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={addRequirement}
              className="btn-secondary"
              aria-label="Add another requirement"
            >
              Add Requirement
            </button>
          </div>
        </div>

        {/* Skills */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-4" tabIndex="0">
            Required Skills
          </h2>
          
          <div className="space-y-4">
            {formData.skills.map((skill, index) => (
              <div key={index} className="flex gap-2">
                <input
                  type="text"
                  value={skill}
                  onChange={(e) => handleSkillChange(index, e.target.value)}
                  className="form-input flex-1"
                  placeholder="Enter a skill"
                  aria-label={`Skill ${index + 1}`}
                />
                <button
                  type="button"
                  onClick={() => removeSkill(index)}
                  className="btn-secondary"
                  aria-label={`Remove skill ${index + 1}`}
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={addSkill}
              className="btn-secondary"
              aria-label="Add another skill"
            >
              Add Skill
            </button>
          </div>
        </div>

        {/* Accessibility Features */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-4" tabIndex="0">
            Accessibility Features
          </h2>
          
          <div className="space-y-4">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="accessibility.remoteWork"
                name="accessibility.remoteWork"
                checked={formData.accessibility.remoteWork}
                onChange={handleChange}
                className="form-checkbox h-4 w-4 text-primary-600"
              />
              <label htmlFor="accessibility.remoteWork" className="ml-2 text-sm text-gray-700">
                Remote Work Available
              </label>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="accessibility.flexibleHours"
                name="accessibility.flexibleHours"
                checked={formData.accessibility.flexibleHours}
                onChange={handleChange}
                className="form-checkbox h-4 w-4 text-primary-600"
              />
              <label htmlFor="accessibility.flexibleHours" className="ml-2 text-sm text-gray-700">
                Flexible Hours
              </label>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="accessibility.wheelchairAccessible"
                name="accessibility.wheelchairAccessible"
                checked={formData.accessibility.wheelchairAccessible}
                onChange={handleChange}
                className="form-checkbox h-4 w-4 text-primary-600"
              />
              <label htmlFor="accessibility.wheelchairAccessible" className="ml-2 text-sm text-gray-700">
                Wheelchair Accessible
              </label>
            </div>

            <div>
              <div className="flex items-center mb-2">
                <input
                  type="checkbox"
                  id="accessibility.assistiveTechnology.available"
                  name="accessibility.assistiveTechnology.available"
                  checked={formData.accessibility.assistiveTechnology.available}
                  onChange={handleChange}
                  className="form-checkbox h-4 w-4 text-primary-600"
                />
                <label htmlFor="accessibility.assistiveTechnology.available" className="ml-2 text-sm text-gray-700">
                  Assistive Technology Available
                </label>
              </div>
              {formData.accessibility.assistiveTechnology.available && (
                <textarea
                  id="accessibility.assistiveTechnology.description"
                  name="accessibility.assistiveTechnology.description"
                  value={formData.accessibility.assistiveTechnology.description}
                  onChange={handleChange}
                  className="form-textarea mt-2"
                  placeholder="Describe available assistive technology..."
                  rows="3"
                  aria-label="Assistive Technology Description"
                />
              )}
            </div>
          </div>
        </div>

        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => navigate('/dashboard')}
            className="btn-secondary"
            aria-label="Cancel job posting"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="btn-primary"
            aria-label="Create job posting"
            disabled={createJobMutation.isLoading}
          >
            {createJobMutation.isLoading ? 'Creating...' : 'Create Job'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateJob;
