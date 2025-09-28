import React from 'react'
import FbIcon from '../Common/FbIcon'
import InstaIcon from '../Common/InstaIcon'

const Footer = ({content}) => {
  return (
    <div className='bg-black text-white'>
        <div className='flex p-8 justify-around'>
            {content?.items && content?.items?.map((item,index) =>{
                return(
                    <div className='flex flex-col'>
                        <p className='text-[16px] pb-[10px]'>{item?.title}</p>
                        {item?.list && item?.list?.map((listitem,index) =><a className='flex flex-col text-[12px] py-2' href={listitem?.path}>{listitem?.label}</a>)}
                        {item?.description && <p>{item?.description}</p>}
                    </div>
                )
            })}
        </div>
        <div className='flex gap-2 items-center justify-center py-4'>
            <a href='/fb'><FbIcon /> </a>
            <a href='/insta'><InstaIcon /> </a>
        </div>
        <p className='text-sm text-white text-center content-center'>{content?.copyright}</p>
    </div>
  )
}

export default Footer