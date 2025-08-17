import React, { useState } from 'react';
import {
    CardElement,
    useElements,
    useStripe
} from '@stripe/react-stripe-js';
import useaxiosInstance from '../../../Hooks/useAxiosInstance';
import { useNavigate, useParams } from 'react-router';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import { useQuery } from '@tanstack/react-query';
import useAuth from '../../../Hooks/useAuth';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';

const PaymentForm = () => {
    const { user } = useAuth()
    const stripe = useStripe();
    const elements = useElements();
    const axiosInstance = useaxiosInstance();
    const axiosSecure = useAxiosSecure()
    const { bookingId } = useParams(); // Booking ID
    const [processing, setProcessing] = useState(false);

    const navigate = useNavigate()

    // //console.log(bookingId)

    const { data: bookingInfo, isPending, isLoading } = useQuery({
        queryKey: ['bookings', bookingId],
        queryFn: async () => {
            const res = await axiosSecure.get(`/bookings/${bookingId}`);
            return res?.data
        }
    })

    if (isPending || isLoading) {
        return 'loading....'
    }
    // //console.log(bookingInfo)

    const amount = bookingInfo?.price
    // const amountInCents = parseInt(amount) * 100
    const amountInCents = amount * 100

    // //console.log(typeof(amountInCents))
    // //console.log(amountInCents)

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!stripe || !elements) return;

        setProcessing(true);

        const card = elements.getElement(CardElement)

        if (!card) {
            return
        }

        // 2. Confirm the card payment
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card
        })

        if (error) {
            toast(error.message);
        }
        // else {
        //     //console.log(paymentMethod)
        // }

        // create payment intent
        const res = await axiosInstance.post('/create-payment-intent', {
            amountInCents,
            bookingId,
            paymentMethod
        })

        const clientSecret = res.data.clientSecret;

        const result = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                name: user.displyName
            }
        });

        if (result.error) {
            toast(result.error)
        } else {
            if (result.paymentIntent.status === 'succeeded') {

                const res = await axiosInstance.patch(`/bookings/payment-success/${bookingId}`);

                //console.log(res.data)
                if (res.data.matchedCount) {
                    Swal.fire({
                        title: '✅ Payment Successful',
                        text: 'Your booking is now under review.',
                        icon: 'success',
                        confirmButtonText: 'Go to My Bookings'
                    }).then(result => {
                        if (result.isConfirmed) {
                            navigate('/deshboard/myBookings')
                        }
                    });
                }

            }
        }


        //console.log(result)

        //console.log(res)
        setProcessing(false);
    };

    return (
        <div className='min-h-screen border flex flex-col justify-center '>
            <div className=" md:min-w-xl mx-auto flex flex-col">
                <h2 className="text-2xl font-bold text-light mb-6">Complete Payment</h2>
                <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 shadow rounded">
                    <CardElement
                        options={{
                            style: {
                                base: {
                                    fontSize: '16px',
                                    color: '#32325d',
                                    '::placeholder': {
                                        color: '#aab7c4'
                                    }
                                },
                                invalid: {
                                    color: '#fa755a'
                                }
                            }
                        }}
                    />
                    <button
                        type="submit"
                        disabled={!stripe}
                        className="w-full bg-[#00A99D] text-light py-2 rounded font-semibold hover:bg-[#00796b] transition"
                    >
                        {processing ? 'Processing...' : `Pay Now ${amount} BDT`}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default PaymentForm;
