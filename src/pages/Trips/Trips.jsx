import React from 'react';
import { Link } from 'react-router';
// import { useQuery } from '@tanstack/react-query';
// import useaxiosInstance from '../../Hooks/useaxiosInstance';
import { useQuery } from '@tanstack/react-query';
// import useaxiosInstance from '../../Hooks/useAxiosInstance';
import useAxiosSecure from '../../Hooks/useAxiosSecure';

const Trips = () => {
    const axiosSecure=useAxiosSecure()

    // // Fetch packages
    const { data: packages = [], isLoading } = useQuery({
        queryKey: ['all-packages'],
        queryFn: async () => {
            const res = await axiosSecure.get('/packages');
            return res.data;
        }
    });

    if (isLoading) {
        return <p className="text-center py-20 text-light3">Loading packages...</p>;
    }

    // const packages = [
    //     {
    //         _id: '1',
    //         title: 'Explore the Sundarbans',
    //         tourType: 'Adventure',
    //         price: 150,
    //         image: photo
    //     },
    //     {
    //         _id: '2',
    //         title: 'Cox’s Bazar Sea Beach',
    //         tourType: 'Relaxation',
    //         price: 120,
    //         image: photo
    //     },
    //     {
    //         _id: '3',
    //         title: 'Sylhet Tea Garden Tour',
    //         tourType: 'Nature',
    //         price: 100,
    //         image: photo
    //     },
    //     {
    //         _id: '4',
    //         title: 'Saint Martin’s Island Getaway',
    //         tourType: 'Beach',
    //         price: 180,
    //         image: photo
    //     },
    //     {
    //         _id: '5',
    //         title: 'Bandarban Hill Trek',
    //         tourType: 'Trekking',
    //         price: 130,
    //         image: photo
    //     },
    //     {
    //         _id: '6',
    //         title: 'Historical Dhaka City Tour',
    //         tourType: 'Cultural',
    //         price: 90,
    //         image: photo
    //     }
    // ];

    return (
        <section className="max-w-7xl mx-auto px-4  py-16">
            <title>
                DanaFly - Trips
            </title>
            <h2 className="text-xl md:text-3xl font-bold text-light mb-10">Explore All Trips</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {packages.map(pkg => (
                    <div key={pkg._id} className="bg-p1 btn-border3 rounded-lg shadow-sm overflow-hidden shadow-violet-500">
                        <img
                            src={pkg?.photo}
                            alt={pkg.packageName}
                            className="h-48 w-full object-cover"
                        />
                        <div className="p-4">
                            <p className="text-sm text-gray-500 mb-1 uppercase">{pkg.type}</p>
                            <h3 className="text-xl font-semibold text-lightmb-2">{pkg.packageName}</h3>
                            <p className="text-light font-bold mb-4">${pkg.price}</p>
                            <Link to={`/packageDetails/${pkg._id}`}>
                                <button
                                    className="px-4 py-2 cta-btn text-light rounded hover:bg-[#00796b] transition text-sm md:text-lg">
                                    View Details
                                </button>
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Trips;
