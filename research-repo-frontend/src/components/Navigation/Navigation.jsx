// ./components/Navigation/Navigation.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Navigation = () => {
  return (
    <nav className="flex items-center py-6 px-16 justify-between gap-40">
      <div className='flex items-center gap-6'>
        <a className='text-3xl font-bold text-blue-600 font-bold gap-8' href='/'>Research Repo.</a>
      </div>
        <div className="flex flex-wrap items-center gap-10 flex-1 font-bold">
          <ul className='flex gap-14 text-gray-600 hover:text-black'>
            <li className=''><Link to="/" className="hover:text-blue-600">Home</Link></li>
            <li className=''><Link to="/projects" className="hover:text-blue-600">Browse</Link></li>
            <li className=''><Link to="/upload" className="hover:text-blue-600">Upload</Link></li>
            <li className=''><Link to="/ideavalidation" className="hover:text-blue-600">Validation</Link></li>
          </ul>
        </div>

        <div className='flex items-center gap-6'>
          <div className='flex justify-center w-[100px] bg-blue-600 text-white rounded-md hover:bg-blue-700 font-bold'>
            <input type="submit" className="px-4 py-2 outline-none" name='login' value="SIGN IN"/>
          </div>
        </div>
      </nav>
  );
};

export default Navigation;
