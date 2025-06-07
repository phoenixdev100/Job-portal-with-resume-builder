import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { motion } from 'framer-motion';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  RadialLinearScale
} from 'chart.js';
import { Bar, Line, Pie, Radar } from 'react-chartjs-2';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  RadialLinearScale
);

const Home = () => {
  const { user, loading } = useAuth();

  // Show loading spinner while checking authentication
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen" role="status">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  }

  const stats = [
    { label: 'Active Jobs', value: '2,000+', icon: '💼' },
    { label: 'Companies', value: '500+', icon: '🏢' },
    { label: 'Success Stories', value: '1,000+', icon: '🌟' },
    { label: 'Job Categories', value: '50+', icon: '📊' }
  ];

  const features = [
    {
      title: 'Accessibility First',
      description: 'Our platform is designed with accessibility in mind, ensuring a seamless experience for all users.',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      )
    },
    {
      title: 'Smart Job Matching',
      description: 'Our AI-powered system matches your skills and preferences with the perfect job opportunities.',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
        </svg>
      )
    },
    {
      title: 'Career Resources',
      description: 'Access comprehensive guides, tutorials, and resources to help you succeed in your career journey.',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      )
    }
  ];

  const testimonials = [
    {
      quote: "This platform changed my life. I found a job that not only accepts me but celebrates my unique abilities.",
      author: "Sarah J.",
      role: "Software Developer",
      company: "Tech Solutions Inc.",
      image: "https://randomuser.me/api/portraits/women/1.jpg"
    },
    {
      quote: "The inclusive approach and accessibility features made job hunting a breeze. I'm now working my dream job!",
      author: "Michael C.",
      role: "Marketing Specialist",
      company: "Digital Creatives",
      image: "https://randomuser.me/api/portraits/men/1.jpg"
    }
  ];

  const companies = [
    { name: 'Microsoft', logo: '🏢' },
    { name: 'Google', logo: '🌐' },
    { name: 'Apple', logo: '🍎' },
    { name: 'Amazon', logo: '📦' },
    { name: 'Meta', logo: '👥' },
    { name: 'Netflix', logo: '🎬' }
  ];

  const chartData = {
    topCompanies: {
      labels: ['Microsoft', 'Google', 'Amazon', 'Apple', 'Meta'],
      datasets: [{
        label: 'Number of Job Postings',
        data: [150, 120, 100, 80, 60],
        backgroundColor: [
          'rgba(147, 51, 234, 0.7)',
          'rgba(168, 85, 247, 0.7)',
          'rgba(192, 132, 252, 0.7)',
          'rgba(216, 180, 254, 0.7)',
          'rgba(233, 213, 255, 0.7)',
        ],
        borderColor: [
          'rgba(147, 51, 234, 1)',
          'rgba(168, 85, 247, 1)',
          'rgba(192, 132, 252, 1)',
          'rgba(216, 180, 254, 1)',
          'rgba(233, 213, 255, 1)',
        ],
        borderWidth: 1,
      }]
    },
    hiringTrends: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      datasets: [{
        label: 'Job Postings',
        data: [300, 450, 380, 520, 480, 600],
        borderColor: 'rgba(147, 51, 234, 1)',
        backgroundColor: 'rgba(147, 51, 234, 0.1)',
        tension: 0.4,
        fill: true,
      }]
    },
    industryDistribution: {
      labels: ['Technology', 'Healthcare', 'Finance', 'Education', 'Manufacturing'],
      datasets: [{
        data: [35, 25, 20, 15, 5],
        backgroundColor: [
          'rgba(147, 51, 234, 0.7)',
          'rgba(168, 85, 247, 0.7)',
          'rgba(192, 132, 252, 0.7)',
          'rgba(216, 180, 254, 0.7)',
          'rgba(233, 213, 255, 0.7)',
        ],
        borderWidth: 1,
      }]
    },
    topSkills: {
      labels: ['Programming', 'Communication', 'Problem Solving', 'Leadership', 'Adaptability'],
      datasets: [{
        label: 'Demand Score',
        data: [90, 85, 80, 75, 70],
        backgroundColor: 'rgba(147, 51, 234, 0.2)',
        borderColor: 'rgba(147, 51, 234, 1)',
        pointBackgroundColor: 'rgba(147, 51, 234, 1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(147, 51, 234, 1)',
      }]
    },
  };

  const companyWiseData = {
    microsoft: {
      labels: ['Software Dev', 'Data Science', 'Product', 'Design', 'Sales'],
      datasets: [{
        label: 'Open Positions',
        data: [45, 30, 25, 20, 30],
        backgroundColor: 'rgba(147, 51, 234, 0.7)',
        borderColor: 'rgba(147, 51, 234, 1)',
        borderWidth: 1,
      }]
    },
    google: {
      salaryTrends: {
        labels: ['Entry', 'Mid', 'Senior', 'Lead', 'Executive'],
        datasets: [{
          label: 'Average Salary (K$)',
          data: [85, 120, 160, 200, 250],
          backgroundColor: 'rgba(168, 85, 247, 0.7)',
          borderColor: 'rgba(168, 85, 247, 1)',
          borderWidth: 1,
        }]
      },
      hiringTrend: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [{
          label: 'Monthly Hires',
          data: [20, 25, 18, 30, 28, 35],
          borderColor: 'rgba(168, 85, 247, 1)',
          backgroundColor: 'rgba(168, 85, 247, 0.1)',
          tension: 0.4,
          fill: true,
        }]
      }
    },
    amazon: {
      departmentHiring: {
        labels: ['AWS', 'Retail', 'Logistics', 'AI/ML', 'HR'],
        datasets: [{
          data: [40, 25, 15, 12, 8],
          backgroundColor: [
            'rgba(147, 51, 234, 0.7)',
            'rgba(168, 85, 247, 0.7)',
            'rgba(192, 132, 252, 0.7)',
            'rgba(216, 180, 254, 0.7)',
            'rgba(233, 213, 255, 0.7)',
          ],
          borderWidth: 1,
        }]
      }
    },
    apple: {
      skillsRequired: {
        labels: ['iOS Dev', 'Hardware', 'ML/AI', 'Design', 'Product'],
        datasets: [{
          label: 'Demand Level',
          data: [95, 88, 85, 90, 82],
          backgroundColor: 'rgba(147, 51, 234, 0.2)',
          borderColor: 'rgba(147, 51, 234, 1)',
          pointBackgroundColor: 'rgba(147, 51, 234, 1)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgba(147, 51, 234, 1)',
        }]
      }
    }
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
      },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
      {/* Hero Section */}
      <motion.section 
        className="relative py-20 overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative z-10 text-center">
            <motion.h1 
              className="text-5xl md:text-6xl font-bold text-gray-900 mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              Empowering Careers,
              <span className="text-purple-600"> Embracing Abilities</span>
            </motion.h1>
            <motion.p 
              className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              Your journey to meaningful employment starts here. Connect with inclusive employers who value your unique talents and perspectives.
            </motion.p>
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              {user ? (
                <>
                  <Link
                    to="/dashboard"
                    className="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-purple-600 hover:bg-purple-700 transition-colors duration-300"
                  >
                    Go to Dashboard
                  </Link>
                  <Link
                    to="/jobs"
                    className="inline-flex items-center px-8 py-3 border border-purple-600 text-base font-medium rounded-lg text-purple-600 hover:bg-purple-50 transition-colors duration-300"
                  >
                    Browse Jobs
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    to="/register"
                    className="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-purple-600 hover:bg-purple-700 transition-colors duration-300"
                  >
                    Get Started
                  </Link>
                  <Link
                    to="/login"
                    className="inline-flex items-center px-8 py-3 border border-purple-600 text-base font-medium rounded-lg text-purple-600 hover:bg-purple-50 transition-colors duration-300"
                  >
                    Sign In
                  </Link>
                </>
              )}
            </motion.div>
          </div>
        </div>

        {/* Decorative background elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
        </div>
      </motion.section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div 
                key={stat.label}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="text-4xl mb-2">{stat.icon}</div>
                <div className="text-3xl font-bold text-purple-600 mb-2">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Us?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We're committed to creating an inclusive job marketplace that connects talented individuals with employers who value diversity and accessibility.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center text-purple-600 mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Success Stories</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Hear from individuals who found their perfect career match through our platform.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.author}
                className="bg-gray-50 p-6 rounded-xl"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="flex items-center mb-4">
                  <div className="flex-shrink-0">
                    <img
                      className="h-12 w-12 rounded-full"
                      src={testimonial.image}
                      alt={testimonial.author}
                    />
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-semibold text-gray-900">{testimonial.author}</h4>
                    <p className="text-sm text-gray-600">{testimonial.role} at {testimonial.company}</p>
                  </div>
                </div>
                <p className="text-gray-600 italic">"{testimonial.quote}"</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Companies Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Companies</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Join leading companies committed to inclusive hiring practices.
            </p>
          </motion.div>

          <div className="grid grid-cols-3 md:grid-cols-6 gap-8">
            {companies.map((company, index) => (
              <motion.div
                key={company.name}
                className="flex flex-col items-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="text-4xl mb-2">{company.logo}</div>
                <p className="text-sm font-medium text-gray-600">{company.name}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Hiring Trends Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Hiring Trends & Insights</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Stay informed with real-time hiring trends and market insights to make better career decisions.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Top Hiring Companies */}
            <motion.div
              className="bg-white p-6 rounded-xl shadow-sm"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Hiring Companies</h3>
              <div className="h-80">
                <Bar data={chartData.topCompanies} options={chartOptions} />
              </div>
            </motion.div>

            {/* Monthly Hiring Trends */}
            <motion.div
              className="bg-white p-6 rounded-xl shadow-sm"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Monthly Hiring Trends</h3>
              <div className="h-80">
                <Line data={chartData.hiringTrends} options={chartOptions} />
              </div>
            </motion.div>

            {/* Industry Distribution */}
            <motion.div
              className="bg-white p-6 rounded-xl shadow-sm"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Jobs by Industry</h3>
              <div className="h-80">
                <Pie data={chartData.industryDistribution} options={chartOptions} />
              </div>
            </motion.div>

            {/* Top Skills in Demand */}
            <motion.div
              className="bg-white p-6 rounded-xl shadow-sm"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Skills in Demand</h3>
              <div className="h-80">
                <Radar data={chartData.topSkills} options={chartOptions} />
              </div>
            </motion.div>
          </div>

          {/* Key Insights */}
          <motion.div
            className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <div className="bg-purple-50 p-6 rounded-xl">
              <h4 className="font-semibold text-purple-600 mb-2">Highest Paying Industries</h4>
              <ul className="space-y-2 text-gray-600">
                <li>• Technology: $95k - $150k</li>
                <li>• Healthcare: $85k - $130k</li>
                <li>• Finance: $80k - $140k</li>
              </ul>
            </div>
            <div className="bg-purple-50 p-6 rounded-xl">
              <h4 className="font-semibold text-purple-600 mb-2">Growing Sectors</h4>
              <ul className="space-y-2 text-gray-600">
                <li>• Remote Work: +45%</li>
                <li>• Healthcare Tech: +30%</li>
                <li>• Digital Marketing: +25%</li>
              </ul>
            </div>
            <div className="bg-purple-50 p-6 rounded-xl">
              <h4 className="font-semibold text-purple-600 mb-2">Emerging Skills</h4>
              <ul className="space-y-2 text-gray-600">
                <li>• AI & Machine Learning</li>
                <li>• Data Analytics</li>
                <li>• Digital Accessibility</li>
              </ul>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Company-wise Analysis Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Company-wise Analysis</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Detailed insights into hiring patterns and opportunities at top companies.
            </p>
          </motion.div>

          {/* Microsoft Analysis */}
          <motion.div
            className="mb-12 bg-white p-6 rounded-xl shadow-sm"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center mb-6">
              <span className="text-4xl mr-3">🏢</span>
              <h3 className="text-2xl font-bold text-gray-900">Microsoft</h3>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Role Distribution</h4>
                <div className="h-80">
                  <Bar data={companyWiseData.microsoft} options={chartOptions} />
                </div>
              </div>
              <div className="space-y-4">
                <div className="bg-purple-50 p-4 rounded-lg">
                  <h5 className="font-semibold text-purple-600 mb-2">Key Highlights</h5>
                  <ul className="space-y-2 text-gray-600">
                    <li>• 45% increase in software development roles</li>
                    <li>• Strong focus on cloud and AI positions</li>
                    <li>• Remote work options available</li>
                  </ul>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg">
                  <h5 className="font-semibold text-purple-600 mb-2">Benefits</h5>
                  <ul className="space-y-2 text-gray-600">
                    <li>• Comprehensive health coverage</li>
                    <li>• Flexible work arrangements</li>
                    <li>• Professional development support</li>
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Google Analysis */}
          <motion.div
            className="mb-12 bg-white p-6 rounded-xl shadow-sm"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center mb-6">
              <span className="text-4xl mr-3">🌐</span>
              <h3 className="text-2xl font-bold text-gray-900">Google</h3>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Salary Trends</h4>
                <div className="h-80">
                  <Bar data={companyWiseData.google.salaryTrends} options={chartOptions} />
                </div>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Hiring Trend</h4>
                <div className="h-80">
                  <Line data={companyWiseData.google.hiringTrend} options={chartOptions} />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Amazon Analysis */}
          <motion.div
            className="mb-12 bg-white p-6 rounded-xl shadow-sm"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center mb-6">
              <span className="text-4xl mr-3">📦</span>
              <h3 className="text-2xl font-bold text-gray-900">Amazon</h3>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Department-wise Hiring</h4>
                <div className="h-80">
                  <Pie data={companyWiseData.amazon.departmentHiring} options={chartOptions} />
                </div>
              </div>
              <div className="space-y-4">
                <div className="bg-purple-50 p-4 rounded-lg">
                  <h5 className="font-semibold text-purple-600 mb-2">Growth Areas</h5>
                  <ul className="space-y-2 text-gray-600">
                    <li>• AWS continues to lead hiring</li>
                    <li>• Expansion in AI/ML roles</li>
                    <li>• New logistics initiatives</li>
                  </ul>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg">
                  <h5 className="font-semibold text-purple-600 mb-2">Work Culture</h5>
                  <ul className="space-y-2 text-gray-600">
                    <li>• Fast-paced environment</li>
                    <li>• Leadership principles focused</li>
                    <li>• Innovation-driven approach</li>
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Apple Analysis */}
          <motion.div
            className="bg-white p-6 rounded-xl shadow-sm"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center mb-6">
              <span className="text-4xl mr-3">🍎</span>
              <h3 className="text-2xl font-bold text-gray-900">Apple</h3>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Skills in Demand</h4>
                <div className="h-80">
                  <Radar data={companyWiseData.apple.skillsRequired} options={chartOptions} />
                </div>
              </div>
              <div className="space-y-4">
                <div className="bg-purple-50 p-4 rounded-lg">
                  <h5 className="font-semibold text-purple-600 mb-2">Current Focus</h5>
                  <ul className="space-y-2 text-gray-600">
                    <li>• iOS development expertise</li>
                    <li>• AR/VR initiatives</li>
                    <li>• User experience design</li>
                  </ul>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg">
                  <h5 className="font-semibold text-purple-600 mb-2">Company Benefits</h5>
                  <ul className="space-y-2 text-gray-600">
                    <li>• Stock purchase program</li>
                    <li>• Wellness resources</li>
                    <li>• Education reimbursement</li>
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl py-12 px-8 md:px-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-white mb-4">
              {user ? 'Ready to Find Your Next Opportunity?' : 'Ready to Start Your Journey?'}
            </h2>
            <p className="text-purple-100 mb-8 max-w-2xl mx-auto">
              {user 
                ? 'Browse through our curated list of inclusive job opportunities.'
                : 'Join thousands of job seekers who have found their perfect career match through our platform.'
              }
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {user ? (
                <>
                  <Link
                    to="/jobs"
                    className="inline-flex items-center px-8 py-3 border-2 border-white text-base font-medium rounded-lg text-white hover:bg-white hover:text-purple-600 transition-colors duration-300"
                  >
                    Browse Jobs
                  </Link>
                  <Link
                    to="/profile"
                    className="inline-flex items-center px-8 py-3 border-2 border-transparent text-base font-medium rounded-lg text-purple-100 hover:text-white transition-colors duration-300"
                  >
                    Update Profile
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    to="/register"
                    className="inline-flex items-center px-8 py-3 border-2 border-white text-base font-medium rounded-lg text-white hover:bg-white hover:text-purple-600 transition-colors duration-300"
                  >
                    Create Account
                  </Link>
                  <Link
                    to="/about"
                    className="inline-flex items-center px-8 py-3 border-2 border-transparent text-base font-medium rounded-lg text-purple-100 hover:text-white transition-colors duration-300"
                  >
                    Learn More
                  </Link>
                </>
              )}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
