import React from 'react';

/**
 * A reusable component that wraps any content and applies a simple,
 * visually appealing "Coming Soon" mask over it.
 */
const ComingSoonOverlay = ({ children }) => {
  return (
    // 1. The parent container MUST be relative to anchor the absolute overlay.
    <div className="relative">
      
      {/* 2. The Overlay (The Dynamic Mask) */}
      <div 
        className="absolute inset-0 z-40 flex flex-col items-center justify-center space-y-1 
                   bg-gray-500 bg-opacity-85 rounded-xl backdrop-blur-sm 
                   pointer-events-none"
      >
        {/* Icon (Simple, clean design element) */}
        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
        
        {/* Text Styling (Simple, bold, white text with clear visibility) */}
        <span 
          className="text-2xl font-black text-white uppercase tracking-wider 
                     text-shadow-md" // Custom/Simulated shadow for pop
        >
          Coming Soon
        </span>
        <span className="text-sm font-medium text-gray-200">
          We're working on it!
        </span>
      </div>

      {/* 3. The actual content that gets covered */}
      {children}
    </div>
  );
};

export default ComingSoonOverlay;