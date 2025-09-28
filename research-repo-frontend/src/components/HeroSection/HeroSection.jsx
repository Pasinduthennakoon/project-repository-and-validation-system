import React from 'react'
import HeroImg from '../../assets/img/Research_banner.jpeg';

const HeroSection = () => {
  return (
    <div className='relative flex items-center bg-cover flext-start bg-cover bg-center text-left h-[600px] w-full' style={{backgroundImage
    : `url(${HeroImg})`}}>
        <div className='absolute top-0 right-0 bottom-0 left-0'></div>
            <main className='px-10 lg:px-24 z-10'>
                <div className='text-left'>
                    <h2 className='text-2xl text-white'>Welcome to</h2>
                </div>
                <p className='mt-3 text-white sm:mt-5 sm:max-w-xl text-6xl hover:text-black'>
                Research Repo
                </p>
                <p className='mt-3 text-white sm:mt-5 sm:max-w-xl text-2xl'>
                Browse | upload | explore student research projects.
                </p>
            </main>
        
    </div>
  )
}

export default HeroSection
