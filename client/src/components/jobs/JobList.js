import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import LoadingSpinner from '../common/LoadingSpinner';

const JobList = () => {
  const [location, setLocation] = useState('');
  const [jobType, setJobType] = useState('All Types');
  const [accessibilityFeature, setAccessibilityFeature] = useState('All Features');
  const [remoteOnly, setRemoteOnly] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const jobsData = [
    {
      id: 1,
      title: 'Senior Software Engineer',
      company: 'TechCorp',
      location: 'San Francisco, CA',
      type: 'Full-time',
      salary: '$120,000 - $180,000',
      description: 'Looking for an experienced software engineer to lead development of cloud-based applications.',
      requirements: ['5+ years experience', 'React', 'Node.js', 'AWS'],
      responsibilities: [
        'Lead development of cloud-based applications',
        'Mentor junior developers',
        'Design and implement scalable solutions',
        'Collaborate with product and design teams'
      ],
      benefits: [
        'Health, dental, and vision insurance',
        'Flexible work hours',
        'Remote work options',
        '401(k) matching',
        'Unlimited PTO'
      ],
      accessibility: ['Screen Reader Compatible', 'Flexible Hours'],
      postedDate: '2 days ago',
      applicationDeadline: '2025-02-27'
    },
    {
      id: 2,
      title: 'Product Designer',
      company: 'DesignHub',
      location: 'Remote',
      type: 'Full-time',
      salary: '$90,000 - $140,000',
      description: 'Join our team as a Product Designer to create beautiful and intuitive user experiences.',
      requirements: ['3+ years experience', 'Figma', 'UI/UX', 'Design Systems'],
      responsibilities: [
        'Design and develop user interfaces',
        'Collaborate with product and engineering teams',
        'Create prototypes and test designs',
        'Develop and maintain design systems'
      ],
      benefits: [
        'Health, dental, and vision insurance',
        'Flexible work hours',
        'Remote work options',
        '401(k) matching',
        'Unlimited PTO'
      ],
      accessibility: ['Flexible Hours', 'Remote Work'],
      postedDate: '1 week ago',
      applicationDeadline: '2025-03-01'
    },
    {
      id: 3,
      title: 'Data Scientist',
      company: 'DataCo',
      location: 'New York, NY',
      type: 'Contract',
      salary: '$100,000 - $160,000',
      description: 'Seeking a data scientist to analyze complex datasets and build predictive models.',
      requirements: ['Python', 'Machine Learning', 'SQL', 'Statistics'],
      responsibilities: [
        'Analyze complex datasets',
        'Build predictive models',
        'Collaborate with product and engineering teams',
        'Develop and maintain data pipelines'
      ],
      benefits: [
        'Health, dental, and vision insurance',
        'Flexible work hours',
        'Remote work options',
        '401(k) matching',
        'Unlimited PTO'
      ],
      accessibility: ['Flexible Schedule', 'Assistive Technology'],
      postedDate: '3 days ago',
      applicationDeadline: '2025-02-28'
    },
    {
      id: 4,
      title: 'Frontend Developer',
      company: 'WebTech Solutions',
      location: 'Remote',
      type: 'Part-time',
      salary: '$60,000 - $80,000',
      description: 'Looking for a frontend developer to build responsive web applications.',
      requirements: ['React', 'TypeScript', 'CSS', 'Responsive Design'],
      responsibilities: [
        'Build responsive web applications',
        'Collaborate with product and design teams',
        'Develop and maintain frontend codebase',
        'Optimize application performance'
      ],
      benefits: [
        'Health, dental, and vision insurance',
        'Flexible work hours',
        'Remote work options',
        '401(k) matching',
        'Unlimited PTO'
      ],
      accessibility: ['Remote Work', 'Flexible Hours'],
      postedDate: '1 day ago',
      applicationDeadline: '2025-03-02'
    },
    {
      id: 5,
      title: 'DevOps Engineer',
      company: 'CloudTech',
      location: 'Seattle, WA',
      type: 'Full-time',
      salary: '$110,000 - $170,000',
      description: 'Build and maintain our cloud infrastructure and deployment pipelines.',
      requirements: ['Kubernetes', 'Docker', 'CI/CD', 'AWS/Azure'],
      responsibilities: [
        'Build and maintain cloud infrastructure',
        'Develop and maintain deployment pipelines',
        'Collaborate with product and engineering teams',
        'Optimize application performance'
      ],
      benefits: [
        'Health, dental, and vision insurance',
        'Flexible work hours',
        'Remote work options',
        '401(k) matching',
        'Unlimited PTO'
      ],
      accessibility: ['Screen Reader Compatible', 'Flexible Schedule'],
      postedDate: '1 day ago',
      applicationDeadline: '2025-03-03'
    }
  ];

  useEffect(() => {
    const initializeJobs = () => {
      setIsLoading(true);
      try {
        // Store jobs data in localStorage for persistence
        if (!localStorage.getItem('jobListings')) {
          localStorage.setItem('jobListings', JSON.stringify(jobsData));
        }
      } catch (error) {
        console.error('Error initializing jobs:', error);
      } finally {
        setIsLoading(false);
      }
    };

    initializeJobs();
  }, []);

  const jobTypes = ['All Types', 'Full-time', 'Part-time', 'Contract', 'Internship'];
  const accessibilityFeatures = [
    'All Features',
    'Screen Reader Compatible',
    'Flexible Hours',
    'Remote Work',
    'Assistive Technology',
    'Flexible Schedule'
  ];

  const filteredJobs = jobsData.filter(job => {
    const matchesLocation = !location || 
      job.location.toLowerCase().includes(location.toLowerCase());
    const matchesType = jobType === 'All Types' || 
      job.type === jobType;
    const matchesAccessibility = accessibilityFeature === 'All Features' || 
      job.accessibility.includes(accessibilityFeature);
    const matchesRemote = !remoteOnly || 
      job.location.toLowerCase().includes('remote');

    return matchesLocation && matchesType && matchesAccessibility && matchesRemote;
  });

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Available Jobs</h1>
      
      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Filters</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
            <input
              type="text"
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              placeholder="Enter city or remote"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Job Type</label>
            <select
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              value={jobType}
              onChange={(e) => setJobType(e.target.value)}
            >
              {jobTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Accessibility Features</label>
            <select
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              value={accessibilityFeature}
              onChange={(e) => setAccessibilityFeature(e.target.value)}
            >
              {accessibilityFeatures.map(feature => (
                <option key={feature} value={feature}>{feature}</option>
              ))}
            </select>
          </div>
          <div className="flex items-end">
            <label className="flex items-center">
              <input
                type="checkbox"
                className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                checked={remoteOnly}
                onChange={(e) => setRemoteOnly(e.target.checked)}
              />
              <span className="ml-2 text-sm text-gray-600">Remote Work Only</span>
            </label>
          </div>
        </div>
      </div>

      {/* Job Listings */}
      {filteredJobs.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500">No jobs found matching your criteria.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {filteredJobs.map((job) => (
            <div key={job.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <Link to={`/jobs/${job.id}`} className="text-xl font-semibold text-gray-900 hover:text-indigo-600 transition-colors duration-200">
                    {job.title}
                  </Link>
                  <p className="text-indigo-600 font-medium">{job.company}</p>
                </div>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                  {job.type}
                </span>
              </div>
              <div className="mb-4">
                <p className="text-gray-600 mb-2">{job.description}</p>
                <div className="flex items-center text-gray-500 text-sm">
                  <svg className="h-4 w-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                  {job.location}
                </div>
              </div>
              <div className="mb-4">
                <p className="text-gray-900 font-medium mb-2">Requirements:</p>
                <div className="flex flex-wrap gap-2">
                  {job.requirements.map((req, index) => (
                    <span key={index} className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800">
                      {req}
                    </span>
                  ))}
                </div>
              </div>
              <div className="mb-4">
                <p className="text-gray-900 font-medium mb-2">Accessibility Features:</p>
                <div className="flex flex-wrap gap-2">
                  {job.accessibility.map((feature, index) => (
                    <span key={index} className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800">
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-500">{job.postedDate}</span>
                <span className="font-medium text-gray-900">{job.salary}</span>
              </div>
              <Link
                to={`/jobs/${job.id}`}
                className="mt-4 w-full button-animation inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
              >
                View Details
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default JobList;
