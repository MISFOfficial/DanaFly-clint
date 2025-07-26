import React from 'react';
import Overview from '../../Component/Overview/Overview';
import Banner from '../../Component/Banner/Banner';
import Story from '../../Component/Story/Story';
import Counter from '../../Component/Counter.jsx/Counter';
import TourismGuideSection from '../../Component/TourismGuideSection/TourismGuideSection';
import PopularDestinations from '../../Component/PopularDestinations/PopularDestinations';
import Testimonials from '../../Component/Testimonials/Testimonials';


const Home = () => {


    return (
        <div>
            <title>
                DanaFly | Home
            </title>
            <div>
                <Banner></Banner>
                <Counter></Counter>
            </div>
            <div className='py-5'>
                <div className='max-w-[1280px] mx-auto mt-10 px-2 md:px-4 lg:px-0'>
                    <Overview></Overview>
                    <Story></Story>
                    <TourismGuideSection></TourismGuideSection>
                </div>

                {/* Extra 2 section */}
                <div>
                    <PopularDestinations></PopularDestinations>
                    <Testimonials></Testimonials>
                </div>
            </div>
        </div>
    );
};

export default Home;