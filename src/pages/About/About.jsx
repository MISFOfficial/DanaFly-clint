import React from 'react';
import { FaGithub, FaExternalLinkAlt, FaMapMarkerAlt, FaEnvelope } from 'react-icons/fa';
import { GiSkills } from 'react-icons/gi';

const projects = [
    {
        id: 1,
        name: 'Parcel Management System',
        live: 'https://parcel-management-project.vercel.app/',
        client: 'https://github.com/muksitul-dev/parcel-management-client',
        server: 'https://github.com/muksitul-dev/parcel-management-server',
    },
    {
        id: 2,
        name: 'Tourist Guide (this site)',
        live: 'https://your-tour-guide-site.vercel.app/',
        client: 'https://github.com/muksitul-dev/tourist-guide-client',
        server: 'https://github.com/muksitul-dev/tourist-guide-server',
    },
    {
        id: 3,
        name: 'Restaurant Management',
        live: 'https://restaurant-dashboard-app.vercel.app/',
        client: 'https://github.com/muksitul-dev/restaurant-dashboard-client',
        server: 'https://github.com/muksitul-dev/restaurant-dashboard-server',
    },
    {
        id: 4,
        name: 'Tourist Management',
        live: 'https://tourist-mgmt-site.vercel.app/',
        client: 'https://github.com/muksitul-dev/tourist-management-client',
        server: 'https://github.com/muksitul-dev/tourist-management-server',
    },
];

const About = () => {
    return (
        <div className="max-w-6xl mx-auto px-4 py-16">
            <title>DanaFly - About us</title>
            <h1 className="text-xl md:text-4xl font-bold text-light mb-6">About the Developer</h1>

            {/* Personal Info */}
            <div className="bg-white border-t-6 border-[#00A99D] rounded-xl shadow-lg p-6 md:p-10 mb-12">
                <h2 className="text-lg md:text-2xl font-semibold mb-3">👋 Hello, I'm <span className="text-light">Muksitul Islam</span></h2>
                <p className="text-gray-700 leading-relaxed text-sm md:text-lg">
                    I am a self-motivated full-stack web developer specialized in building efficient, scalable, and modern web applications using the <strong>MERN Stack</strong>. I thrive on solving real-world problems with clean code and intuitive design.
                </p>
                <p className="mt-4 text-gray-700 text-sm md:text-lg">
                    I'm always eager to learn new technologies and collaborate on innovative projects. I have completed several full-stack projects including dashboard systems, parcel tracking, restaurant apps, and travel management platforms.
                </p>

                <div className="mt-6 space-y-2 text-gray-600 text-[12px] md:text-lg">
                    <p className="flex items-center gap-2"><FaEnvelope className="text-light" /> <strong>Email:</strong> muksitul44@gmail.com</p>
                    <p className="flex items-center gap-2"><FaMapMarkerAlt className="text-light" /> <strong>Location:</strong>Dhaka, Bangladesh</p>
                    <p><strong className='flex items-center gap-2'><GiSkills className="text-light"></GiSkills> Skills:</strong></p>
                    <div className="flex flex-wrap gap-2 mt-2">
                        {[
                            'React', 'Node.js', 'MongoDB', 'Express.js', 'Firebase',
                            'Tailwind CSS', 'JWT', 'Stripe', 'React Router', 'Axios', 'Framer Motion', 'Lottie', 'React Query'
                        ].map((tech, idx) => (
                            <span key={idx} className="bg-[#00A99D]/10 text-[#00796b] px-3 py-1 rounded-full text-sm">
                                {tech}
                            </span>
                        ))}
                    </div>
                </div>
            </div>

            {/* Projects Section */}
            <div className="bg-white rounded-xl shadow-lg p-6 md:p-10">
                <h2 className=" text-lg md:text-2xl font-semibold text-light mb-4">🚀 My Projects</h2>
                <ul className="space-y-6">
                    {projects.map(project => (
                        <li key={project.id} className="border-l-4 border-[#00A99D] rounded-md pl-4">
                            <h3 className=" text-sm md:text-lg font-bold">{project.name}</h3>
                            <div className="flex flex-wrap gap-4 text-sm mt-2">
                                <a
                                    href={project.live}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-1 text-light hover:underline"
                                >
                                    <FaExternalLinkAlt /> Live Site
                                </a>
                                <a
                                    href={project.client}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-1 text-gray-700 hover:underline"
                                >
                                    <FaGithub /> Client Repo
                                </a>
                                <a
                                    href={project.server}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-1 text-gray-700 hover:underline"
                                >
                                    <FaGithub /> Server Repo
                                </a>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default About;
