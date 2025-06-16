import React from 'react';

const ResourceModal = ({ resource, onClose }) => {
  if (!resource) return null;

  const getContent = (title) => {
    switch (title) {
      case 'Resume Writing Guide':
        return {
          sections: [
            {
              title: 'Resume Essentials',
              content: [
                'Contact Information: Include your name, phone, email, and location',
                'Professional Summary: Write a compelling 2-3 sentence overview',
                'Work Experience: Use action verbs and quantify achievements',
                'Education: List relevant degrees and certifications',
                'Skills: Include both technical and soft skills'
              ]
            },
            {
              title: 'Formatting Tips',
              content: [
                'Use consistent formatting throughout',
                'Choose a clean, professional font',
                'Keep it to 1-2 pages',
                'Use bullet points for better readability',
                'Include white space for visual appeal'
              ]
            },
            {
              title: 'Common Mistakes to Avoid',
              content: [
                'Typos and grammatical errors',
                'Including personal information',
                'Using an unprofessional email address',
                'Making it too long or dense',
                'Using generic descriptions'
              ]
            }
          ]
        };

      case 'Interview Preparation':
        return {
          sections: [
            {
              title: 'Before the Interview',
              content: [
                'Research the company thoroughly',
                'Review the job description and requirements',
                'Prepare relevant examples of your experience',
                'Practice common interview questions',
                'Plan your professional outfit'
              ]
            },
            {
              title: 'Common Questions',
              content: [
                'Tell me about yourself',
                'Why do you want to work here?',
                'What are your strengths and weaknesses?',
                'Where do you see yourself in 5 years?',
                'Describe a challenging situation and how you handled it'
              ]
            },
            {
              title: 'Questions to Ask',
              content: [
                'What does success look like in this role?',
                'How would you describe the company culture?',
                'What are the biggest challenges facing the team?',
                'What are the next steps in the process?',
                'What opportunities are there for growth and development?'
              ]
            }
          ]
        };

      case 'Web Development Roadmap':
        return {
          sections: [
            {
              title: 'Frontend Development',
              content: [
                'HTML5: Structure and semantics',
                'CSS3: Styling and responsive design',
                'JavaScript - DOM manipulation and events',
                'Frontend frameworks (React, Vue, Angular)',
                'Version control with Git'
              ]
            },
            {
              title: 'Backend Development',
              content: [
                'Server-side languages (Node.js, Python, Java)',
                'Databases (SQL, MongoDB)',
                'RESTful APIs and GraphQL',
                'Authentication and security',
                'Server deployment and hosting'
              ]
            },
            {
              title: 'Additional Skills',
              content: [
                'Testing and debugging',
                'Performance optimization',
                'Web accessibility',
                'DevOps basics',
                'Agile development practices'
              ]
            }
          ]
        };

      case 'Data Science Fundamentals':
        return {
          sections: [
            {
              title: 'Core Concepts',
              content: [
                'Statistics and probability',
                'Linear algebra and calculus',
                'Data cleaning and preprocessing',
                'Exploratory data analysis',
                'Machine learning basics'
              ]
            },
            {
              title: 'Tools and Technologies',
              content: [
                'Python programming',
                'Data manipulation with Pandas',
                'Data visualization with Matplotlib/Seaborn',
                'Jupyter notebooks',
                'SQL for data analysis'
              ]
            },
            {
              title: 'Machine Learning',
              content: [
                'Supervised vs unsupervised learning',
                'Classification and regression',
                'Model evaluation metrics',
                'Feature engineering',
                'Deep learning introduction'
              ]
            }
          ]
        };

      default:
        return {
          sections: [
            {
              title: 'Content Coming Soon',
              content: [
                'This resource is currently being developed.',
                'Please check back later for updates.',
                'In the meantime, explore our other resources!'
              ]
            }
          ]
        };
    }
  };

  const content = getContent(resource.title);

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-2/3 shadow-lg rounded-lg bg-white">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center">
            <span className="text-3xl mr-3">{resource.icon}</span>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{resource.title}</h2>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                {resource.type}
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors duration-200"
          >
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="mt-6 space-y-8 max-h-[60vh] overflow-y-auto">
          {content.sections.map((section, index) => (
            <div key={index} className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">{section.title}</h3>
              <ul className="space-y-3">
                {section.content.map((item, itemIndex) => (
                  <li key={itemIndex} className="flex items-start">
                    <svg className="h-5 w-5 text-indigo-500 mt-1 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                    </svg>
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-8 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResourceModal;
