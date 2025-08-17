import React from 'react';
import { useNavigate } from 'react-router';
import {
    FacebookShareButton,
    TwitterShareButton,
    WhatsappShareButton,
    FacebookIcon,
    WhatsappIcon,
} from 'react-share';
import { FaXTwitter } from 'react-icons/fa6';
import { useQuery } from '@tanstack/react-query';
import useAuth from '../../Hooks/useAuth';
// import useAxiosInstance from '../../Hooks/useAxiosInstance';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import StoryLoader from '../../Loader/StoryLoader/StoryLoader';


const Story = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const axiosSecure=useAxiosSecure()

    const { data: stories = [], isLoading } = useQuery({
        queryKey: ['randomStories'],
        queryFn: async () => {
            const res = await axiosSecure.get('/api/random-stories');
            return res.data;
        },
    });

    if (isLoading) return <StoryLoader></StoryLoader>

    return (
        <section className="py-16">
            <h2 className="text-xl md:text-3xl font-bold text-light mb-10">Traveler's Stories</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-12">
                {stories.map((story) => (
                    <div
                        key={story._id}
                        className="relative rounded-xl overflow-hidden shadow-lg group transform hover:scale-105 duration-200"
                    >
                        <img
                            src={story.photo?.[0] || '/placeholder.jpg'} // fallback image
                            alt={story.title}
                            className="absolute inset-0 w-full h-full object-cover z-0"
                        />

                        <div className="absolute inset-0 bg-black/50 z-10 transition group-hover:bg-black/60"></div>

                        <div className="relative z-20 h-full flex flex-col justify-center gap-5 p-6 text-light">
                            <div>
                                <h3 className="text-xl font-bold">{story.title}</h3>
                                <p className="italic text-sm mb-2">By {story.posterName}</p>
                                <p className="text-sm line-clamp-3">{story.description}</p>
                            </div>

                            <div className="flex gap-3 mt-4">
                                {user ? (
                                    <>
                                        <FacebookShareButton url={`https://yourwebsite.com/stories/${story._id}`} quote={story.title}>
                                            <FacebookIcon size={32} round />
                                        </FacebookShareButton>
                                        <TwitterShareButton url={`https://yourwebsite.com/stories/${story._id}`} title={story.title}>
                                            <FaXTwitter size={32} />
                                        </TwitterShareButton>
                                        <WhatsappShareButton url={`https://yourwebsite.com/stories/${story._id}`} title={story.title}>
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

            {/* View All Stories Button */}
            <div className="text-center">
                <button
                    onClick={() => navigate('/community')}
                    className="px-8 py-3 cta-btn text-light font-semibold rounded-full hover:scale-107 cursor-pointer transition"
                >
                    All Stories
                </button>
            </div>
        </section>
    );
};

export default Story;
