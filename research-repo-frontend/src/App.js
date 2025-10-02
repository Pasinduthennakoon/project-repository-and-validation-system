// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./Pages/Home";
import Projects from "./Pages/Projects";
import Upload from "./Pages/Upload";
import ProjectDetails from "./Pages/ProjectDetails";
import Navigation from "./components/Navigation/Navigation";
import Footer from "./components/Footer/Footer";
import IdeaComparisonPage from "./Pages/IdeaComparisonPage";
import { footerContent } from "./data/footerContent";


function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <div className="Navigation">
          <Navigation/>
        </div>
        
        <div className=" ">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/upload" element={<Upload />} />
            <Route path="/projects/:id" element={<ProjectDetails />} />
            <Route path="/ideavalidation" element={<IdeaComparisonPage />} />
          </Routes>
        </div>

      </div>
      <div className="Footer">
        <Footer content={footerContent}/>
      </div>
    </Router>
  );
}

export default App;
