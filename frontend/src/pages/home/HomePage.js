import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { listingsAPI, jobsAPI, masterAPI } from '../../services/api';
import { formatPrice } from '../../utils/formatPrice';
import { 
  FiSearch, 
  FiMapPin, 
  FiDollarSign, 
  FiActivity, 
  FiTool, 
  FiBriefcase,
  FiChevronRight,
  FiStar
} from 'react-icons/fi';

const HomePage = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [featuredListings, setFeaturedListings] = useState([]);
  const [featuredJobs, setFeaturedJobs] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);

  const carouselImages = [
    'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=2000', // Hospital Corridor
    'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&q=80&w=2000', // Pharmaceutical Labs
    'https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&q=80&w=2000', // Hospital Environment
    'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=2000', // Medical Professional
    'https://images.unsplash.com/photo-1587370560942-ad2a04eabb6d?auto=format&fit=crop&q=80&w=2000'  // Medical Equipment
  ];

  useEffect(() => {
    fetchInitialData();
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const fetchInitialData = async () => {
    try {
      const [listingsRes, jobsRes, categoriesRes] = await Promise.all([
        listingsAPI.getFeatured(),
        jobsAPI.getFeatured(),
        masterAPI.getCategories()
      ]);
      
      setFeaturedListings(listingsRes.data.data || []);
      setFeaturedJobs(jobsRes.data.data || []);
      setCategories(categoriesRes.data.data || []);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const query = searchQuery.trim();
    if (!query) return;

    // Smart Search: Check if the query matches a category name (case-insensitive)
    const matchedCategory = categories.find(c => 
      c.name.toLowerCase() === query.toLowerCase() || 
      query.toLowerCase().includes(c.name.toLowerCase().replace(' companies', ''))
    );

    if (matchedCategory) {
      navigate(`/listings?category=${matchedCategory.id}`);
    } else {
      navigate(`/listings?keyword=${encodeURIComponent(query)}`);
    }
  };



  const categoryIcons = {
    'Hospitals': FiActivity,
    'Pharma Companies': FiActivity,
    'Diagnostics': FiActivity
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-gray-900 via-gray-900 to-[#d8572a]/10">
      {/* Hero Section with Carousel */}
      <section className="relative h-[500px] md:h-[650px] overflow-hidden">
        {/* Background Carousel */}
        <div className="absolute inset-0 z-0">
          {carouselImages.map((img, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                index === currentSlide ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <div 
                className="absolute inset-0 bg-cover bg-center animate-carousel"
                style={{ backgroundImage: `url(${img})` }}
              />
              <div className="absolute inset-0 bg-gray-900/40/40" />
              <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-900/80 to-transparent" />
            </div>
          ))}
          {/* Colorful abstract shapes */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-br from-primary-500/20 to-secondary-500/20 rounded-full blur-3xl opacity-60 animate-pulse-slow mix-blend-screen translate-x-1/3 -translate-y-1/3"></div>
          <div className="absolute bottom-0 left-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-pink-500/20 to-primary-500/20 rounded-full blur-3xl opacity-60 animate-pulse-slow mix-blend-screen translate-y-1/3 -translate-x-1/2" style={{ animationDelay: '2s' }}></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-center">
          <div className="max-w-3xl hover-3d">
            <div className="hover-3d-child">
              <div className="inline-block px-4 py-2 bg-gradient-to-r from-primary-50 to-secondary-50 border border-primary-100 rounded-full text-primary-700 font-semibold text-sm mb-6 shadow-sm">
                <FiStar className="inline mr-2 text-yellow-500" />
                India's Most Trusted Healthcare Network
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-extrabold text-gray-100 mb-4 md:mb-6 leading-[1.1] tracking-tight">
                India's <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-secondary-600">Premier</span>
                <br /> Healthcare M&A Marketplace
              </h1>
              <p className="text-base md:text-xl text-gray-400 mb-6 md:mb-10 max-w-2xl font-medium leading-relaxed">
                We work with buyers, sellers, lessors, and lessees to find the best fit
              </p>

              {/* Glassmorphic Search Bar */}
              <div className="bg-gray-900/50 backdrop-blur-2xl p-2 rounded-3xl shadow-[0_8px_32px_rgba(216,87,42,0.15)] border border-white/10 max-w-2xl transition-all duration-500 hover:shadow-[0_8px_32px_rgba(216,87,42,0.25)] hover:border-[#d8572a]/30 group">
                <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-2">
                  <div className="flex-1 relative">
                    <FiSearch className="absolute left-5 top-1/2 transform -translate-y-1/2 text-primary-500 w-6 h-6" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search hospitals, labs, pharma..."
                      className="w-full pl-14 pr-4 py-4 bg-transparent text-gray-100 placeholder-gray-400 text-lg rounded-xl focus:outline-none transition-all font-medium"
                    />
                  </div>
                  <button
                    type="submit"
                    className="bg-gradient-to-r from-primary-600 to-secondary-600 hover:from-primary-700 hover:to-secondary-700 text-white px-6 md:px-10 py-3 md:py-4 rounded-xl font-bold text-base md:text-lg transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-primary-500/30"
                  >
                    Explore
                  </button>
                </form>
              </div>

              <div className="flex flex-wrap gap-2 md:gap-3 mt-6 md:mt-8">
                {[
                  { name: 'Hospitals', id: 1 }, 
                  { name: 'Diagnostic Centres', id: 3 }, 
                  { name: 'Pharma Companies', id: 2 }, 
                  { name: 'Dental Clinics', id: 4 },
                  { name: 'Pharmacies', id: 5 }
                ].map((tag) => (
                  <button 
                    key={tag.name}
                    onClick={() => navigate(`/listings?category=${tag.id}`)}
                    className="bg-gray-900/40/80 text-gray-300 hover:text-cyan-400 hover:bg-gray-900/40 px-5 py-2.5 rounded-full text-sm font-semibold cursor-pointer transition-all border border-gray-700/50 shadow-sm hover:shadow-md hover:border-primary-200"
                  >
                    {tag.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-2xl md:text-4xl font-extrabold text-gray-100 mb-4 tracking-tight">Browse by Specialized Category</h2>
            <div className="h-1.5 w-24 bg-gradient-to-r from-primary-500 to-secondary-500 mx-auto rounded-full" />
          </div>

          <div className="flex flex-wrap justify-center gap-4 md:gap-8">
            {[
              { id: 1, name: 'Hospitals', description: 'Institutional-grade healthcare opportunities and strategic placement.' },
              { id: 3, name: 'Diagnostic Centres', description: 'Advanced diagnostic and imaging centers.' },
              { id: 2, name: 'Pharma Companies', description: 'Pharmaceutical manufacturing and distribution.' },
              { id: 4, name: 'Dental Clinics', description: 'Specialized dental clinics and centers.' },
              { id: 5, name: 'Pharmacies', description: 'Retail pharmacies and medical stores.' }
            ].map((category) => {
              const IconComponent = categoryIcons[category.name] || FiActivity;
              return (
                <Link
                  key={category.id}
                  to={`/listings?category=${category.id}`}
                  className="group relative w-full sm:w-[calc(50%-0.5rem)] lg:w-[calc(33.333%-1.34rem)]"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-gray-800/50 to-gray-700/50 rounded-3xl blur opacity-0 group-hover:opacity-100 transition duration-500"></div>
                  <div className="bg-gray-900/50 border border-white/5 p-6 md:p-10 rounded-[2.5rem] h-full relative overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-[#d8572a]/15 transition-all duration-500 transform group-hover:-translate-y-2 group-hover:border-[#d8572a]/30 backdrop-blur-xl">
                    <div className="relative z-10">
                      <div className="w-16 h-16 bg-gradient-to-br from-gray-800 to-gray-900 border border-white/10 rounded-2xl flex items-center justify-center mb-8 shadow-[0_0_15px_rgba(0,0,0,0.5)] group-hover:border-[#d8572a]/50 group-hover:shadow-[0_0_20px_rgba(216,87,42,0.3)] transition-all duration-500 relative z-10">
                        <IconComponent className="w-8 h-8 text-primary-500 group-hover:scale-110 transition-transform duration-300" />
                      </div>
                      <h3 className="text-xl md:text-2xl font-bold text-gray-100 mb-3 tracking-tight transition-colors">
                        {category.name}
                      </h3>
                      <p className="text-gray-500 text-base leading-relaxed line-clamp-2">
                        {category.description || 'Institutional-grade healthcare opportunities and strategic placement.'}
                      </p>
                      <div className="mt-8 flex items-center w-fit px-4 py-2 rounded-lg bg-primary-900/40 text-primary-400 font-bold text-sm uppercase tracking-wider gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                        Explore Segment <FiChevronRight className="group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Listings - Clean Cards */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-b from-primary-900/20 to-transparent opacity-50 transform translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div>
              <h2 className="text-2xl md:text-4xl font-extrabold text-gray-100 mb-3 tracking-tight">Exclusive Opportunities</h2>
              <p className="text-lg text-gray-500">Hand-picked premium healthcare businesses for you.</p>
            </div>
            <Link 
              to="/listings" 
              className="px-6 py-3 bg-gray-900/50 text-[#db7c26] font-bold border border-white/10 rounded-2xl hover:border-[#d8572a]/40 hover:bg-[#d8572a]/10 hover:shadow-lg hover:shadow-[#d8572a]/20 transition-all flex items-center gap-2 backdrop-blur-md"
            >
              Explore All <FiChevronRight />
            </Link>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-gray-900/40 rounded-3xl h-[450px] shadow-sm skeleton" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredListings.map((listing) => (
                <Link
                  key={listing.id}
                  to={`/listings/${listing.id}`}
                  className="group"
                >
                  <div className="bg-gray-900/50 rounded-[2.5rem] border border-white/5 shadow-xl hover:shadow-2xl hover:shadow-[#d8572a]/15 hover:-translate-y-2 hover:border-[#d8572a]/30 transition-all duration-500 h-full flex flex-col overflow-hidden backdrop-blur-xl">
                    <div className="relative h-64 overflow-hidden">
                      {listing.primaryImage ? (
                        <img
                          src={listing.primaryImage}
                          alt={listing.displayTitle}
                          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-in-out"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
                          <FiActivity className="w-16 h-16 text-gray-300" />
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <div className="absolute top-4 left-4 flex gap-2">
                        {listing.isConfidential && (
                          <span className="bg-yellow-500 text-white text-[10px] uppercase tracking-wider px-3 py-1.5 rounded-lg font-bold shadow-sm">
                            Confidential
                          </span>
                        )}
                        <span className="bg-primary-600 text-white text-[10px] uppercase tracking-wider px-3 py-1.5 rounded-lg font-bold shadow-sm">
                          {listing.dealTypeName}
                        </span>
                      </div>
                    </div>
                    <div className="p-8 flex-1 flex flex-col">
                      <div className="flex items-center gap-2 mb-4">
                        <span className="text-primary-600 font-bold text-xs uppercase tracking-wider bg-primary-50 px-3 py-1 rounded-md">
                          {listing.categoryName} | {listing.dealType || listing.dealTypeName}
                        </span>
                        <span className="text-gray-400 text-sm font-medium flex items-center">
                          <FiMapPin className="inline mr-1 w-4 h-4" />{listing.cityName}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold text-gray-100 mb-4 line-clamp-2 group-hover:text-cyan-400 transition-colors leading-tight">
                        {listing.displayTitle}
                      </h3>

                      <div className="mb-4 space-y-1">
                        {listing.uniqueCode && (
                          <div className="text-xs text-gray-400 font-medium">
                            <span className="text-primary-500 font-bold">Code:</span> {listing.uniqueCode}
                          </div>
                        )}
                        {listing.categoryDetails && (
                            <div className="text-xs text-gray-400 font-medium line-clamp-2 leading-relaxed">
                              {listing.categoryName?.toLowerCase().includes('hospital') ? (
                                <>
                                  {listing.categoryDetails.landAreaSqft ? `Area: ${Number(listing.categoryDetails.landAreaSqft).toLocaleString('en-IN')} sq ft. | ` : ''}
                                  {listing.categoryDetails.numberOfBeds ? `Beds: ${listing.categoryDetails.numberOfBeds}` : ''}
                                </>
                              ) : listing.categoryName?.toLowerCase().includes('pharmac') ? (
                                <>
                                  {listing.categoryDetails.premisesType ? `Premises: ${listing.categoryDetails.premisesType} | ` : ''}
                                  {listing.categoryDetails.yearsInBusiness ? `Years: ${listing.categoryDetails.yearsInBusiness} | ` : ''}
                                  {listing.categoryDetails.carpetAreaSqft ? `Area: ${Number(listing.categoryDetails.carpetAreaSqft).toLocaleString('en-IN')} sq ft.` : ''}
                                  {listing.categoryDetails.oneLineDescription && <div className="mt-1 italic">{listing.categoryDetails.oneLineDescription}</div>}
                                </>
                              ) : null}
                            </div>
                        )}
                      </div>
                      
                      <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-800">
                        <div>
                          <p className="text-xs text-gray-500 font-medium mb-1 uppercase tracking-wider">Asking Price</p>
                          <div className="text-2xl font-extrabold text-gray-100">
                            {formatPrice(listing.askingPrice)}
                          </div>
                        </div>
                        <div className="w-12 h-12 bg-gray-900/40 border border-gray-800 text-primary-600 rounded-2xl flex items-center justify-center group-hover:bg-primary-600 group-hover:border-primary-600 group-hover:text-white transition-all duration-300 shadow-sm">
                          <FiChevronRight className="w-6 h-6" />
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
      {/* How It Works - Clean Steps */}
      <section className="py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-2xl md:text-4xl font-extrabold text-gray-100 mb-4 tracking-tight">Strategic Workflow</h2>
            <p className="text-lg text-gray-500">How we facilitate high-value healthcare transactions.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
            {/* Connecting Line */}
            <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-0.5 bg-gradient-to-r from-primary-100 via-secondary-100 to-primary-100 z-0"></div>
            
            {[
              { id: 1, title: 'Asset Curation', desc: 'Detail your hospital or pharma unit for our global network.' },
              { id: 2, title: 'Strategic Matching', desc: 'Our algorithm connects you with pre-verified institutional investors.' },
              { id: 3, title: 'Secure Closure', desc: 'Navigate negotiations and close deals with our secure advisory layer.' }
            ].map((step) => (
              <div key={step.id} className="text-center relative z-10 group">
                <div className="w-24 h-24 bg-gray-900/80 border border-white/10 rounded-full flex items-center justify-center mx-auto mb-8 relative shadow-xl group-hover:shadow-[0_0_30px_rgba(216,87,42,0.25)] group-hover:-translate-y-3 group-hover:border-[#d8572a]/40 transition-all duration-500 backdrop-blur-md">
                  <div className="absolute inset-2 bg-gradient-to-br from-primary-50 to-secondary-50 rounded-full flex items-center justify-center">
                    <span className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-secondary-600">{step.id}</span>
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-gray-100 mb-4">{step.title}</h3>
                <p className="text-gray-500 leading-relaxed font-medium">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Elite Healthcare Careers - Clean Redesign */}
      <section className="py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
            <div className="max-w-2xl">
              <div className="inline-block bg-gray-900/40 border border-gray-700 px-4 py-1.5 rounded-full text-primary-600 font-bold text-xs uppercase tracking-wider mb-4 shadow-sm">
                Placements & Careers
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-100 tracking-tight leading-[1.1] mb-4">
                Elite Healthcare Careers
              </h2>
              <p className="text-lg text-gray-400 font-medium">
                Direct access to institutional openings and leadership roles in the medical sector.
              </p>
            </div>
            <Link 
              to="/jobs" 
              className="group flex items-center gap-3 bg-gray-900/50 px-8 py-4 rounded-[2rem] shadow-lg hover:shadow-xl hover:shadow-[#d8572a]/15 border border-white/10 hover:border-[#d8572a]/40 transition-all font-bold text-white backdrop-blur-md"
            >
              Explore All Vacancies 
              <div className="w-8 h-8 bg-primary-50 rounded-full flex items-center justify-center group-hover:bg-primary-600 group-hover:text-white transition-all duration-300">
                <FiChevronRight />
              </div>
            </Link>
          </div>

          {/* Top Healthcare Roles Grid */}
          <div className="grid grid-cols-2 gap-3 md:gap-4 mb-10 md:mb-16">
            {[
              { id: 'doctors', title: 'Doctors', count: '120+', icon: FiActivity },
              { id: 'nursing', title: 'Nursing', count: '85+', icon: FiActivity },
              { id: 'admin', title: 'Healthcare Admin', count: '42+', icon: FiBriefcase },
              { id: 'specialist', title: 'Specialists', count: '64+', icon: FiTool }
            ].map((role) => (
              <div key={role.id} className="bg-gray-900/50 rounded-[2rem] p-6 flex items-center justify-between group hover:border-[#d8572a]/30 border border-white/5 shadow-lg hover:shadow-xl hover:-translate-y-1 hover:shadow-[#d8572a]/15 transition-all duration-500 cursor-pointer backdrop-blur-md">
                <div>
                  <p className="text-2xl font-extrabold text-gray-100 tracking-tight">{role.count}</p>
                  <p className="text-sm font-semibold text-gray-500">{role.title}</p>
                </div>
                <div className="w-12 h-12 bg-primary-50 rounded-xl flex items-center justify-center group-hover:scale-110 group-hover:bg-primary-100 transition-all">
                  <role.icon className="text-primary-600 w-5 h-5" />
                </div>
              </div>
            ))}
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[1, 2].map((i) => (
                <div key={i} className="bg-gray-900/40 rounded-3xl h-48 shadow-sm skeleton" />
              ))}
            </div>
          ) : featuredJobs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {featuredJobs.map((job) => (
                <Link
                  key={job.id}
                  to={`/jobs/${job.id}`}
                  className="group"
                >
                  <div className="bg-gray-900/50 rounded-[2.5rem] p-8 border border-white/5 shadow-lg hover:shadow-2xl hover:shadow-[#d8572a]/15 hover:-translate-y-2 hover:border-[#d8572a]/30 transition-all duration-500 relative overflow-hidden h-full flex flex-col backdrop-blur-xl">
                    <div className="absolute right-0 top-0 w-32 h-32 bg-gradient-to-bl from-primary-50 to-transparent rounded-bl-full pointer-events-none" />
                    <div className="flex justify-between items-start mb-6 relative z-10">
                      <div className="flex-1 pr-4">
                        <h3 className="text-2xl font-bold text-gray-100 mb-2 group-hover:text-cyan-400 transition-colors leading-tight">{job.title}</h3>
                        <p className="text-primary-600 font-semibold text-sm">{job.employerCompany || job.employerName}</p>
                      </div>
                      <span className="bg-gray-100 text-gray-400 text-[10px] uppercase font-bold tracking-wider px-3 py-1.5 rounded-lg">
                        {job.categoryName}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-4 text-sm font-medium text-gray-500 mb-8">
                      <span className="flex items-center gap-2 bg-gray-800 px-3 py-1 rounded-md">
                        <div className="w-2 h-2 rounded-full bg-primary-400" /> {job.cityName}
                      </span>
                      <span className="flex items-center gap-2 bg-gray-800 px-3 py-1 rounded-md">
                        <div className="w-2 h-2 rounded-full bg-secondary-400" /> {job.employmentType?.replace('_', ' ')}
                      </span>
                    </div>
                    <div className="flex justify-between items-center pt-6 border-t border-gray-800 mt-auto">
                      <div>
                        <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider block mb-1">Package (LPA)</span>
                        <span className="text-2xl font-extrabold text-gray-100 tracking-tight">
                          ₹{job.salaryMinLpa} - {job.salaryMaxLpa}L
                        </span>
                      </div>
                      <div className="bg-gray-900/40 text-white px-6 py-3 rounded-xl font-bold text-sm tracking-wide group-hover:bg-primary-600 transition-colors shadow-md">
                        Apply
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="bg-gray-900/50 rounded-[2.5rem] p-12 text-center relative overflow-hidden border border-white/5 shadow-2xl backdrop-blur-xl">
              <div className="w-20 h-20 bg-primary-50 rounded-2xl mx-auto mb-6 flex items-center justify-center">
                <FiBriefcase className="text-primary-500 w-10 h-10" />
              </div>
              <h3 className="text-3xl font-extrabold text-gray-100 tracking-tight mb-4">Premium Opportunities Coming Soon</h3>
              <p className="text-lg text-gray-500 font-medium mb-8 max-w-xl mx-auto">
                We're currently vetting elite medical placements. Check back shortly for institutional-grade career transitions.
              </p>
              <button 
                onClick={() => navigate('/jobs')}
                className="bg-gray-900/40 hover:bg-primary-600 text-white px-8 py-4 rounded-xl font-bold text-sm uppercase tracking-wide inline-flex items-center gap-2 transition-colors shadow-md"
              >
                Search All Openings <FiChevronRight />
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Trust & CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 w-[1000px] h-[1000px] bg-gradient-to-b from-primary-900/20 via-secondary-900/10 to-transparent transform -translate-x-1/2 rounded-full blur-3xl opacity-60"></div>
        </div>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-block bg-primary-50 px-6 py-2 rounded-full text-primary-700 font-bold text-sm mb-8 tracking-widest uppercase border border-primary-100">
            Start Your Journey
          </div>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-gray-100 mb-8 tracking-tight">
            The World's Safest <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-secondary-600">Healthcare</span> Market
          </h2>
          <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed font-medium">
            Join 5,000+ verified professionals. Experience institutional-grade security for your healthcare business transitions.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <Link to="/register" className="bg-gradient-to-r from-primary-600 to-secondary-600 px-6 md:px-10 py-4 md:py-5 rounded-2xl text-white font-bold text-lg md:text-xl hover:from-primary-700 hover:to-secondary-700 transition-all transform hover:-translate-y-1 shadow-[0_8px_30px_rgba(14,165,233,0.3)]">
              Create Partner ID
            </Link>
            <Link to="/listings/create" className="bg-gray-900/50 border border-white/10 px-6 md:px-10 py-4 md:py-5 rounded-2xl text-white font-bold text-lg md:text-xl hover:border-[#d8572a]/50 hover:bg-[#d8572a]/10 transition-all transform hover:-translate-y-1 shadow-lg backdrop-blur-md hover:shadow-[#d8572a]/20">
              List Your Business
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;



