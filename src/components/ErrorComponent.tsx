import React from 'react';
import { useNavigate } from 'react-router-dom';


interface ErrorComponentProps {
  message?: string;
}

const ErrorComponent: React.FC<ErrorComponentProps> = ({ message }) => {
  const navigate = useNavigate();
  console.log('error got in error comp',message)
  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-100">
      <div className="max-w-lg w-full bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-red-600 mb-4">Oops! Something went wrong.</h2>
        {message ? (
  <p className="text-gray-700 text-2xl">{message}</p>
) : (
  console.error('No message provided to ErrorComponent'),
  <p className="text-lg">Please try again later.</p>
)}
<div className="flex justify-center mt-6 space-x-4">
        <button
          onClick={() => window.location.reload()}
          className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 focus:outline-none focus:bg-red-700"
        >
          Refresh
        </button>
        <button
            onClick={() => navigate('/')}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none focus:bg-blue-700"
          >
            Go to Home
          </button>
        </div>

      </div>
    </div>
  );
};

export default ErrorComponent;
