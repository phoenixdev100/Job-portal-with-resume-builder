import React, { useState } from 'react';
import { useMutation } from 'react-query';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import { toast } from 'react-hot-toast';

const Profile = () => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    bio: user?.bio || '',
    skills: user?.skills || [],
    experience: user?.experience || [],
    education: user?.education || [],
    location: user?.location || '',
    phoneNumber: user?.phoneNumber || '',
    linkedin: user?.linkedin || '',
    github: user?.github || '',
    portfolio: user?.portfolio || '',
    preferredRole: user?.preferredRole || '',
    workType: user?.workType || '',
    salaryExpectation: user?.salaryExpectation || '',
    profilePicture: user?.profilePicture || null
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSkillChange = (selectedSkills) => {
    setFormData(prev => ({
      ...prev,
      skills: selectedSkills
    }));
  };

  const updateProfileMutation = useMutation(
    async (profileData) => {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': token
        }
      };
      const res = await axios.put('/api/users/profile', profileData, config);
      return res.data;
    },
    {
      onSuccess: () => {
        toast.success('Profile updated successfully!');
      },
      onError: (error) => {
        toast.error(error.response?.data?.msg || 'Error updating profile');
      }
    }
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    updateProfileMutation.mutate(formData);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow">
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-bold text-gray-900">Profile Settings</h1>
              <button
                type="button"
                onClick={handleSubmit}
                disabled={updateProfileMutation.isLoading}
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
              >
                {updateProfileMutation.isLoading ? 'Saving...' : 'Save Changes'}
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Profile Picture Section */}
              <div className="flex items-center space-x-6">
                <div className="h-24 w-24 rounded-full overflow-hidden bg-gray-100">
                  {formData.profilePicture ? (
                    <img
                      src={formData.profilePicture}
                      alt="Profile"
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="h-full w-full flex items-center justify-center">
                      <svg className="h-12 w-12 text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8c0 2.208-1.79 4-3.998 4-2.208 0-3.998-1.792-3.998-4s1.79-4 3.998-4c2.208 0 3.998 1.792 3.998 4z" />
                      </svg>
                    </div>
                  )}
                </div>
                <button
                  type="button"
                  className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                >
                  Change Photo
                </button>
              </div>

              {/* Personal Information */}
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                    First Name
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    id="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                  />
                </div>

                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                    Last Name
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    id="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                  />
                </div>

                <div>
                  <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phoneNumber"
                    id="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                  />
                </div>
              </div>

              {/* Bio */}
              <div>
                <label htmlFor="bio" className="block text-sm font-medium text-gray-700">
                  Professional Bio
                </label>
                <textarea
                  id="bio"
                  name="bio"
                  rows={4}
                  value={formData.bio}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                  placeholder="Tell us about yourself..."
                />
              </div>

              {/* Skills */}
              <div>
                <label htmlFor="skills" className="block text-sm font-medium text-gray-700">
                  Skills
                </label>
                <select
                  id="skills"
                  name="skills"
                  multiple
                  value={formData.skills}
                  onChange={(e) => handleSkillChange(Array.from(e.target.selectedOptions, option => option.value))}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                >
                  <option value="javascript">JavaScript</option>
                  <option value="python">Python</option>
                  <option value="react">React</option>
                  <option value="node">Node.js</option>
                  <option value="java">Java</option>
                  <option value="csharp">C#</option>
                </select>
              </div>

              {/* Social Links */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-900">Social Links</h3>
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <label htmlFor="linkedin" className="block text-sm font-medium text-gray-700">
                      LinkedIn Profile
                    </label>
                    <input
                      type="url"
                      name="linkedin"
                      id="linkedin"
                      value={formData.linkedin}
                      onChange={handleInputChange}
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                      placeholder="https://linkedin.com/in/username"
                    />
                  </div>

                  <div>
                    <label htmlFor="github" className="block text-sm font-medium text-gray-700">
                      GitHub Profile
                    </label>
                    <input
                      type="url"
                      name="github"
                      id="github"
                      value={formData.github}
                      onChange={handleInputChange}
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                      placeholder="https://github.com/username"
                    />
                  </div>

                  <div>
                    <label htmlFor="portfolio" className="block text-sm font-medium text-gray-700">
                      Portfolio Website
                    </label>
                    <input
                      type="url"
                      name="portfolio"
                      id="portfolio"
                      value={formData.portfolio}
                      onChange={handleInputChange}
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                      placeholder="https://yourportfolio.com"
                    />
                  </div>
                </div>
              </div>

              {/* Job Preferences */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-900">Job Preferences</h3>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="preferredRole" className="block text-sm font-medium text-gray-700">
                      Preferred Role
                    </label>
                    <input
                      type="text"
                      name="preferredRole"
                      id="preferredRole"
                      value={formData.preferredRole}
                      onChange={handleInputChange}
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                      placeholder="e.g. Software Engineer"
                    />
                  </div>

                  <div>
                    <label htmlFor="workType" className="block text-sm font-medium text-gray-700">
                      Work Type
                    </label>
                    <select
                      id="workType"
                      name="workType"
                      value={formData.workType}
                      onChange={handleInputChange}
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                    >
                      <option value="">Select work type</option>
                      <option value="full-time">Full-time</option>
                      <option value="part-time">Part-time</option>
                      <option value="contract">Contract</option>
                      <option value="freelance">Freelance</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                      Preferred Location
                    </label>
                    <input
                      type="text"
                      name="location"
                      id="location"
                      value={formData.location}
                      onChange={handleInputChange}
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                      placeholder="e.g. New York, NY"
                    />
                  </div>

                  <div>
                    <label htmlFor="salaryExpectation" className="block text-sm font-medium text-gray-700">
                      Expected Salary
                    </label>
                    <input
                      type="text"
                      name="salaryExpectation"
                      id="salaryExpectation"
                      value={formData.salaryExpectation}
                      onChange={handleInputChange}
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                      placeholder="e.g. $80,000 - $100,000"
                    />
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
