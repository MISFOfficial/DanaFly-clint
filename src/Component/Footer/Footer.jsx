import React from 'react';
import { Link } from 'react-router';
import Logo from '../Navigation/Logo';
import {  FaGithub, FaLinkedinIn, FaYoutube } from 'react-icons/fa';
// Adjust if needed

const Footer = () => {
    return (
        <footer className="bg-gray-200 py-10 ">
            <div className="max-w-7xl mx-auto px-4 pt-5 grid grid-cols-1 md:grid-cols-3 gap-10">
                {/* Logo */}
                <div className="flex flex-col items-start">
                    <Logo></Logo>
                    <p className="mt-3 text-sm text-gray-600">
                        Your trusted travel partner across Bangladesh. Explore more with DanaFly.
                    </p>
                </div>

                {/* Navigation Links */}
                <div>
                    <h3 className="text-lg font-semibold text-light mb-4">Quick Links</h3>
                    <ul className="space-y-2 text-sm text-gray-700">
                        <li><Link to="/" className="hover:text-light">Home</Link></li>
                        <li><Link to="/trips" className="hover:text-light">Tour Packages</Link></li>
                        <li><Link to="/community" className="hover:text-light">Community</Link></li>
                        <li><Link to="/about" className="hover:text-light">About Us</Link></li>
                    </ul>
                </div>

                {/* Email Report Form */}
                <div>
                    <h3 className="text-lg font-semibold text-light mb-4">Report or Feedback</h3>
                    <p className="text-sm text-gray-600 mb-3">
                        Found an issue or have suggestions? Send us an email.
                    </p>
                    <form action="mailto:muksitul44@gmail.com" method="GET">
                        <input
                            type="text"
                            name="subject"
                            placeholder="Your Subject"
                            className="w-full border border-gray-400 rounded px-3 py-2 mb-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#00A99D]"
                        />
                        <textarea
                            name="body"
                            placeholder="Your message..."
                            rows="3"
                            className="w-full border border-gray-400 rounded px-3 py-2 text-sm resize-none focus:outline-none focus:ring-1 focus:ring-[#00A99D]"
                        ></textarea>
                        <button
                            type="submit"
                            className="mt-3 px-4 py-2 bg-[#00A99D] text-light rounded hover:bg-[#00796b] text-sm"
                        >
                            Send Email
                        </button>
                    </form>
                </div>
            </div>

            <div className="mt-10 text-center text-gray-500 text-xl md:text-3xl flex items-center w-full justify-center gap-5">
                <a href="https://www.youtube.com/@misf-official" target='_blank' className='text-red-500'>
                    <FaYoutube></FaYoutube>
                </a>
                <a href="https://github.com/MISFOfficial" target='_blank' className='text-black'>
                    <FaGithub></FaGithub>
                </a>
                <a href="https://www.linkedin.com/in/msfofficial/" target='_blank' className='text-blue-500'>
                    <FaLinkedinIn></FaLinkedinIn>
                </a>
            </div>
            {/* Footer bottom text */}
            <div className="mt-5 text-center text-gray-500 text-sm">
                © {new Date().getFullYear()} DanaFly. All rights reserved. Dev by Muksitul Islam
            </div>

        </footer>
    );
};

export default Footer;
