import React from 'react';
// Dummy components for the icons to make the code runnable
// In a real project, these would be SVG or image components
const FbIcon = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="white"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>;
const InstaIcon = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>;

// Assuming the content prop contains the object with a 'footer' key
const Footer = ({ content }) => {
    // We use content.footer to access the structure from the JSON
    const footerContent = content?.footer;

    return (
        // Note: For Tailwind CSS to work, you must have it set up in your project
        <div className='bg-black text-white'>
            <div className='flex p-8 justify-around'>
                {/* Check for items and map over them */}
                {footerContent?.items && footerContent.items.map((item, index) => {
                    // It is best practice to use a unique key for list items
                    return (
                        <div key={index} className='flex flex-col'>
                            {/* Section Title */}
                            <p className='text-[16px] pb-[10px]'>{item?.title}</p>
                            
                            {/* List of Links (if available) */}
                            {item?.list && item.list.map((listitem, listIndex) => (
                                <a 
                                    key={listIndex} 
                                    className='flex flex-col text-[12px] py-2 hover:text-gray-400 transition-colors' 
                                    href={listitem?.path}
                                >
                                    {listitem?.label}
                                </a>
                            ))}

                            {/* Description (for Location) */}
                            {item?.description && <p>{item?.description}</p>}
                        </div>
                    );
                })}
            </div>
            
            {/* Social Media Icons Section */}
            <div className='flex gap-4 items-center justify-center py-4 border-t border-gray-700'>
                <a href='/fb' aria-label="Facebook Link"><FbIcon /> </a>
                <a href='/insta' aria-label="Instagram Link"><InstaIcon /> </a>
            </div>

            {/* Copyright Section */}
            <p className='text-sm text-white text-center py-4'>
                {footerContent?.copyright}
            </p>
        </div>
    );
}

export default Footer;