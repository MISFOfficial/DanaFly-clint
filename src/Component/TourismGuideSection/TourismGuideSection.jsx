import React from 'react';
import { Link } from 'react-router';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { useQuery } from '@tanstack/react-query';
// import useAxiosInstance from '../../Hooks/useAxiosInstance';
import useAxiosSecure from '../../Hooks/useAxiosSecure';


const TourismGuideSection = () => {
  // const navigate = useNavigate();
  const axiosSecure=useAxiosSecure()

  const { data: packages = [], isLoading: loadingPackages } = useQuery({
    queryKey: ['randomPackages'],
    queryFn: async () => {
      const res = await axiosSecure.get('/api/random-packages');
      return res.data;
    },
  });

  const { data: guides = [], isLoading: loadingGuides } = useQuery({
    queryKey: ['randomGuides'],
    queryFn: async () => {
      const res = await axiosSecure.get('/api/random-guides');
      return res.data;
    },
  });

  //console.log(guides)

  return (
    <section className="max-w-7xl mx-auto px-4 py-16">
      <h2 className="text-xl md:text-3xl font-bold text-light mb-8">Tourism & Travel Guide</h2>

      <Tabs>
        <TabList className="flex gap-6 mb-8 border-b border-gray-200">
          <Tab className="cursor-pointer py-2 px-4 text-sm md:text-lg text-gray-700 border-b-2 border-transparent   hover:border-[#00A99D] focus:outline-none focus:border-[#00A99D]">
            Our Packages
          </Tab>
          <Tab className=" cursor-pointer py-2 px-4 text-sm md:text-lg text-gray-700 border-b-2 border-transparent hover:border-white focus:outline-none focus:border-[#00A99D]">
            Meet Our Tour Guides
          </Tab>
        </TabList>

        {/* Packages Tab */}
        <TabPanel>
          {loadingPackages ? (
            <p>Loading packages...</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {packages.map(pkg => (
                <div key={pkg._id} className="bg-white shadow-md rounded-lg overflow-hidden">
                  <img src={pkg.photo} alt={pkg.title} className="w-full h-40 object-cover" />
                  <div className="p-5">
                    <h4 className="text-sm text-gray-500 mb-1">{pkg.type}</h4>
                    <h3 className="text-lg font-bold text-light mb-2">{pkg.packageName}</h3>
                    <p className="text-gray-700 mb-4">Price: ${pkg.price}</p>

                    <Link to={`/packageDetails/${pkg._id}`}>
                      <button
                        className="px-4 py-2 bg-[#00A99D] text-light rounded-full hover:bg-[#00796b] transition text-sm  md:text-lg"
                      >
                        View Details
                      </button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </TabPanel>

        {/* Guides Tab */}
        <TabPanel>
          {loadingGuides ? (
            <p>Loading guides...</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {guides.map(guide => (
                <div key={guide._id} className="bg-white shadow-md rounded-lg p-4 flex flex-col items-center text-center">
                  <img src={guide.photo} alt={guide.name} className="w-32 h-32 object-cover rounded-full mb-4" />
                  <h3 className="text-xl font-semibold text-light mb-2">{guide.name}</h3>
                  <p className="text-gray-600 mb-4">Experience {guide.experienceYears} years</p>
                  <Link to={`/guides_details/${guide._id}`}>
                    <button
                      className="px-4 py-2 bg-[#00A99D] text-light rounded-full hover:bg-[#00796b] transition text-sm md:text-lg"
                    >
                      View Details
                    </button>
                  </Link>
                </div>
              ))}
            </div>
          )}
        </TabPanel>
      </Tabs>
    </section>
  );
};

export default TourismGuideSection;
