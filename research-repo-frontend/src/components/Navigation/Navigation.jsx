import React from 'react'
import { Link } from "react-router-dom";

const Navigation = () => {
  return (
    <nav className="bg-white shadow-md p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold text-blue-600">Research Repo</h1>
      <div className="space-x-4">
        <Link to="/" className="text-gray-700 hover:text-blue-600">Home</Link>
        <Link to="/upload" className="text-gray-700 hover:text-blue-600">Upload</Link>
        <Link to="/projects" className="text-gray-700 hover:text-blue-600">Projects</Link>
      </div>
    </nav>
  )
}

export default Navigation

