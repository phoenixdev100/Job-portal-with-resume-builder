import React, { useState, useEffect } from 'react';
import LoadingSpinner from '../common/LoadingSpinner';
import ResourceModal from '../resources/ResourceModal';

const Resources = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedResource, setSelectedResource] = useState(null);

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

  const resources = [
    {
      id: 1,
      category: 'Career Development',
      items: [
        {
          title: 'Resume Writing Guide',
          description: 'Learn how to create a professional resume that stands out.',
          icon: '📝',
          type: 'Guide',
          readTime: '15 min read'
        },
        {
          title: 'Interview Preparation',
          description: 'Essential tips and common questions for job interviews.',
          icon: '🎯',
          type: 'Tutorial',
          readTime: '20 min read'
        }
      ]
    },
    {
      id: 2,
      category: 'Skill Development',
      items: [
        {
          title: 'Web Development Roadmap',
          description: 'A comprehensive guide to becoming a web developer.',
          icon: '💻',
          type: 'Course',
          readTime: '30 min read'
        },
        {
          title: 'Data Science Fundamentals',
          description: 'Introduction to key concepts in data science.',
          icon: '📊',
          type: 'Course',
          readTime: '25 min read'
        }
      ]
    },
    {
      id: 3,
      category: 'Industry Insights',
      items: [
        {
          title: 'Tech Industry Trends 2025',
          description: 'Latest trends and future predictions in technology.',
          icon: '📈',
          type: 'Report',
          readTime: '10 min read'
        },
        {
          title: 'Salary Negotiation Tips',
          description: 'How to negotiate your salary and benefits package.',
          icon: '💰',
          type: 'Guide',
          readTime: '12 min read'
        }
      ]
    },
    {
      id: 4,
      category: 'Job Search Tips',
      items: [
        {
          title: 'Remote Work Success Guide',
          description: 'Tips for finding and excelling in remote positions.',
          icon: '🏠',
          type: 'Guide',
          readTime: '18 min read'
        },
        {
          title: 'Networking Strategies',
          description: 'Build and leverage your professional network.',
          icon: '🤝',
          type: 'Tutorial',
          readTime: '15 min read'
        }
      ]
    }
  ];

  const handleReadMore = (resource) => {
    setSelectedResource(resource);
  };

  const handleCloseModal = () => {
    setSelectedResource(null);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Career Resources</h1>
      <div className="space-y-8">
        {resources.map((category) => (
          <div key={category.id} className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold text-indigo-600 mb-6">{category.category}</h2>
            <div className="grid gap-6 md:grid-cols-2">
              {category.items.map((item, index) => (
                <div
                  key={index}
                  className="relative group bg-white p-6 rounded-lg border border-gray-200 hover:border-indigo-500 transition-colors duration-300"
                >
                  <div className="flex items-center mb-4">
                    <span className="text-3xl mr-3">{item.icon}</span>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors duration-200">
                        {item.title}
                      </h3>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                        {item.type}
                      </span>
                    </div>
                  </div>
                  <p className="text-gray-600 mb-4">{item.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">
                      <svg className="inline-block h-4 w-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                      </svg>
                      {item.readTime}
                    </span>
                    <button 
                      onClick={() => handleReadMore(item)}
                      className="button-animation inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-indigo-600 hover:text-white hover:bg-indigo-600 transition-colors duration-200"
                    >
                      Read More
                      <svg className="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {selectedResource && (
        <ResourceModal
          resource={selectedResource}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export default Resources;
