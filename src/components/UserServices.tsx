import React, { useState } from 'react';
import { Button } from './ui/button'; // Assuming you have a Button component in your UI library
import AllUserServices from './AllUserServices';
import MyServices from './MyServices';
import AddNewUserService from './AddNewUserService';

const UserServices = () => {
  const [view, setView] = useState<'all' | 'my' | 'add'>('all');

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-center mb-4">
        <Button 
          className={`mx-2 ${view === 'all' ? 'bg-gray-800 text-white' : 'bg-gray-400'}`} 
          onClick={() => setView('all')}
        >
          All Services
        </Button>
        <Button 
          className={`mx-2 ${view === 'my' ? 'bg-gray-800 text-white' : 'bg-gray-400'}`} 
          onClick={() => setView('my')}
        >
          My Services
        </Button>
        <Button 
          className={`mx-2 ${view === 'add' ? 'bg-gray-800 text-white' : 'bg-gray-400'}`} 
          onClick={() => setView('add')}
        >
          Add New Service
        </Button>
      </div>

      <div>
        {view === 'all' && (
          <div><AllUserServices/></div>
        )}
        {view === 'my' && (
          <div><MyServices/></div>
        )}
        {view === 'add' && (
          <div><AddNewUserService/></div>
        )}
      </div>
    </div>
  );
};

export default UserServices;
