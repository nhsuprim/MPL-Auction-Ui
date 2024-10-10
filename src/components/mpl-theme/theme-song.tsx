import React from "react";

const Song = () => {
    return (
        <div className="flex justify-center items-center ">
            <div className="w-full mx-auto aspect-video">
                <h1 className="text-red-600 text-5xl text-center font-bold pb-4">
                    Theme Song
                </h1>
                <iframe
                    className="w-full h-full rounded-lg shadow-lg"
                    src="https://www.youtube.com/embed/ry_rVSRSAtM?autoplay=1&mute=1"
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                ></iframe>
            </div>
        </div>
    );
};

export default Song;
