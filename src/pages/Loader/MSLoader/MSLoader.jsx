import React from 'react';
import { FaEdit, FaMapMarkerAlt, FaTag, FaTrashAlt } from 'react-icons/fa';

const MSLoader = () => {
    <section className='animate-pulse'>
        <h1 className="text-3xl font-bold text-start text-[#00A99D] mb-5">Manage Your Stories</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* 1 */}
            <div  className="bg-white rounded-lg shadow-mdp-4">
                {/* Images */}
                <div className="flex gap-2 overflow-x-auto scroll-auto pb-2">
                    <div className="h-28 w-36 object-cover rounded bg-gray-700 ">
                    </div>
                </div>

                {/* Story Info */}
                <div className="mt-4">
                    <h2 className="text-xl bg-gray-700 rounded font-bold text-transparent">Amazing tour With me</h2>
                    <p className="bg-gray-700 rounded mt-2 text-transparent">Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus minus mollitia soluta. Ipsam, commodi! Sit aliquam beatae quis error enim ea eos, fugiat libero odio quaerat minima saepe eius optio.</p>

                    <p className="text-sm text-transparent mt-2 flex items-center bg-gray-700 rounded">
                        <FaMapMarkerAlt className="mr-1" /> location
                    </p>

                    <div className="mt-3 flex flex-wrap gap-2 text-sm">
                        <span className="bg-gray-700 rounded px-2 py-1  flex items-center gap-1 text-transparent">
                            <FaTag /> nine
                        </span>
                    </div>
                </div>

                {/* Actions */}
                <div className="mt-6 flex justify-end gap-4">
                    <button
                        className="bg-gray-700 rounded px-4 py-2  flex items-center gap-2 text-transparent"
                    >
                        <FaEdit /> Edit
                    </button>
                    <button
                        className="bg-gray-700 text-transparent px-4 py-2 rounded flex items-center gap-2"
                    >
                        <FaTrashAlt /> Delete
                    </button>
                </div>
            </div>
            {/* 2 */}
            <div  className="bg-white rounded-lg shadow-md overflow-hidden p-4">
                {/* Images */}
                <div className="flex gap-2 overflow-x-auto scroll-auto pb-2">
                    <div className="h-28 w-36 object-cover rounded bg-gray-700 ">

                    </div>
                </div>

                {/* Story Info */}
                <div className="mt-4">
                    <h2 className="text-xl bg-gray-700 rounded font-bold text-transparent">title</h2>
                    <p className="bg-gray-700 rounded mt-2 text-transparent">Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus minus mollitia soluta. Ipsam, commodi! Sit aliquam beatae quis error enim ea eos, fugiat libero odio quaerat minima saepe eius optio.</p>

                    <p className="text-sm text-transparent mt-2 flex items-center bg-gray-700 rounded">
                        <FaMapMarkerAlt className="mr-1" /> location
                    </p>

                    <div className="mt-3 flex flex-wrap gap-2 text-sm">
                        <span className="bg-gray-700 rounded px-2 py-1  flex items-center gap-1 text-transparent">
                            <FaTag /> nine
                        </span>
                    </div>
                </div>

                {/* Actions */}
                <div className="mt-6 flex justify-end gap-4">
                    <button
                        className="bg-gray-700 rounded px-4 py-2  flex items-center gap-2 text-transparent"
                    >
                        <FaEdit /> Edit
                    </button>
                    <button
                        className="bg-gray-700 text-transparent px-4 py-2 rounded flex items-center gap-2"
                    >
                        <FaTrashAlt /> Delete
                    </button>
                </div>
            </div>
            {/* 3 */}
            <div  className="bg-white rounded-lg shadow-md overflow-hidden p-4">
                {/* Images */}
                <div className="flex gap-2 overflow-x-auto scroll-auto pb-2">
                    <div className="h-28 w-36 object-cover rounded bg-gray-700 ">

                    </div>
                </div>

                {/* Story Info */}
                <div className="mt-4">
                    <h2 className="text-xl bg-gray-700 rounded font-bold text-transparent">title</h2>
                    <p className="bg-gray-700 rounded mt-2 text-transparent">Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus minus mollitia soluta. Ipsam, commodi! Sit aliquam beatae quis error enim ea eos, fugiat libero odio quaerat minima saepe eius optio.</p>

                    <p className="text-sm text-transparent mt-2 flex items-center bg-gray-700 rounded">
                        <FaMapMarkerAlt className="mr-1" /> location
                    </p>

                    <div className="mt-3 flex flex-wrap gap-2 text-sm">
                        <span className="bg-gray-700 rounded px-2 py-1  flex items-center gap-1 text-transparent">
                            <FaTag /> nine
                        </span>
                    </div>
                </div>

                {/* Actions */}
                <div className="mt-6 flex justify-end gap-4">
                    <button
                        className="bg-gray-700 rounded px-4 py-2  flex items-center gap-2 text-transparent"
                    >
                        <FaEdit /> Edit
                    </button>
                    <button
                        className="bg-gray-700 text-transparent px-4 py-2 rounded flex items-center gap-2"
                    >
                        <FaTrashAlt /> Delete
                    </button>
                </div>
            </div>
        </div>
    </section>
};

export default MSLoader;