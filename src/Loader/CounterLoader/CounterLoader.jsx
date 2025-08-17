import React from 'react';

const CounterLoader = () => {
    return (
        <section
            className="py-16 bg-p1"
            
        >
            <div className="max-w-6xl mx-auto px-6">
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 text-light">
                    Trusted by Our Growing Community
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* 1 */}
                    <div        
                        className="bg-p1 shadow-md rounded-lg p-6 text-center w-full animate-pulse bg-p2"
                    >
                        <h2 className="text-4xl font-bold text-light mb-2">
                            0
                        </h2>
                        <p className="text-lg text-light font-medium">Total Users</p>
                    </div>
                    {/* 2 */}
                    <div        
                        className="bg-p1 shadow-md rounded-lg p-6 text-center w-full animate-pulse bg-p2"
                    >
                        <h2 className="text-4xl font-bold text-light mb-2">
                            0
                        </h2>
                        <p className="text-lg text-light font-medium">Registered Tour Guides</p>
                    </div>
                    {/*  */}
                    <div        
                        className="bg-p1 shadow-md rounded-lg p-6 text-center w-full animate-pulse bg-p2"
                    >
                        <h2 className="text-4xl font-bold text-light mb-2">
                            0
                        </h2>
                        <p className="text-lg text-light font-medium bg-p2">Tour Packages Available</p>
                    </div>
                </div>
            </div>c
        </section>
    );
};

export default CounterLoader;