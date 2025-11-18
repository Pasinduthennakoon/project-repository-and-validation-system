import React from 'react'
import HeroImg from '../../assets/img/Research_banner.jpeg';

const HeroSection = () => {
  return (
    <div
      className="relative flex items-center bg-cover bg-center text-left h-[600px] w-full z-0"
      style={{ backgroundImage: `url(${HeroImg})` }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 z-0"></div>

      {/* Content */}
      <main className="px-10 lg:px-24 relative z-0">
        <div className="text-left">
          <h2 className="text-2xl text-white">Welcome to</h2>
        </div>

        <p className="mt-3 text-white sm:mt-5 sm:max-w-xl text-6xl">
          Research Repo
        </p>

        <p className="mt-3 text-white sm:mt-5 sm:max-w-xl text-2xl">
          Browse | upload | explore student research projects.
        </p>
      </main>
    </div>
  );
};

export default HeroSection;
