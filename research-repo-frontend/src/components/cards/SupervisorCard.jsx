import React from 'react'

const SupervisorCard = ({ supervisor }) => {
  return (
    <div className="bg-white shadow-lg rounded-2xl p-6 w-80 hover:scale-105 transition">
        <div className='h-72 w-72'>
        <img src={supervisor.image} alt={supervisor.name} className="w-72 h-72 rounded-full object-cover mb-4"/>
        </div>
      <h2 className="text-xl font-bold text-gray-800 mb-2">{supervisor.name}</h2>
      <p className="text-sm text-gray-600"><span className='font-semibold mr-[10px]'>Department : </span>{supervisor.department}</p>
      <p className="text-sm text-gray-600"><span className='font-semibold mr-[50px]'>E-mail : </span>{supervisor.email}</p>

    </div>
  )
}

export default SupervisorCard