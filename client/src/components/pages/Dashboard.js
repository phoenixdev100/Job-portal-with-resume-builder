import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useLocation, Link } from 'react-router-dom';
import LoadingSpinner from '../common/LoadingSpinner';
import Notification from '../common/Notification';

const ProgressBar = ({ value, maxValue, color }) => {
  const percentage = (value / maxValue) * 100;
  return (
    <div className="w-full bg-gray-200 rounded-full h-2.5">
      <div
        className={`h-2.5 rounded-full ${color}`}
        style={{ width: `${percentage}%` }}
      ></div>
    </div>
  );
};

const StatCard = ({ title, value, icon }) => (
  <div className="bg-white rounded-lg shadow p-6">
    <div className="flex items-center">
      <div className="p-3 rounded-full bg-indigo-100 text-indigo-600">
        {icon}
      </div>
      <div className="ml-4">
        <p className="text-sm font-medium text-gray-500">{title}</p>
        <p className="text-2xl font-semibold text-gray-900">{value}</p>
      </div>
    </div>
  </div>
);

const ApplicationCard = ({ job, onStatusUpdate }) => {
  const statusColors = {
    Applied: 'bg-blue-600',
    'In Review': 'bg-yellow-500',
    Interview: 'bg-purple-600',
    Offered: 'bg-green-600',
    Rejected: 'bg-red-600'
  };

  const statusOptions = ['Applied', 'In Review', 'Interview', 'Offered', 'Rejected'];

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 transition-all hover:shadow-md">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-medium text-gray-900">{job.title}</h3>
          <p className="text-sm text-gray-500">{job.company}</p>
        </div>
        <select
          value={job.status}
          onChange={(e) => onStatusUpdate(job.id, e.target.value)}
          className="rounded-md border-gray-300 text-sm focus:ring-indigo-500 focus:border-indigo-500"
        >
          {statusOptions.map(status => (
            <option key={status} value={status}>{status}</option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <div className="flex justify-between text-sm mb-1">
          <span className="text-gray-500">Application Progress</span>
          <span className="font-medium text-gray-900">
            {statusOptions.indexOf(job.status) + 1} of {statusOptions.length} steps
          </span>
        </div>
        <ProgressBar
          value={statusOptions.indexOf(job.status) + 1}
          maxValue={statusOptions.length}
          color={statusColors[job.status]}
        />
      </div>
      <div className="flex justify-between items-center text-sm">
        <span className="text-gray-500">
          Applied on {new Date(job.appliedDate).toLocaleDateString()}
        </span>
        <Link
          to={`/jobs/${job.id}`}
          className="text-indigo-600 hover:text-indigo-900 font-medium"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

const SavedJobCard = ({ job }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 transition-all hover:shadow-md">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-medium text-gray-900">{job.title}</h3>
          <p className="text-sm text-gray-500">{job.company}</p>
        </div>
      </div>
      <div className="flex justify-between items-center text-sm">
        <span className="text-gray-500">
          Saved on {new Date(job.savedDate).toLocaleDateString()}
        </span>
        <Link
          to={`/jobs/${job.id}`}
          className="text-indigo-600 hover:text-indigo-900 font-medium"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

const Dashboard = () => {
  const { user } = useAuth();
  const location = useLocation();
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [savedJobs, setSavedJobs] = useState([]);
  const [activeTab, setActiveTab] = useState('applications');
  const [isLoading, setIsLoading] = useState(true);
  const [notification, setNotification] = useState(null);
  const [stats, setStats] = useState({
    totalApplications: 0,
    interviews: 0,
    offers: 0,
    rejections: 0
  });

  // Initialize default data if none exists
  useEffect(() => {
    if (!localStorage.getItem('appliedJobs')) {
      localStorage.setItem('appliedJobs', JSON.stringify([]));
    }
    if (!localStorage.getItem('savedJobs')) {
      localStorage.setItem('savedJobs', JSON.stringify([]));
    }
    if (!localStorage.getItem('jobListings')) {
      localStorage.setItem('jobListings', JSON.stringify([]));
    }
  }, []);

  useEffect(() => {
    const loadAppliedJobs = () => {
      setIsLoading(true);
      try {
        // Add a small delay to ensure localStorage is ready
        setTimeout(() => {
          const jobs = JSON.parse(localStorage.getItem('appliedJobs') || '[]');
          const saved = JSON.parse(localStorage.getItem('savedJobs') || '[]');
          
          // Ensure each job has required properties
          const validJobs = jobs.map(job => ({
            id: job.id || Math.random(),
            title: job.title || 'Unknown Position',
            company: job.company || 'Unknown Company',
            status: job.status || 'Applied',
            appliedDate: job.appliedDate || new Date().toISOString()
          }));

          const validSavedJobs = saved.map(job => ({
            id: job.id || Math.random(),
            title: job.title || 'Unknown Position',
            company: job.company || 'Unknown Company',
            savedDate: job.savedDate || new Date().toISOString()
          }));

          setAppliedJobs(validJobs);
          setSavedJobs(validSavedJobs);

          // Calculate stats
          const newStats = validJobs.reduce((acc, job) => {
            acc.totalApplications++;
            if (job.status === 'Interview') acc.interviews++;
            if (job.status === 'Offered') acc.offers++;
            if (job.status === 'Rejected') acc.rejections++;
            return acc;
          }, {
            totalApplications: 0,
            interviews: 0,
            offers: 0,
            rejections: 0
          });
          setStats(newStats);

          if (location.state?.message) {
            setNotification({
              type: location.state.type || 'success',
              message: location.state.message
            });
          }
          setIsLoading(false);
        }, 500); // Small delay to ensure smooth loading
      } catch (error) {
        console.error('Error loading applied jobs:', error);
        setNotification({
          type: 'error',
          message: 'Error loading your applications. Please refresh the page.'
        });
        // Set empty defaults on error
        setAppliedJobs([]);
        setSavedJobs([]);
        setStats({
          totalApplications: 0,
          interviews: 0,
          offers: 0,
          rejections: 0
        });
        setIsLoading(false);
      }
    };

    loadAppliedJobs();
  }, [location]);

  const handleStatusUpdate = (jobId, newStatus) => {
    try {
      const updatedJobs = appliedJobs.map(job =>
        job.id === jobId ? { ...job, status: newStatus } : job
      );
      setAppliedJobs(updatedJobs);
      localStorage.setItem('appliedJobs', JSON.stringify(updatedJobs));
      
      // Update stats after status change
      const newStats = updatedJobs.reduce((acc, job) => {
        acc.totalApplications++;
        if (job.status === 'Interview') acc.interviews++;
        if (job.status === 'Offered') acc.offers++;
        if (job.status === 'Rejected') acc.rejections++;
        return acc;
      }, {
        totalApplications: 0,
        interviews: 0,
        offers: 0,
        rejections: 0
      });
      setStats(newStats);

      setNotification({
        type: 'success',
        message: 'Application status updated successfully'
      });
    } catch (error) {
      console.error('Error updating status:', error);
      setNotification({
        type: 'error',
        message: 'Error updating application status. Please try again.'
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

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {notification && (
        <Notification
          type={notification.type}
          message={notification.message}
          onClose={() => setNotification(null)}
        />
      )}

      {/* Welcome Section */}
      <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Welcome back, {user?.name || 'User'}!
            </h1>
            <p className="text-gray-600">
              Track your job applications and manage your career journey.
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-500">Profile Completion</p>
            <div className="flex items-center mt-1">
              <div className="w-32 mr-2">
                <ProgressBar value={50} maxValue={100} color="bg-indigo-600" />
              </div>
              <span className="text-sm font-medium text-gray-900">50%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Total Applications"
          value={stats.totalApplications}
          icon={
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          }
        />
        <StatCard
          title="Interviews"
          value={stats.interviews}
          icon={
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          }
        />
        <StatCard
          title="Offers"
          value={stats.offers}
          icon={
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          }
        />
        <StatCard
          title="Response Rate"
          value={`${stats.totalApplications ? Math.round((stats.interviews + stats.offers) / stats.totalApplications * 100) : 0}%`}
          icon={
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
          }
        />
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 mb-8">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('applications')}
            className={`${
              activeTab === 'applications'
                ? 'border-indigo-500 text-indigo-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
          >
            Applications
          </button>
          <button
            onClick={() => setActiveTab('saved')}
            className={`${
              activeTab === 'saved'
                ? 'border-indigo-500 text-indigo-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
          >
            Saved Jobs
          </button>
        </nav>
      </div>

      {/* Content */}
      {activeTab === 'applications' && (
        <div className="space-y-6">
          {appliedJobs.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-lg shadow">
              <svg
                className="mx-auto h-12 w-12 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              <h3 className="mt-2 text-sm font-medium text-gray-900">No applications</h3>
              <p className="mt-1 text-sm text-gray-500">
                Get started by applying to your first job.
              </p>
              <div className="mt-6">
                <Link
                  to="/jobs"
                  className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Browse Jobs
                </Link>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6">
              {appliedJobs.map((job) => (
                <ApplicationCard
                  key={job.id}
                  job={job}
                  onStatusUpdate={handleStatusUpdate}
                />
              ))}
            </div>
          )}
        </div>
      )}

      {activeTab === 'saved' && (
        <div className="space-y-6">
          {savedJobs.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-lg shadow">
              <svg
                className="mx-auto h-12 w-12 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                />
              </svg>
              <h3 className="mt-2 text-sm font-medium text-gray-900">No saved jobs</h3>
              <p className="mt-1 text-sm text-gray-500">
                Save jobs you're interested in to apply later.
              </p>
              <div className="mt-6">
                <Link
                  to="/jobs"
                  className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Find Jobs
                </Link>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6">
              {savedJobs.map((job) => (
                <SavedJobCard
                  key={job.id}
                  job={job}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
