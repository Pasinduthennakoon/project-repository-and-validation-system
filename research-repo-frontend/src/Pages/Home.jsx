import React from "react";
// Assuming HeroSection is a component with a strong visual and primary call-to-action
import HeroSection from "../components/HeroSection/HeroSection";

// A dummy component for demonstration of modern feature layout
const FeatureCard = ({ icon, title, description }) => (
  <div className="p-6 bg-white rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 border border-gray-100">
    {/* Icon font size increased and color remains the primary indigo */}
    <div className="text-4xl text-indigo-600 mb-4">{icon}</div>
    {/* Feature title uses a strong font weight for hierarchy */}
    <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>
    {/* Body text uses the standard font weight for readability */}
    <p className="text-gray-600">{description}</p>
  </div>
);

const Home = () => {
  return (
    <>
      {/* 1. Hero Section - Primary Visual and CTA */}
      <HeroSection />

      {/* 2. Our Purpose/Mission Statement - Clean and Impactful */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          {/* Main Heading: Very large, using Tailwind's heaviest font weight (Inter Black/900)
              to create a strong visual presence. */}
          <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-4 tracking-tight">
            Advancing Knowledge, Together.
          </h2>
          {/* Paragraph: Slightly lighter text color for contrast, maintaining readability. */}
          <p className="text-xl text-gray-600 max-w-3xl mx-auto font-light">
            Your trusted platform for seamless <b>uploading, collaborative browsing,</b> and <b>rigorous validation</b> of research projects. Join a global community dedicated to integrity and discovery.
          </p>
        </div>
      </section>

      {/* 3. Key Features Section - Grid Layout is Modern */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Section Sub-Heading: Uses a strong but slightly lower weight than the main heading */}
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
            Platform Highlights
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard 
              icon="🚀" 
              title="Seamless Uploads" 
              description="Quickly and securely upload your researches. Our system handles the heavy lifting."
            />
            <FeatureCard 
              icon="🔎" 
              title="Advanced Discovery" 
              description="Browse a curated, peer-validated repository with powerful search and filtering tools."
            />
            <FeatureCard 
              icon="✅" 
              title="Community Validation" 
              description="Ensure the integrity of your work through our robust, decentralized peer review and validation process."
            />
          </div>
        </div>
      </section>

      {/* 4. Call-to-Action (CTA) Banner - High Contrast */}
      <section className="bg-indigo-600 text-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          {/* CTA Heading: Bold and energetic font weight */}
          <h2 className="text-3xl sm:text-4xl font-extrabold mb-4">
            Ready to contribute or explore?
          </h2>
          {/* CTA Subtext: Standard weight with slight opacity for visual depth */}
          <p className="text-xl opacity-90 mb-8 font-medium">
            Start making an impact on the future of research today.
          </p>
          {/* CTA Button: Stands out with primary color reversed */}
          <button className="bg-white text-indigo-600 hover:bg-gray-100 font-bold py-3 px-8 rounded-lg text-lg shadow-xl transition-colors duration-300">
            Get Started Now
          </button>
        </div>
      </section>
    </>
  );
};

export default Home;