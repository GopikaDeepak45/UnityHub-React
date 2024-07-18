import React from 'react';
import { Link } from 'react-router-dom';

const NotFound: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold mb-4">Hmmm… can't reach this page</h1>
      <p className="text-gray-600 mb-4">Check if there is a typo in the URL.</p>
      <Link to="/" className="text-blue-600 hover:underline">Go to Home Page</Link>
    </div>
  );
};

export default NotFound;
