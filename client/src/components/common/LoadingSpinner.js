import React from 'react';

const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center py-4">
      <div className="w-6 h-6 border-2 border-indigo-600 rounded-full border-t-transparent animate-spin"></div>
    </div>
  );
};

export default LoadingSpinner;
