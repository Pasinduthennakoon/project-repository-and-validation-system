import React from 'react'
const StudentCard = ({ student }) => {
  return (
    <div className="bg-white shadow-lg rounded-2xl p-6 w-100 hover:scale-105 transition">
        <div className='h-72 w-72'>
        <img src={student.photoLink} alt={student.userName} className="w-72 h-72 rounded-full object-cover mb-4"/>
        </div>
      <h2 className="text-xl font-bold text-gray-800 mb-2">{student.userName}</h2>
      <p className="text-sm text-gray-600"><span className='font-semibold mr-[50px]'>Batch : </span>{student.batch}</p>
      <p className="text-sm text-gray-600"><span className='font-semibold mr-[10px]'>Department : </span>{student.department}</p>
    </div>
  )
}

export default StudentCard