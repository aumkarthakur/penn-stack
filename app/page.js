'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Home() {
  const [dbStatus, setDbStatus] = useState('checking');
  const [error, setError] = useState(null);

  useEffect(() => {
    const checkDbConnection = async () => {
      try {
        const response = await fetch('/api');
        const data = await response.json();
        if (!data.timestamp) {
          throw new Error('Database connection failed');
        }
        setDbStatus('connected');
      } catch (err) {
        setDbStatus('error');
        setError(err.message);
      }
    };

    checkDbConnection();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg">
        <div>
          <h1 className="text-4xl font-extrabold text-primary font-bricolage text-center">
            PENN Stack
          </h1>
          <p className="mt-4 text-lg text-gray-600 font-bricolage text-center leading-9">
            A modern full-stack web application <span className="bg-[#306793] text-white p-1 rounded-md ml-1 mr-1">PostgreSQL</span> <span className="bg-[#f7df1c] text-black p-1 rounded-md ml-1 mr-1">Express.js</span> <span className="bg-[#000] text-white p-1 rounded-md ml-1 mr-1">Next.js</span>  <span className="bg-[#009900] text-white p-1 rounded-md ml-1 mr-1">NGINX</span>
          </p>
        </div>

        {dbStatus === 'checking' && (
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2">
              <svg className="animate-spin h-5 w-5 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span className="text-gray-600 font-bricolage">Checking database connection...</span>
            </div>
          </div>
        )}

        {dbStatus === 'error' && (
          <div className="mt-8 text-center">
            <div className="rounded-lg bg-red-50 p-4 border border-red-100 mb-6">
              <h2 className="text-xl font-semibold text-red-600 font-bricolage mb-2">Database Connection Error</h2>
              <p className="text-gray-600 font-bricolage">{error}</p>
            </div>
            <h2 className="text-xl font-semibold text-gray-900 font-bricolage mb-4">Setup Instructions</h2>
            <ol className="list-decimal list-inside space-y-2 text-gray-600 font-bricolage text-sm">
              <li>Check if PostgreSQL is running on your system</li>
              <li>Verify your database credentials in the .env file</li>
              <li>Run database migrations using: <code className="bg-gray-100 px-2 py-1 rounded">npm run migrate</code></li>
              <li>Start the development server: <code className="bg-gray-100 px-2 py-1 rounded">npm run dev</code></li>
            </ol>
            <button
              onClick={() => window.location.reload()}
              className="mt-6 w-full flex justify-center py-2 px-4 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary font-bricolage transition-all duration-200"
            >
              Check Again
            </button>
          </div>
        )}

        {dbStatus === 'connected' && (
          <div className="space-y-4">
            <Link
              href="/user/signin"
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg text-sm font-medium text-white bg-primary hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary font-bricolage transition-all duration-200 shadow-sm hover:shadow-md"
            >
              Sign In
            </Link>
            <Link
              href="/user/signup"
              className="w-full flex justify-center py-3 px-4 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary font-bricolage transition-all duration-200"
            >
              Create Account
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
