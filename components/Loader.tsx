// components/Loader.tsx
import React from 'react';

interface LoaderProps {
  color?: string;
}

const Loader: React.FC<LoaderProps> = ({ color = '#1da1f2' }) => {
  return (
    <div className="flex items-center justify-center h-full">
      <div
        className="loader ease-linear rounded-full border-4 border-t-4 h-12 w-12"
        style={{ borderTopColor: color, borderColor: `${color}40` }}
      ></div>
      <style jsx>{`
        .loader {
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
};

export default Loader;