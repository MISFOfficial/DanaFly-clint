import React from 'react';

const AdminLoader = () => {
    return (
        <div className="py-5 animate-pulse">
            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-light">
                <div className="bg-[#00A99D] rounded-2xl p-12">
                    <h4 className="text-lg">Total Payment</h4>
                    <p className="text-2xl font-bold">৳
                        0
                    </p>
                </div>
                <div className="bg-white text-black p-12 rounded-2xl">
                    <h4 className="text-lg">Total Tour Guides</h4>
                    <p className="text-2xl font-bold">
                        0
                    </p>
                </div>
                <div className="bg-white text-black p-12 rounded-2xl">
                    <h4 className="text-lg">Total Packages</h4>
                    <p className="text-2xl font-bold">
                        0
                    </p>
                </div>
                <div className="bg-white text-black p-12 rounded-2xl">
                    <h4 className="text-lg">Total Clients</h4>
                    <p className="text-2xl font-bold">
                        0
                    </p>
                </div>
                <div className="bg-white text-black p-12 rounded-2xl">
                    <h4 className="text-lg">Total Stories</h4>
                    <p className="text-2xl font-bold">
                        0
                    </p>
                </div>
            </div>

        </div>
    );
};

export default AdminLoader;