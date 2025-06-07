import React from 'react';

const Jobs = () => {
  const jobs = [
    {
      id: 1,
      title: 'Senior Software Engineer',
      company: 'TechCorp',
      location: 'San Francisco, CA',
      type: 'Full-time',
      salary: '$120,000 - $180,000',
      description: 'Looking for an experienced software engineer to lead development of cloud-based applications.',
      requirements: ['5+ years experience', 'React', 'Node.js', 'AWS'],
      postedDate: '2 days ago'
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
      postedDate: '1 week ago'
    },
    {
      id: 3,
      title: 'Data Scientist',
      company: 'DataCo',
      location: 'New York, NY',
      type: 'Full-time',
      salary: '$100,000 - $160,000',
      description: 'Seeking a data scientist to analyze complex datasets and build predictive models.',
      requirements: ['Python', 'Machine Learning', 'SQL', 'Statistics'],
      postedDate: '3 days ago'
    },
    {
      id: 4,
      title: 'DevOps Engineer',
      company: 'CloudTech',
      location: 'Seattle, WA',
      type: 'Full-time',
      salary: '$110,000 - $170,000',
      description: 'Build and maintain our cloud infrastructure and deployment pipelines.',
      requirements: ['Kubernetes', 'Docker', 'CI/CD', 'AWS/Azure'],
      postedDate: '1 day ago'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Featured Jobs</h1>
      <div className="grid gap-6 md:grid-cols-2">
        {jobs.map((job) => (
          <div key={job.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h2 className="text-xl font-semibold text-gray-900 hover:text-indigo-600 transition-colors duration-200">
                  {job.title}
                </h2>
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
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-500">{job.postedDate}</span>
              <span className="font-medium text-gray-900">{job.salary}</span>
            </div>
            <button className="mt-4 w-full button-animation inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700">
              Apply Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Jobs;
