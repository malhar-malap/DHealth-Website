import React from 'react';
import { Link } from 'react-router-dom';
import { FiTarget, FiEye, FiAward } from 'react-icons/fi';

const AboutUsPage = () => {
  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-gray-900 via-gray-900 to-[#d8572a]/10 pb-20">
      {/* Hero Section */}
      <section className="relative pt-24 pb-32 overflow-hidden bg-gray-900">
        <div className="absolute inset-0 bg-gradient-to-br from-[#d8572a]/5 via-[#d8572a]/5 to-transparent -z-10"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-[#E3FCF9] border border-[#f7b538]/30 mb-8">
            <span className="flex h-2 w-2 rounded-full bg-[#db7c26]"></span>
            <span className="text-sm font-semibold text-[#3a5578] uppercase tracking-wider">Dhumavati Consulting LLP</span>
          </div>
          <h1 className="text-3xl md:text-5xl lg:text-7xl font-black text-white tracking-tight mb-8 leading-tight">
            Bridging the Gap in <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#db7c26] to-[#d8572a]">
              Healthcare Real Estate
            </span>
          </h1>
          <p className="text-xl text-gray-400 max-w-4xl mx-auto mb-10 leading-relaxed font-medium">
            We work with buyers, sellers, lessors, and lessees to find the best fit. It is known that the process of buying, selling, and even leasing hospitals can be laborious and this is where we step in! We do so by bridging the gap between the Buyer / lessee and Sellers / lessors by creating impeccable processes, so that each client shall get the best result.
          </p>
          <p className="text-xl text-gray-400 max-w-4xl mx-auto mb-10 leading-relaxed font-medium">
            We aim to keep hospitals operational, so they can be utilized for the benefit of mankind. Therefore, we persistently look for the right buyers / lessee and sellers / lessors of hospitals in order to create a seamless transaction between the two sides.
          </p>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 mb-24 relative z-20">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-gray-900 p-10 rounded-3xl shadow-sm border border-gray-800 transition-transform hover:-translate-y-2 duration-300">
            <div className="w-14 h-14 bg-[#f7b538]/30 rounded-2xl flex items-center justify-center mb-6">
              <FiEye className="text-[#db7c26] text-2xl" />
            </div>
            <h2 className="text-2xl font-black text-white mb-4">Our Vision</h2>
            <p className="text-gray-400 leading-relaxed font-medium">
              Be the India's most sought after platform for buying and selling of Healthcare companies.
            </p>
          </div>

          <div className="bg-gray-900 p-10 rounded-3xl shadow-sm border border-gray-800 transition-transform hover:-translate-y-2 duration-300">
            <div className="w-14 h-14 bg-[#f7b538]/20 rounded-2xl flex items-center justify-center mb-6">
              <FiTarget className="text-[#db7c26] text-2xl" />
            </div>
            <h2 className="text-2xl font-black text-white mb-4">Our Mission</h2>
            <ul className="text-gray-400 leading-relaxed font-medium space-y-2 list-disc pl-5">
              <li>Affordable healthcare for all.</li>
              <li>Connecting People to create a win-win situation for all.</li>
              <li>Restart all closed hospitals.</li>
            </ul>
          </div>

          <div className="bg-gray-900 p-10 rounded-3xl shadow-sm border border-gray-800 transition-transform hover:-translate-y-2 duration-300">
            <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center mb-6">
              <FiAward className="text-blue-600 text-2xl" />
            </div>
            <h2 className="text-2xl font-black text-white mb-4">Our Values</h2>
            <ul className="text-gray-400 leading-relaxed font-medium space-y-2 list-disc pl-5">
              <li>Honesty</li>
              <li>Strategic Thinking</li>
              <li>Innovation</li>
            </ul>
          </div>
        </div>
      </section>

      {/* CEO Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <div className="bg-gray-900 rounded-[2.5rem] p-8 md:p-16 shadow-lg border border-gray-800 flex flex-col md:flex-row items-center gap-12">
          <div className="w-full md:w-1/3 flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-[#d8572a] to-[#d8572a] rounded-full blur-2xl opacity-40"></div>
              <img 
                src="/images/manas_survee.jpg" 
                alt="Manas Survee - CEO" 
                className="relative z-10 w-48 h-48 md:w-64 md:h-64 object-cover rounded-full border-4 border-gray-900 shadow-xl"
                onError={(e) => { e.target.src = 'https://ui-avatars.com/api/?name=Manas+Survee&background=0D8ABC&color=fff&size=256' }}
              />
            </div>
          </div>
          <div className="w-full md:w-2/3">
            <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-[#E3FCF9] text-[#3a5578] font-bold text-xs uppercase tracking-widest mb-4">
              Leadership
            </div>
            <h2 className="text-4xl font-black text-white mb-2">Manas Survee</h2>
            <h3 className="text-xl text-[#db7c26] font-bold mb-6">CEO of Dhumavati Consulting LLP</h3>
            <p className="text-gray-400 text-lg leading-relaxed font-medium">
              He has over 16 years of experience in Real Estate and Finance. The years have added to the expertise he has in the field. In his time of work, he has handled various large projects benefitting groups of people at the same time. Through this platform, he aims to facilitate the exchange of opportunities between investors and buyers of hospitals. He is a delight to work with and happens to be great at managing people and closing deals!
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-[#191c1e] to-[#2a3033] rounded-[2.5rem] p-12 text-center relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#d8572a]/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#d8572a]/10 rounded-full blur-3xl"></div>
          
          <div className="relative z-10">
            <h2 className="text-3xl md:text-5xl font-black text-white mb-6">Ready to shape the future of healthcare?</h2>
            <p className="text-gray-400 text-lg mb-10 max-w-2xl mx-auto">
              This website is owned by Dhumavati Consulting LLP. Join our platform to access exclusive healthcare opportunities.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
              <Link to="/register" className="btn bg-gradient-to-r from-[#db7c26] to-[#d8572a] text-white px-8 py-4 rounded-xl font-bold text-lg w-full sm:w-auto shadow-lg shadow-[#db7c26]/30 hover:shadow-[#db7c26]/50 transition-all hover:-translate-y-1">
                Join the Network
              </Link>
              <Link to="/listings" className="px-8 py-4 rounded-xl font-bold text-lg text-white bg-gray-900/10 hover:bg-gray-900/20 transition-all w-full sm:w-auto backdrop-blur-md">
                Browse Listings
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUsPage;





