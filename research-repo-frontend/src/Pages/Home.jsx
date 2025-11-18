import React, { useState } from "react";
import HeroSection from "../components/HeroSection/HeroSection";
import AuthModal from "../components/AuthModel/AuthModal";
import { useAuth } from "../context/AuthContext";

const FeatureCard = ({ icon, title, description }) => (
  <div className="p-6 bg-white rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 border border-gray-100">
    <div className="text-4xl text-indigo-600 mb-4">{icon}</div>
    <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

const Home = () => {
  const { user } = useAuth();
  const [showAuth, setShowAuth] = useState(false); // modal state

  return (
    <>
      <HeroSection />

      {/* Purpose Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-4 tracking-tight">
            Advancing Knowledge, Together.
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto font-light">
            Your trusted platform for seamless <b>uploading, collaborative browsing,</b> and <b>rigorous validation</b> of research projects.
          </p>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
            Platform Highlights
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard icon="🚀" title="Seamless Uploads" description="Quickly and securely upload your researches." />
            <FeatureCard icon="🔎" title="Advanced Discovery" description="Browse a curated, peer-validated repository." />
            <FeatureCard icon="✅" title="Community Validation" description="Ensure integrity via peer review and validation." />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      {!user && (
        <section className="bg-indigo-600 text-white py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl font-extrabold mb-4">
              Ready to contribute or explore?
            </h2>
            <p className="text-xl opacity-90 mb-8 font-medium">
              Start making an impact on the future of research today.
            </p>
            <button
              onClick={() => setShowAuth(true)} // open modal
              className="bg-white text-indigo-600 hover:bg-gray-100 font-bold py-3 px-8 rounded-lg text-lg shadow-xl transition-colors duration-300"
            >
              Get Started Now
            </button>
          </div>
        </section>
      )}

      {/* Auth Modal */}
      <AuthModal visible={showAuth} onClose={() => setShowAuth(false)} />
    </>
  );
};

export default Home;
