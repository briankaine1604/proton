// pages/coming-soon.js
import React from "react";

const ComingSoon = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-blue-100 bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-20 to-gray-300 text-white">
      <div className="text-center p-8 bg-white/10 rounded-lg shadow-lg backdrop-blur-md">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          🚧 Coming Soon 🚧
        </h1>
        <p className="text-lg md:text-xl mb-6">
          We&apos;re working hard to bring this feature to you. Stay tuned!
        </p>
        <div>
          <a
            href="/admin"
            className="inline-block px-6 py-3 bg-white text-blue-500 font-semibold rounded-md hover:bg-gray-100 transition"
          >
            Go Back Home
          </a>
        </div>
      </div>
    </div>
  );
};

export default ComingSoon;
