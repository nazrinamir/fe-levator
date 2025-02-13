import React from 'react';

function PageLayout({ children, floorNumber, title, subtitle }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <div className="text-center space-y-4">
        <div className="text-yellow-500 text-2xl font-mono">{floorNumber}</div>
        <h1 className="text-6xl font-bold font-darumadrop">{title}</h1>
        <div className="font-darumadrop">
          {children}
        </div>
        <footer className="text-gray-400 text-xl">{subtitle}</footer>
      </div>
    </div>
  );
}

export default PageLayout; 