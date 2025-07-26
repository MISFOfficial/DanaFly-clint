import React from 'react';
import { useNavigate } from 'react-router';
import {
    FacebookShareButton,
    WhatsappShareButton,
    FacebookIcon,
    WhatsappIcon,
    TwitterShareButton,
} from 'react-share';
import { FaXTwitter } from 'react-icons/fa6';
import useAuth from '../../Hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
// import useAxiosInstance from '../../Hooks/useAxiosInstance';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import StoryLoader from '../../Loader/StoryLoader/StoryLoader';

const Community = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const axiosSecure = useAxiosSecure()

    const { data: stories = [], isLoading } = useQuery({
        queryKey: ['stories'],
        queryFn: async () => {
            const res = await axiosSecure.get('/all_story');
            return res.data;
        },
    });

    //console.log(stories)

    if (isLoading) {
        return (<div className='max-w-[1280px] mx-auto'>
            <StoryLoader></StoryLoader>
        </div>)

    }

    return (
        <section className="max-w-[1280px] mx-auto px-2 md:px-4 lg:px-0 py-16">
            <title>DanaFly - Community</title>
            <h2 className="text-3xl font-bold text-[#00A99D] mb-10">Traveler's Stories</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-12">
                {stories.map((story) => (
                    <div
                        key={story._id}
                        className="relative h-80 rounded-xl overflow-hidden shadow-lg group transform hover:scale-105 duration-200"
                    >
                        <img
                            src={story.photo?.[0]}
                            alt={story.title}
                            className="absolute inset-0 w-full h-full object-cover z-0"
                        />

                        <div className="absolute inset-0 bg-black/50 z-10 transition group-hover:bg-black/60"></div>

                        <div className="relative z-20 h-full flex flex-col justify-center gap-5 p-6 text-white">
                            <div>
                                <h3 className="text-xl font-bold">{story.title}</h3>
                                <p className="italic text-sm mb-2">By {story.posterName}</p>
                                <p className="text-sm line-clamp-3">{story.description}</p>
                            </div>

                            <div className="flex gap-3 mt-4">
                                {user ? (
                                    <>
                                        <FacebookShareButton url={`https://yourapp.com/stories/${story._id}`} quote={story.title}>
                                            <FacebookIcon size={32} round />
                                        </FacebookShareButton>
                                        <TwitterShareButton url={`https://yourapp.com/stories/${story._id}`} title={story.title}>
                                            <FaXTwitter size={32} />
                                        </TwitterShareButton>
                                        <WhatsappShareButton url={`https://yourapp.com/stories/${story._id}`} title={story.title}>
                                            <WhatsappIcon size={32} round />
                                        </WhatsappShareButton>
                                    </>
                                ) : (
                                    <>
                                        <button onClick={() => navigate('/login')}>
                                            <FacebookIcon size={32} round />
                                        </button>
                                        <button onClick={() => navigate('/login')}>
                                            <FaXTwitter size={32} />
                                        </button>
                                        <button onClick={() => navigate('/login')}>
                                            <WhatsappIcon size={32} round />
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Community;
