import React from 'react';

const StoryLoader = () => {
    return (
        <section className="py-16">
            <h2 className="text-3xl font-bold text-light mb-10">Traveler's Stories</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-12">
                {/* 1 */}
                    <div
                        className="relative h-80 rounded-xl overflow-hidden shadow-lg group transform hover:scale-105 duration-200 animate-pulse"
                    >
                        <div className="absolute inset-0 bg-black/50 z-10 transition group-hover:bg-black/60"></div>

                        <div className="relative z-20 h-full flex flex-col justify-center gap-5 p-6 text-light">
                            <div>
                                <h3 className="text-xl text-transparent font-bold">tit,e</h3>
                                <p className="italic text-transparent text-sm mb-2">By dfasdfasdfasdfsa</p>
                                <p className="text-sm text-transparent line-clamp-3">fadfdafasdfasdf</p>
                            </div>
                        </div>
                    </div>
                {/* 2 */}
                    <div
                        className="relative h-80 rounded-xl overflow-hidden shadow-lg group transform hover:scale-105 duration-200 animate-pulse"
                    >
                        <div className="absolute inset-0 bg-black/50 z-10 transition group-hover:bg-black/60"></div>

                        <div className="relative z-20 h-full flex flex-col justify-center gap-5 p-6 text-light">
                            <div>
                                <h3 className="text-xl text-transparent font-bold">tit,e</h3>
                                <p className="italic text-transparent text-sm mb-2">By dfasdfasdfasdfsa</p>
                                <p className="text-sm text-transparent line-clamp-3">fadfdafasdfasdf</p>
                            </div>
                        </div>
                    </div>
                {/* 3 */}
                    <div
                        className="relative h-80 rounded-xl overflow-hidden shadow-lg group transform hover:scale-105 duration-200 animate-pulse"
                    >
                        <div className="absolute inset-0 bg-black/50 z-10 transition group-hover:bg-black/60"></div>

                        <div className="relative z-20 h-full flex flex-col justify-center gap-5 p-6 text-light">
                            <div>
                                <h3 className="text-xl text-transparent font-bold">tit,e</h3>
                                <p className="italic text-transparent text-sm mb-2">By dfasdfasdfasdfsa</p>
                                <p className="text-sm text-transparent line-clamp-3">fadfdafasdfasdf</p>
                            </div>
                        </div>
                    </div>
                {/* 44 */}
                    <div
                        className="relative h-80 rounded-xl overflow-hidden shadow-lg group transform hover:scale-105 duration-200 animate-pulse"
                    >
                        <div className="absolute inset-0 bg-black/50 z-10 transition group-hover:bg-black/60"></div>

                        <div className="relative z-20 h-full flex flex-col justify-center gap-5 p-6 text-light">
                            <div>
                                <h3 className="text-xl text-transparent font-bold">tit,e</h3>
                                <p className="italic text-transparent text-sm mb-2">By dfasdfasdfasdfsa</p>
                                <p className="text-sm text-transparent line-clamp-3">fadfdafasdfasdf</p>
                            </div>
                        </div>
                    </div>
              
            </div>

            {/* View All Stories Button */}
            <div className="text-center">
                <button
                
                    className="px-8 py-3 bg-[#00A99D] text-light font-semibold rounded-full hover:bg-[#00796b] transition"
                >
                    All Stories
                </button>
            </div>
        </section>
    );
};

export default StoryLoader;