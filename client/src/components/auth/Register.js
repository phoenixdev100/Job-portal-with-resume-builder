import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { toast } from 'react-hot-toast';

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const { firstName, lastName, email, password, confirmPassword } = formData;
  const { register, error, clearError } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    clearError();
    
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    const userData = {
      firstName,
      lastName,
      email,
      password
    };

    try {
      const success = await register(userData);
      if (success) {
        toast.success('Registration successful!');
        navigate('/dashboard');
      } else {
        toast.error(error || 'Registration failed. Please try again.');
      }
    } catch (err) {
      toast.error('An unexpected error occurred. Please try again.');
      console.error('Registration error:', err);
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-3xl font-bold text-center mb-8" tabIndex="0">
        Create Account
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={firstName}
              onChange={handleChange}
              required
              className="form-input mt-1"
              aria-label="First Name"
              aria-required="true"
            />
          </div>

          <div>
            <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={lastName}
              onChange={handleChange}
              required
              className="form-input mt-1"
              aria-label="Last Name"
              aria-required="true"
            />
          </div>
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={handleChange}
            required
            className="form-input mt-1"
            aria-label="Email Address"
            aria-required="true"
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={handleChange}
            required
            minLength="6"
            className="form-input mt-1"
            aria-label="Password"
            aria-required="true"
          />
        </div>

        <div>
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
            Confirm Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={confirmPassword}
            onChange={handleChange}
            required
            minLength="6"
            className="form-input mt-1"
            aria-label="Confirm Password"
            aria-required="true"
          />
        </div>

        <button
          type="submit"
          className="btn-primary w-full"
          aria-label="Create your account"
        >
          Sign Up
        </button>
      </form>

      <p className="mt-4 text-center text-sm text-gray-600">
        Already have an account?{' '}
        <Link
          to="/login"
          className="text-primary-600 hover:text-primary-500"
          aria-label="Sign in to your existing account"
        >
          Sign in here
        </Link>
      </p>
    </div>
  );
};

export default Register;
