// src/App.js
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Navigation from "./components/Navigation/Navigation";
import Footer from "./components/Footer/Footer";
import { footerContent } from "./data/footerContent";
import Routers from "./routers/routers";
import { AuthProvider } from "./context/AuthContext";


function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="min-h-screen bg-gray-50">
          <div className="Navigation">
            <Navigation />
          </div>

          <div className=" ">
            <Routers />
          </div>

        </div>
        <div className="Footer">
          <Footer content={footerContent} />
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
