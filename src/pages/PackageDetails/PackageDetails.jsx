import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import useAuth from '../../Hooks/useAuth';
import { HiCalendar, HiCheckCircle } from 'react-icons/hi';
import { useQuery } from '@tanstack/react-query';
import useaxiosInstance from '../../Hooks/useAxiosInstance';
import photo from '../../assets/slide3.jpeg';
import Swal from 'sweetalert2';
import { useForm } from 'react-hook-form';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import Confetti from 'react-confetti';
// import { useWindowSize } from 'react-use';

const PackageDetails = () => {
    const navigate = useNavigate();
    const { user } = useAuth();
    const { id } = useParams();
    const axiosInstance = useaxiosInstance();
    const axiosSecure = useAxiosSecure();
    const { register, handleSubmit } = useForm();

    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedGuide, setSelectedGuide] = useState('');
    const [isLightboxOpen, setIsLightboxOpen] = useState(false);
    const [photoIndex, setPhotoIndex] = useState(0);

    const [showConfetti, setShowConfetti] = useState(false);

    // const { width, height } = useWindowSize();

    const { data: packagesData, isLoading: packagesDataLoading } = useQuery({
        queryKey: ['packageData', id],
        queryFn: async () => {
            const res = await axiosSecure.get(`/packages/${id}`);
            return res.data;
        },
    });

    const { data: tourGuides = [], isLoading: guidesLoading } = useQuery({
        queryKey: ['users/tour-guide'],
        queryFn: async () => {
            const res = await axiosSecure.get('/active-tour-guides');
            return res.data;
        },
    });

    const { data: bookingCount = 0, refetch } = useQuery({
        queryKey: ['userBookingCount', user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosInstance.get(`/bookings/count?email=${user.email}`);
            return res.data.count;
        }
    });

    //console.log(bookingCount)
    useEffect(() => {
        if (bookingCount > 3) {
            setShowConfetti(true);
            const timer = setTimeout(() => {
                setShowConfetti(false);
            }, 6000); // 6 seconds

            return () => clearTimeout(timer); // cleanup on unmount
        }
    }, [bookingCount]);

    const handleBookingSubmit = async (data) => {
        if (!user) {
            Swal.fire('Please log in first!');
            navigate('/login');
            return;
        }
        try {
            const selectedGuideObj = tourGuides.find((g) => g._id === selectedGuide);

            const bookingData = {
                ...data,
                packageId: id,
                touristImage: user?.photoURL,
                tourDate: selectedDate,
                guideId: selectedGuide,
                guideEmail: selectedGuideObj?.email || '',
                status: 'pending',
                paymentStatus: 'unpaid',
                createdAt: new Date().toISOString(),
            };

            const res = await axiosInstance.post('/bookings', bookingData);
            refetch();
            
            if (res.data.insertedId) {
                Swal.fire({
                    title: '🎉 Booking Confirmed!',
                    text: 'Your booking is pending approval.',
                    icon: 'success',
                    showCancelButton: true,
                    confirmButtonText: 'Go to My Bookings',
                    cancelButtonText: 'Stay Here',
                }).then((result) => {
                    if (result.isConfirmed) {
                        navigate('/deshboard/myBookings');
                    }
                });
            }
        } catch (error) {
            Swal.fire('Booking failed', error.message, 'error');
        }
    };

    if (packagesDataLoading || guidesLoading) return <p>Loading...</p>;

    return (
        <section className="flex flex-col-reverse min-h-screen relative">
            <title>DanaFly - packages</title>

            {showConfetti && (
                <div className='h-full z-999'>
                    <Confetti
                        className='w-full h-full z-999'
                        recycle={false}
                        numberOfPieces={500}
                    />
                    <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-[1000] bg-white shadow-xl border-4 border-[#00A99D] px-6 py-4 rounded-2xl text-center animate-bounce max-w-xs sm:max-w-md">
                        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#00A99D] mb-2">🎉 Congratulations!</h2>
                        <p className="text-gray-800 text-sm sm:text-md md:text-lg">
                            You’ve booked more than 3 tours! Thanks for being an awesome explorer 🧳✨
                        </p>
                    </div>
                </div>
            )}

            <div className='bg-gray-100 rounded-t-[50px] -mt-20 z-[10]'>
                <div className='w-full max-w-[1280px] mx-auto space-y-12 py-16 px-4 sm:px-6 md:px-8 rounded-2xl'>

                    {/* Photo Gallery */}
                    <div className='justify-items-center'>
                        <div className='w-full'>
                            <h3 className="text-lg md:text-4xl text-[#00A99D] font-bold mb-4">Photo Gallery</h3>
                        </div>
                        <div className='flex flex-wrap gap-3 justify-center border-4 md:border-8 rounded-2xl border-[#00A99D] p-3 w-full max-w-full'>
                            {packagesData.photo?.slice(0, 6).map((src, index) => (
                                <img
                                    key={index}
                                    src={src}
                                    alt={`Gallery ${index + 1}`}
                                    onClick={() => {
                                        setPhotoIndex(index);
                                        setIsLightboxOpen(true);
                                    }}
                                    className="rounded-lg object-cover w-24 h-24 md:w-48 md:h-48 cursor-pointer hover:scale-105 transition-transform"
                                />
                            ))}
                        </div>
                        <Lightbox
                            open={isLightboxOpen}
                            close={() => setIsLightboxOpen(false)}
                            index={photoIndex}
                            slides={packagesData.photo?.map((src) => ({ src }))}
                            animation={{ fade: 250 }}
                        />
                        <div className='flex justify-center mt-10'>
                            <Link to='/'>
                                <button className='border-4 border-[#00A99D] bg-[#00A99D] text-white px-5 py-2 cursor-pointer rounded-3xl text-sm md:text-lg'>See more</button>
                            </Link>
                        </div>
                    </div>

                    {/* About Tour */}
                    <div>
                        <h3 className="text-lg md:text-2xl font-semibold mb-3">About The Tour</h3>
                        <p className="text-gray-700 text-sm md:text-lg">{packagesData.about}</p>
                    </div>

                    {/* Tour Plan */}
                    <div>
                        <h3 className="text-lg md:text-2xl font-semibold mb-4">Tour Plan</h3>
                        <div className="grid gap-4 grid-cols-1">
                            {[packagesData.day1, packagesData.day2, packagesData.day3].map((activity, index) => (
                                <div key={index} className="flex items-start gap-4 bg-white shadow-md p-4 rounded-lg border-l-4 border-[#00A99D]">
                                    <div className="text-[#00A99D] text-lg md:text-2xl mt-1"><HiCalendar /></div>
                                    <div>
                                        <h4 className="text-lg font-semibold text-gray-800 mb-1">Day {index + 1}</h4>
                                        <p className="text-gray-600 flex items-center gap-2 text-sm md:text-lg">
                                            <HiCheckCircle className="text-[#00A99D]" /> {activity}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Tour Guides */}
                    <div>
                        <h3 className="text-lg md:text-2xl font-semibold mb-6">Meet Our Tour Guides</h3>
                        <div className="flex gap-4 overflow-x-auto  pb-2 scrollbar-thin scrollbar-thumb-[#00A99D]/60 scrollbar-track-transparent">
                            {tourGuides.map((guide) => (
                                <button
                                    key={guide._id}
                                    onClick={() => navigate(`/guides_details/${guide._id}`)}
                                    className="flex-shrink-0 min-w-[12rem] p-2 md:p-4 bg-[#00A99D] rounded-lg shadow hover:bg-white hover:text-black text-white transition text-center text-sm md:text-lg"
                                >
                                    {guide.name}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Booking Form */}
                    <form onSubmit={handleSubmit(handleBookingSubmit)} className="bg-white border-t-6 border-[#00A99D] p-6 rounded-lg shadow space-y-4">
                        <h3 className="text-2xl font-semibold text-center mb-4">Book This Package</h3>

                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-5">
                            <input {...register("packageName")} readOnly value={packagesData.packageName} className="w-full bg-gray-100 border px-3 py-2 rounded text-sm sm:text-base" />
                            <input {...register("touristName")} readOnly value={user?.displayName || ''} className="w-full bg-gray-100 border px-3 py-2 rounded text-sm sm:text-base" />
                            <input {...register("touristEmail")} readOnly value={user?.email || ''} className="w-full bg-gray-100 border px-3 py-2 rounded text-sm sm:text-base" />
                            <input {...register("touristImage")} readOnly value={user?.photoURL || ''} className="w-full bg-gray-100 border px-3 py-2 rounded text-sm sm:text-base" />
                            <div className='flex gap-2 items-center'>
                                <h1 className='border bg-gray-100 px-3 py-2 rounded text-sm sm:text-base'>BDT</h1>
                                <input {...register("price")} readOnly value={packagesData.price} className="w-full bg-gray-100 border px-3 py-2 rounded text-sm sm:text-base" />
                            </div>

                            <div>
                                <DatePicker
                                    selected={selectedDate}
                                    onChange={(date) => setSelectedDate(date)}
                                    minDate={new Date()}
                                    placeholderText="Select Tour Date"
                                    className="w-full border px-3 py-2 rounded text-sm sm:text-base"
                                    required
                                />
                            </div>
                        </div>

                        <select
                            value={selectedGuide}
                            onChange={(e) => setSelectedGuide(e.target.value)}
                            className="w-full border px-3 py-2 rounded text-sm sm:text-base"
                            required
                        >
                            <option value="">Select a Guide</option>
                            {tourGuides.map((guide) => (
                                <option key={guide._id} value={guide._id}>{guide.name}</option>
                            ))}
                        </select>

                        <button
                            type="submit"
                            className="w-full text-sm md:text-lg bg-[#00A99D] text-white font-semibold py-3 rounded hover:bg-[#00796b] transition"
                        >
                            Book Now
                        </button>
                    </form>
                </div>
            </div>

            <div className="relative h-60 md:h-[25rem]">
                <img className="h-full w-full object-cover" src={photo} alt="Package Banner" />
                <div className='absolute top-0 h-full w-full bg-[#00000046] flex items-center justify-center'>
                    <h1 className='text-white -mt-20 text-md md:text-4xl font-bold border-4 p-4'>Our Packages</h1>
                </div>
            </div>
        </section>
    );
};

export default PackageDetails;
