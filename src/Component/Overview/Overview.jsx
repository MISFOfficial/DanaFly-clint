import React from "react";

const Overview = () => {
    // Replace below URL with your Cloudinary video URL
    const videoUrl = "https://res.cloudinary.com/duecodkne/video/upload/v1752066869/bxjh5zajqchq3phlaxt2.mp4";

    return (
        <div className="h-[30vh] md:h-[45vh] relative overflow-hidden">
            <video
                className="w-full h-[30vh] md:h-[45vh] object-cover"
                autoPlay
                muted
                loop
                playsInline
                controls={false} // optional
                src={videoUrl}
            />
            <div className="bg-[#00000063] absolute h-full w-full top-0 z-10"></div>
            <div className="absolute h-full w-full top-0 flex flex-col text-white items-center justify-center px-5 md:px-20 z-20">
                <div>
                    <h1 className="text-center text-[10px] md:text-xl font-bold border-2 md:border-4  p-2 md:p-4">Discover the beauty of Bangladesh with The Tourist Guide </h1>
                </div>
            </div>
        </div>
    );
};

export default Overview;
