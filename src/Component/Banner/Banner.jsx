import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { motion } from "framer-motion" //eslint-disable-line no-unused-vars
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import slide1 from '../../assets/slide1.jpg';
import slide2 from '../../assets/slide2.jpeg';
import slide3 from '../../assets/slide3.jpeg';
import { FaLocationArrow } from 'react-icons/fa';
import { Link } from 'react-router';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';


const slides = [
    {
        id: 1,
        image: slide1,
        title: "Cox's Bazar, Bangladesh",
        description: "Explore the world's largest mangrove forest with local guides.",
    },
    {
        id: 2,
        image: slide2,
        title: "Sundorban, Bangladesh",
        description: "Experience the serenity and culture of the hill tracts.",
    },
    {
        id: 3,
        image: slide3,
        title: "Shajek, Bangladesh",
        description: "Enjoy the world's longest sea beach with luxury resorts.",
    },
];

const Banner = () => {
    return (
        <div className="relative">
            <Swiper
                centeredSlides={true}
                autoplay={{
                    delay: 4000,
                    disableOnInteraction: false,
                }}
                loop={true}
                navigation={false}
                modules={[Autoplay, Pagination, Navigation]}
                className="h-[60vh] md:h-[90vh] lg:h-[70vh] w-full"
            >
                {slides.map((slide) => (
                    <SwiperSlide key={slide.id}>
                        <div className="relative w-full h-full">
                            <img
                                src={slide.image}
                                alt={slide.title}
                                className="w-full h-full object-cover"
                            />
                            {/* Slide title at bottom right */}
                            <div className='absolute bg-[#0000006f] h-full w-full top-0'>
                            </div>
                            <div className="absolute bottom-4 right-4  bg-[#00A99D] text-white text-[8px] md:text-sm px-4 py-2 rounded shadow-md flex items-center gap-2">
                                <FaLocationArrow></FaLocationArrow> {slide.title}
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>

            {/* Overlay content */}
            <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{
                    y: 0,
                    opacity: 1,
                    transition: { duration: 1 }
                }}
                className="absolute h-full w-full top-0 flex flex-col text-white items-center justify-center px-3 md:px-20 z-20">
                <div>
                    <h1 className="font-extrabold text-md md:text-4xl title-font text-start">
                        Explore Bangladesh with DanaFly – Your Ultimate Travel Guide
                    </h1>
                    <p className="mt-2 md:mt-5 text-[12px] md:text-lg">
                        Your trusted travel guide to discover destinations, tours, and local
                        experiences — all in one place.
                    </p>
                    <div className="mt-5 md:mt-10 flex items-center gap-5">
                        <Link to='trips'>
                            <button className="transition hover:scale-110 px-3 py-1 md:px-8 md:py-3 duration-500 border-white border-3 cursor-pointer text-[12px] md:text-[16px]">
                                Book Now
                            </button>
                        </Link>
                        <Link to='/community'>
                            <button className="transition hover:scale-110 px-3 py-1 md:px-8 md:py-3 bg-[#00A99D] text-white duration-500 border-[#00A99D] border-3 cursor-pointer text-[12px] md:text-[16px]">
                                Explore More
                            </button>
                        </Link>
                    </div>
                </div>
            </motion.div>
        </div >
    );
};

export default Banner;
