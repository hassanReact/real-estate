import Image from 'next/image'
import React from 'react'
import Work from './Work'

const WorkingwithUs = () => {
    return (
        <>

            <section id='working-with-us' className="text-gray-600 body-font">
                <div className="container px-5 mx-auto overflow-y-hidden">
                    <Work />
                    <div className="flex flex-wrap w-3/4 mx-auto -m-4">
                        <div className="lg:w-1/3 sm:w-1/2 p-4">
                            <div className="flex relative">
                                <Image
                                    width={600}
                                    height={100}
                                    alt="gallery"
                                    className="absolute inset-0 w-full h-full object-cover object-center"
                                    src="/Islamabd.jpg"
                                />
                                <div className="px-8 py-10 relative z-10 w-full border-4 border-gray-600 bg-white bg-opacity-60 opacity-0 hover:opacity-100">
                                    <h2 className="tracking-widest text-sm title-font font-medium text-indigo-500 mb-1">
                                        THE SUBTITLE
                                    </h2>
                                    <h1 className="title-font text-lg font-medium text-gray-900 mb-3">
                                        Shooting Stars
                                    </h1>
                                    <p className="leading-relaxed">
                                        Photo booth fam kinfolk cold-pressed sriracha leggings jianbing
                                        microdosing tousled waistcoat.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="lg:w-1/3 sm:w-1/2 p-4">
                            <div className="flex relative">
                                <Image
                                    width={600}
                                    height={600}
                                    alt="gallery"
                                    className="absolute inset-0 w-full h-full object-cover object-center"
                                    src="/Karachi.jpg"
                                />
                                <div className="px-8 py-10 relative z-10 w-full border-4 border-gray-600 bg-white bg-opacity-60 opacity-0 hover:opacity-100">
                                    <h2 className="tracking-widest text-sm title-font font-medium text-indigo-500 mb-1">
                                        THE SUBTITLE
                                    </h2>
                                    <h1 className="title-font text-lg font-medium text-gray-900 mb-3">
                                        The Catalyzer
                                    </h1>
                                    <p className="leading-relaxed">
                                        Photo booth fam kinfolk cold-pressed sriracha leggings jianbing
                                        microdosing tousled waistcoat.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="lg:w-1/3 sm:w-1/2 p-4">
                            <div className="flex relative">
                                <Image
                                    width={600}
                                    height={600}
                                    alt="gallery"
                                    className="absolute inset-0 w-full h-full object-cover object-center"
                                    src="/Lahore.jpeg"
                                />
                                <div className="px-8 py-10 relative z-10 w-full border-4 border-gray-600 bg-white bg-opacity-60 opacity-0 hover:opacity-100">
                                    <h2 className="tracking-widest text-sm title-font font-medium text-indigo-500 mb-1">
                                        THE SUBTITLE
                                    </h2>
                                    <h1 className="title-font text-lg font-medium text-gray-900 mb-3">
                                        The 400 Blows
                                    </h1>
                                    <p className="leading-relaxed">
                                        Photo booth fam kinfolk cold-pressed sriracha leggings jianbing
                                        microdosing tousled waistcoat.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>

    )
}

export default WorkingwithUs
