import React, { ReactNode } from 'react';

interface OverlayProps {
  onClose: () => void;
  children:ReactNode
}

const Overlay: React.FC<OverlayProps> = ({ children, onClose }) => {
  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50 p-10 md:p-20">
      <div className="bg-white p-4 rounded-md shadow-md">
        {children}
        <button className="mt-2 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600" onClick={onClose}>
         Back
        </button>
      </div>
    </div>
  );
};

export default Overlay;
