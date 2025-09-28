import React from "react";
import HeroSection from "../components/HeroSection/HeroSection";

const Home = () => {
  return (
    <>
      <HeroSection/>

      <div className="flex flex-col items-center justify-center my-20 mt-10">
        <h1 className="text-4xl font-bold text-gray-600 underline mb-[10px]">Our Perpose</h1>
        <p className="text-lg text-gray-600 text-center max-w-2xl">
          Your one-stop solution for uploading, browsing, and validating research projects. Join our community of researchers and contribute to the advancement of knowledge.
        </p>
      </div>
    </>
    
  );
};

export default Home;
