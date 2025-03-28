'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AuthForm({ type = 'signin' }) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch(`/api/auth/${type}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Something went wrong');
      }

      // Store the token
      localStorage.setItem('token', data.token);
      
      // Redirect to profile page
      router.push('/user/profile');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="w-full max-w-md space-y-6">
        <div className="w-full space-y-8 bg-white p-8 rounded-xl shadow-lg">
          <div>
            <h2 className="mt-2 text-3xl font-extrabold text-primary font-bricolage">
              {type === 'signin' ? 'Welcome back' : 'Create account'}
            </h2>
            <p className="mt-2 text-sm text-gray-600 font-bricolage">
              {type === 'signin' ? 'Sign in to your account to continue' : 'Join us to get started'}
            </p>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            {error && (
              <div className="rounded-lg bg-red-50 p-4 border border-red-100">
                <div className="text-sm text-red-700 font-bricolage">{error}</div>
              </div>
            )}
            <div className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1 font-bricolage">
                  Email address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="appearance-none relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-400 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary sm:text-sm font-bricolage transition-colors duration-200"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1 font-bricolage">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="appearance-none relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-400 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary sm:text-sm font-bricolage transition-colors duration-200"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-primary hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 font-bricolage transition-all duration-200 shadow-sm hover:shadow-md"
              >
                {loading ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </span>
                ) : (
                  type === 'signin' ? 'Sign in' : 'Create account'
                )}
              </button>
            </div>
          </form>
          <div>
            <a
              href={type === 'signin' ? '/user/signup' : '/user/signin'}
              className="font-medium text-primary hover:text-primary-hover font-bricolage transition-colors duration-200 text-sm"
            >
              {type === 'signin'
                ? "Don't have an account? Sign up"
                : 'Already have an account? Sign in'}
            </a>
          </div>
        </div>
        <div className="text-center">
          <a
            href="/"
            className="font-medium text-gray-600 hover:text-gray-900 font-bricolage transition-colors duration-200 text-sm"
          >
            ← Back to Home
          </a>
        </div>
      </div>
    </div>
  );
} 