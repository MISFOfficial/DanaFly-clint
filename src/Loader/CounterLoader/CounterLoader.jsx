import React from 'react';

const CounterLoader = () => {
    return (
        <section
            className="py-16 bg-blue-100"
            style={{ fontFamily: `"Plus Jakarta Sans", "Noto Sans", sans-serif` }}
        >
            <div className="max-w-6xl mx-auto px-6">
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 text-light">
                    Trusted by Our Growing Community
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* 1 */}
                    <div        
                        className="bg-white shadow-md rounded-lg p-6 text-center w-full animate-pulse"
                    >
                        <h2 className="text-4xl font-bold text-light mb-2">
                            0
                        </h2>
                        <p className="text-lg text-gray-700 font-medium">Total Users</p>
                    </div>
                    {/* 2 */}
                    <div        
                        className="bg-white shadow-md rounded-lg p-6 text-center w-full animate-pulse"
                    >
                        <h2 className="text-4xl font-bold text-light mb-2">
                            0
                        </h2>
                        <p className="text-lg text-gray-700 font-medium">Registered Tour Guides</p>
                    </div>
                    {/*  */}
                    <div        
                        className="bg-white shadow-md rounded-lg p-6 text-center w-full animate-pulse"
                    >
                        <h2 className="text-4xl font-bold text-light mb-2">
                            0
                        </h2>
                        <p className="text-lg text-gray-700 font-medium">Tour Packages Available</p>
                    </div>
                </div>
            </div>c
        </section>
    );
};

export default CounterLoader;