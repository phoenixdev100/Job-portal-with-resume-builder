import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import LoadingSpinner from '../common/LoadingSpinner';
import Notification from '../common/Notification';

const JobDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [job, setJob] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isApplying, setIsApplying] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    const loadJob = () => {
      setIsLoading(true);
      try {
        // Load job data
        const jobListings = JSON.parse(localStorage.getItem('jobListings') || '[]');
        let foundJob = jobListings.find(j => j.id === parseInt(id));
        
        // If not found in localStorage, use default job data
        if (!foundJob) {
          foundJob = {
            id: parseInt(id),
            title: 'Software Engineer',
            company: 'Tech Company',
            location: 'Remote',
            type: 'Full-time',
            salary: '$80,000 - $120,000',
            description: 'Join our team as a Software Engineer',
            requirements: ['3+ years experience', 'JavaScript', 'React'],
            responsibilities: [
              'Develop web applications',
              'Collaborate with team members',
              'Write clean, maintainable code'
            ],
            benefits: [
              'Health insurance',
              'Remote work',
              'Flexible hours'
            ],
            accessibility: ['Remote Work', 'Flexible Hours'],
            postedDate: new Date().toISOString(),
            applicationDeadline: '2025-02-27'
          };
          // Add job to localStorage
          jobListings.push(foundJob);
          localStorage.setItem('jobListings', JSON.stringify(jobListings));
        }

        // Check if job is saved
        const savedJobs = JSON.parse(localStorage.getItem('savedJobs') || '[]');
        setIsSaved(savedJobs.some(j => j.id === foundJob.id));

        setJob(foundJob);
      } catch (error) {
        console.error('Error loading job:', error);
        setNotification({
          type: 'error',
          message: 'Error loading job details. Please try again.'
        });
      } finally {
        setIsLoading(false);
      }
    };

    loadJob();
  }, [id]);

  const handleApply = () => {
    if (!user) {
      navigate('/login');
      return;
    }

    setIsApplying(true);
    try {
      const appliedJobs = JSON.parse(localStorage.getItem('appliedJobs') || '[]');
      
      if (appliedJobs.some(j => j.id === job.id)) {
        setNotification({
          type: 'info',
          message: 'You have already applied to this job'
        });
        return;
      }

      const newApplication = {
        id: job.id,
        title: job.title,
        company: job.company,
        status: 'Applied',
        appliedDate: new Date().toISOString()
      };

      appliedJobs.push(newApplication);
      localStorage.setItem('appliedJobs', JSON.stringify(appliedJobs));

      navigate('/dashboard', {
        state: {
          message: `Successfully applied to ${job.title}`,
          type: 'success'
        }
      });
    } catch (error) {
      console.error('Error applying to job:', error);
      setNotification({
        type: 'error',
        message: 'Error applying to job. Please try again.'
      });
    } finally {
      setIsApplying(false);
    }
  };

  const handleSaveJob = () => {
    try {
      const savedJobs = JSON.parse(localStorage.getItem('savedJobs') || '[]');
      
      if (isSaved) {
        // Remove from saved jobs
        const updatedSavedJobs = savedJobs.filter(j => j.id !== job.id);
        localStorage.setItem('savedJobs', JSON.stringify(updatedSavedJobs));
        setIsSaved(false);
        setNotification({
          type: 'success',
          message: 'Job removed from saved jobs'
        });
      } else {
        // Add to saved jobs
        if (savedJobs.some(j => j.id === job.id)) {
          setNotification({
            type: 'info',
            message: 'Job is already saved'
          });
          return;
        }

        const savedJob = {
          id: job.id,
          title: job.title,
          company: job.company,
          savedDate: new Date().toISOString()
        };

        savedJobs.push(savedJob);
        localStorage.setItem('savedJobs', JSON.stringify(savedJobs));
        setIsSaved(true);
        setNotification({
          type: 'success',
          message: 'Job saved successfully'
        });
      }
    } catch (error) {
      console.error('Error saving job:', error);
      setNotification({
        type: 'error',
        message: 'Error saving job. Please try again.'
      });
    }
  };

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <LoadingSpinner />
      </div>
    );
  }

  if (!job) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">Job not found</h2>
          <p className="mt-2 text-gray-600">The job you're looking for doesn't exist or has been removed.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {notification && (
        <Notification
          type={notification.type}
          message={notification.message}
          onClose={() => setNotification(null)}
        />
      )}

      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="p-8">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{job.title}</h1>
              <p className="text-xl text-gray-600 mb-4">{job.company}</p>
            </div>
            <div className="flex space-x-4">
              <button
                onClick={handleSaveJob}
                className={`px-4 py-2 rounded-md text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
                  isSaved
                    ? 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                    : 'bg-white text-indigo-600 border border-indigo-600 hover:bg-indigo-50'
                }`}
              >
                {isSaved ? 'Saved' : 'Save Job'}
              </button>
              <button
                onClick={handleApply}
                disabled={isApplying}
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isApplying ? 'Applying...' : 'Apply Now'}
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mt-6 text-sm text-gray-500">
            <div>
              <span className="font-medium text-gray-900">Location:</span> {job.location}
            </div>
            <div>
              <span className="font-medium text-gray-900">Job Type:</span> {job.type}
            </div>
            <div>
              <span className="font-medium text-gray-900">Salary:</span> {job.salary}
            </div>
            <div>
              <span className="font-medium text-gray-900">Posted:</span>{' '}
              {new Date(job.postedDate).toLocaleDateString()}
            </div>
          </div>

          <div className="mt-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Description</h2>
            <p className="text-gray-600 whitespace-pre-line">{job.description}</p>
          </div>

          <div className="mt-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Requirements</h2>
            <ul className="list-disc list-inside text-gray-600 space-y-2">
              {job.requirements.map((req, index) => (
                <li key={index}>{req}</li>
              ))}
            </ul>
          </div>

          <div className="mt-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Responsibilities</h2>
            <ul className="list-disc list-inside text-gray-600 space-y-2">
              {job.responsibilities.map((resp, index) => (
                <li key={index}>{resp}</li>
              ))}
            </ul>
          </div>

          <div className="mt-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Benefits</h2>
            <ul className="list-disc list-inside text-gray-600 space-y-2">
              {job.benefits.map((benefit, index) => (
                <li key={index}>{benefit}</li>
              ))}
            </ul>
          </div>

          <div className="mt-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Accessibility</h2>
            <div className="flex flex-wrap gap-2">
              {job.accessibility.map((feature, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800"
                >
                  {feature}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-gray-50 px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-500">
              Application Deadline:{' '}
              <span className="font-medium text-gray-900">
                {new Date(job.applicationDeadline).toLocaleDateString()}
              </span>
            </div>
            <button
              onClick={handleApply}
              disabled={isApplying}
              className="px-6 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isApplying ? 'Applying...' : 'Apply Now'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetail;
