import React, { useState, useEffect } from 'react';
import LoadingSpinner from '../common/LoadingSpinner';

const Companies = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate quick data loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <LoadingSpinner />
      </div>
    );
  }

  const companies = [
    {
      id: 1,
      name: 'TechCorp',
      logo: '🏢',
      industry: 'Software Development',
      location: 'San Francisco, CA',
      size: '1000+ employees',
      description: 'Leading provider of cloud-based enterprise solutions.',
      benefits: ['Health Insurance', 'Remote Work', '401k', 'Unlimited PTO'],
      rating: 4.5,
      openPositions: 15
    },
    {
      id: 2,
      name: 'DesignHub',
      logo: '🎨',
      industry: 'Design Services',
      location: 'Remote',
      size: '50-200 employees',
      description: 'Award-winning digital design agency working with global brands.',
      benefits: ['Flexible Hours', 'Learning Budget', 'Home Office Setup', 'Health Insurance'],
      rating: 4.8,
      openPositions: 8
    },
    {
      id: 3,
      name: 'DataCo',
      logo: '📊',
      industry: 'Data Analytics',
      location: 'New York, NY',
      size: '500+ employees',
      description: 'Pioneering data analytics solutions for Fortune 500 companies.',
      benefits: ['Stock Options', 'Health Insurance', 'Gym Membership', 'Learning Budget'],
      rating: 4.3,
      openPositions: 12
    },
    {
      id: 4,
      name: 'CloudTech',
      logo: '☁️',
      industry: 'Cloud Infrastructure',
      location: 'Seattle, WA',
      size: '200-500 employees',
      description: 'Innovative cloud solutions for modern businesses.',
      benefits: ['Competitive Salary', 'Remote Work', 'Health Insurance', 'Stock Options'],
      rating: 4.6,
      openPositions: 20
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Featured Companies</h1>
      <div className="grid gap-6 md:grid-cols-2">
        {companies.map((company) => (
          <div key={company.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
            <div className="flex items-center mb-4">
              <span className="text-4xl mr-3">{company.logo}</span>
              <div>
                <h2 className="text-xl font-semibold text-gray-900 hover:text-indigo-600 transition-colors duration-200">
                  {company.name}
                </h2>
                <p className="text-indigo-600">{company.industry}</p>
              </div>
            </div>
            <div className="mb-4">
              <p className="text-gray-600 mb-2">{company.description}</p>
              <div className="flex items-center text-gray-500 text-sm">
                <svg className="h-4 w-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                {company.location} • {company.size}
              </div>
            </div>
            <div className="mb-4">
              <p className="text-gray-900 font-medium mb-2">Benefits & Perks:</p>
              <div className="flex flex-wrap gap-2">
                {company.benefits.map((benefit, index) => (
                  <span key={index} className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800">
                    {benefit}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <div className="flex items-center">
                  {[...Array(5)].map((_, index) => (
                    <svg
                      key={index}
                      className={`h-5 w-5 ${
                        index < Math.floor(company.rating)
                          ? 'text-yellow-400'
                          : index === Math.floor(company.rating) && company.rating % 1 !== 0
                          ? 'text-yellow-200'
                          : 'text-gray-300'
                      }`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="ml-2 text-sm text-gray-600">{company.rating}/5.0</span>
              </div>
              <span className="text-indigo-600 font-medium">{company.openPositions} open positions</span>
            </div>
            <button className="mt-4 w-full button-animation inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700">
              View Company
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Companies;
