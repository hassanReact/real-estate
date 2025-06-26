import Image from 'next/image';
import React from 'react';


const Cards = [
    {img : "/payment.png", desc : "Our Property"},
    {img : "/robotic-hand.png", desc : "Our Technology"},
    {img : "/social-life.png", desc : "Our Blogs"},
]

const BlogWidget = () => {
  return (
    <div className="flex  flex-wrap justify-start items-center  p-4">
      <div className="flex  flex-col md:flex-row items-center space-x-4">
        {Cards.map((item, index) => (
             <div key={index} className="flex justify-center items-center bg-black p-4 rounded-lg shadow-md">
             <div className="flex items-center justify-center">
               <span className="text-indigo-600 text-3xl">
                   <Image alt={item.desc} src={item.img} width={60} height={60}/>
               </span>
             </div>
             <div className="ml-4">
               <div className="text-md text-white">
                 {item.desc}
               </div>
             </div>
           </div>
        )) }
      </div>
    </div>
  );
};

export default BlogWidget;
