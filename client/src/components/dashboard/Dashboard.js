import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Dashboard = () => {
  const { user } = useAuth();
  const [count] = useState({ jobs: 500, companies: 50, placements: 92 });
  const [recentJobs] = useState([
    {
      id: 1,
      title: "Software Engineer",
      company: "Tech Corp",
      location: "Remote",
      salary: "$80,000 - $120,000",
      postedDate: "2024-02-01"
    },
    {
      id: 2,
      title: "UX Designer",
      company: "Design Studio",
      location: "New York, NY",
      salary: "$70,000 - $90,000",
      postedDate: "2024-02-03"
    },
    {
      id: 3,
      title: "Product Manager",
      company: "Innovation Inc",
      location: "San Francisco, CA",
      salary: "$100,000 - $150,000",
      postedDate: "2024-02-05"
    }
  ]);

  const [savedJobs] = useState([
    {
      id: 4,
      title: "Frontend Developer",
      company: "Web Solutions",
      location: "Remote",
      salary: "$75,000 - $95,000",
      savedDate: "2024-02-02"
    },
    {
      id: 5,
      title: "Accessibility Specialist",
      company: "Inclusive Tech",
      location: "Chicago, IL",
      salary: "$85,000 - $110,000",
      savedDate: "2024-02-04"
    }
  ]);

  const [applicationStats] = useState({
    total: 15,
    pending: 8,
    accepted: 4,
    rejected: 3
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Welcome back, {user.firstName}! 👋
              </h1>
              <p className="mt-2 text-gray-600">
                Here's what's happening with your job search
              </p>
            </div>
            <Link
              to="/profile"
              className="inline-flex items-center px-4 py-2 text-sm font-medium rounded-lg text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              View Profile
            </Link>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Total Applications</h3>
              <span className="text-purple-600">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </span>
            </div>
            <p className="mt-2 text-3xl font-bold text-gray-900">{applicationStats.total}</p>
            <p className="text-sm text-gray-500">Applications submitted</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Pending</h3>
              <span className="text-yellow-500">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </span>
            </div>
            <p className="mt-2 text-3xl font-bold text-gray-900">{applicationStats.pending}</p>
            <p className="text-sm text-gray-500">Awaiting response</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Accepted</h3>
              <span className="text-green-500">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </span>
            </div>
            <p className="mt-2 text-3xl font-bold text-gray-900">{applicationStats.accepted}</p>
            <p className="text-sm text-gray-500">Applications accepted</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Profile Views</h3>
              <span className="text-blue-500">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </span>
            </div>
            <p className="mt-2 text-3xl font-bold text-gray-900">124</p>
            <p className="text-sm text-gray-500">Last 30 days</p>
          </div>
        </div>

        {/* Recent Jobs and Saved Jobs */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Jobs */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="text-4xl font-bold text-purple-600">{stats.placements}%</div>
              <Link to="/jobs" className="text-purple-600 hover:text-purple-700 text-sm font-medium">
                View all
              </Link>
            </div>
            <div className="space-y-4">
              {recentJobs.map(job => (
                <div key={job.id} className="p-4 border border-gray-100 rounded-lg hover:border-purple-100 transition-colors">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-gray-900">{job.title}</h3>
                      <p className="text-sm text-gray-600">{job.company}</p>
                      <div className="mt-2 flex items-center space-x-4 text-sm text-gray-500">
                        <span>{job.location}</span>
                        <span>{job.salary}</span>
                      </div>
                    </div>
                    <button className="text-purple-600 hover:text-purple-700">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Saved Jobs */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">Saved Jobs</h2>
              <Link to="/saved-jobs" className="text-purple-600 hover:text-purple-700 text-sm font-medium">
                View all
              </Link>
            </div>
            <div className="space-y-4">
              {savedJobs.map(job => (
                <div key={job.id} className="p-4 border border-gray-100 rounded-lg hover:border-purple-100 transition-colors">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-gray-900">{job.title}</h3>
                      <p className="text-sm text-gray-600">{job.company}</p>
                      <div className="mt-2 flex items-center space-x-4 text-sm text-gray-500">
                        <span>{job.location}</span>
                        <span>{job.salary}</span>
                      </div>
                    </div>
                    <button className="text-red-500 hover:text-red-600">
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link
              to="/profile"
              className="flex items-center p-4 border border-gray-200 rounded-lg hover:border-purple-200 transition-colors"
            >
              <span className="p-2 bg-purple-100 rounded-lg mr-4">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </span>
              <div>
                <h3 className="font-semibold text-gray-900">Update Profile</h3>
                <p className="text-sm text-gray-500">Keep your profile up to date</p>
              </div>
            </Link>

            <Link
              to="/jobs/search"
              className="flex items-center p-4 border border-gray-200 rounded-lg hover:border-purple-200 transition-colors"
            >
              <span className="p-2 bg-purple-100 rounded-lg mr-4">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </span>
              <div>
                <h3 className="font-semibold text-gray-900">Search Jobs</h3>
                <p className="text-sm text-gray-500">Find your next opportunity</p>
              </div>
            </Link>

            <Link
              to="/applications"
              className="flex items-center p-4 border border-gray-200 rounded-lg hover:border-purple-200 transition-colors"
            >
              <span className="p-2 bg-purple-100 rounded-lg mr-4">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </span>
              <div>
                <h3 className="font-semibold text-gray-900">Track Applications</h3>
                <p className="text-sm text-gray-500">Monitor your progress</p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
