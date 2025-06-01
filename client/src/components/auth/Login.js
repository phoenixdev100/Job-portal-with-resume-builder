import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { toast } from 'react-hot-toast';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const { email, password } = formData;
  const { login, error, clearError } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await login(email, password);
    if (success) {
      toast.success('Successfully logged in!');
      navigate('/dashboard');
    } else {
      toast.error(error || 'Login failed');
      clearError();
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-3xl font-bold text-center mb-8" tabIndex="0">
        Sign In
      </h1>
      
      <form onSubmit={handleSubmit} className="space-y-6">
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
            className="form-input mt-1"
            aria-label="Password"
            aria-required="true"
          />
        </div>

        <button
          type="submit"
          className="btn-primary w-full"
          aria-label="Sign in to your account"
        >
          Sign In
        </button>
      </form>

      <p className="mt-4 text-center text-sm text-gray-600">
        Don't have an account?{' '}
        <Link
          to="/register"
          className="text-primary-600 hover:text-primary-500"
          aria-label="Create a new account"
        >
          Sign up here
        </Link>
      </p>
    </div>
  );
};

export default Login;
