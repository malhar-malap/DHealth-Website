import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { listingsAPI, masterAPI } from '../../services/api';
import { formatPrice } from '../../utils/formatPrice';
import { FiSearch, FiMapPin, FiActivity, FiFilter } from 'react-icons/fi';

const PartialPropertiesPage = () => {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [partialSaleDealTypes, setPartialSaleDealTypes] = useState([]);
  const [categories, setCategories] = useState([]);
  
  // Filtering state
  const [selectedCategory, setSelectedCategory] = useState('');
  const [keyword, setKeyword] = useState('');
  const [debouncedKeyword, setDebouncedKeyword] = useState('');
  const [pagination, setPagination] = useState({ page: 0, size: 12, totalElements: 0, totalPages: 0 });

  useEffect(() => {
    fetchMasterData();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedKeyword(keyword);
    }, 500);
    return () => clearTimeout(timer);
  }, [keyword]);

  useEffect(() => {
    if (partialSaleDealTypes.length > 0) {
      fetchPartialListings();
    }
  }, [debouncedKeyword, selectedCategory, pagination.page, partialSaleDealTypes]);

  const fetchMasterData = async () => {
    try {
      // Fetch categories — match both singular and plural naming conventions
      let relevantCategories = [];
      const catRes = await masterAPI.getCategories();
      if (catRes.data && catRes.data.success) {
        const partialCategoryNames = ['hospital', 'hospitals', 'pharma company', 'pharma companies'];
        relevantCategories = catRes.data.data.filter(c => partialCategoryNames.includes(c.name.toLowerCase()));
        setCategories(relevantCategories);
      }

      // Fetch deal types to find the IDs for "Partial Stake Sale" for each category
      let allPartialTypes = [];
      for (const category of relevantCategories) {
          try {
              const dealTypesRes = await masterAPI.getDealTypes(category.id);
              if (dealTypesRes.data && dealTypesRes.data.success) {
                  const partialTypes = dealTypesRes.data.data.filter(dt => dt.name.toLowerCase().includes('partial'));
                  const withCategory = partialTypes.map(dt => ({ ...dt, categoryId: category.id }));
                  allPartialTypes = [...allPartialTypes, ...withCategory];
              }
          } catch(err) {
              console.error(`Error fetching deal types for category ${category.name}:`, err);
          }
      }
      
      setPartialSaleDealTypes(allPartialTypes);
      
      // If no partial types found, stop loading
      if (allPartialTypes.length === 0) {
        setLoading(false);
      }
    } catch (error) {
      console.error('Error fetching master data:', error);
      setLoading(false);
    }
  };

  const fetchPartialListings = async () => {
    setLoading(true);
    try {
      let results = [];
      let totalElements = 0;
      
      let targetDealTypes = partialSaleDealTypes;
      if (selectedCategory) {
          targetDealTypes = partialSaleDealTypes.filter(dt => dt.categoryId.toString() === selectedCategory.toString());
      }

      for (const dt of targetDealTypes) {
          const params = {
              dealTypeId: dt.id,
              keyword: debouncedKeyword || undefined,
              page: pagination.page,
              size: pagination.size,
              sortBy: 'createdAt',
              sortDirection: 'desc'
          };
          if (selectedCategory) {
              params.categoryId = selectedCategory;
          }
          
          const response = await listingsAPI.getAll(params);
          if (response.data?.data?.content) {
              results = [...results, ...response.data.data.content];
              totalElements += response.data.data.totalElements || results.length;
          }
      }
      
      // Deduplicate listings by id to prevent double-counting
      const uniqueMap = new Map();
      results.forEach(listing => {
        if (!uniqueMap.has(listing.id)) {
          uniqueMap.set(listing.id, listing);
        }
      });
      const uniqueResults = Array.from(uniqueMap.values());

      // Sort the combined results by createdAt descending
      uniqueResults.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

      const uniqueCount = uniqueResults.length;
      setListings(uniqueResults);
      setPagination(prev => ({ 
          ...prev, 
          totalElements: uniqueCount, 
          totalPages: Math.ceil(uniqueCount / prev.size) || 1 
      }));

    } catch (error) {
      console.error('Error fetching partial properties:', error);
    }
    setLoading(false);
  };



  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-gray-900 via-gray-900 to-[#d8572a]/10">
      {/* Header — matches ListingsPage style */}
      <div className="bg-gray-900 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h1 className="text-2xl font-bold text-gray-200 mb-1">Partial Stake Sale</h1>
          <p className="text-gray-500 text-sm mb-4">
            Explore partial sale opportunities in hospitals and pharma companies.
          </p>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <FiSearch className="absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input 
                  type="text" 
                  value={keyword} 
                  onChange={(e) => {
                      setKeyword(e.target.value);
                      setPagination(prev => ({ ...prev, page: 0 }));
                  }} 
                  placeholder="Search partial stake sales..." 
                  className="form-input search-input" 
              />
            </div>
            
            <div className="flex items-center gap-2">
              <FiFilter className="text-gray-400" />
              <select 
                value={selectedCategory} 
                onChange={(e) => {
                  setSelectedCategory(e.target.value);
                  setPagination(prev => ({ ...prev, page: 0 }));
                }} 
                className="form-input"
              >
                <option value="">All Categories</option>
                {categories.map(cat => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div>
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map(i => (<div key={i} className="card p-4"><div className="skeleton h-48 w-full mb-4"></div><div className="skeleton h-4 w-3/4 mb-2"></div><div className="skeleton h-4 w-1/2"></div></div>))}
            </div>
          ) : listings.length === 0 ? (
            <div className="text-center py-16">
              <FiActivity className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-400 mb-2">No partial stake sales found</h3>
              <p className="text-gray-500">Try adjusting your category filter or search term</p>
            </div>
          ) : (
            <>
              <div className="flex justify-between items-center mb-4">
                <p className="text-gray-400">{pagination.totalElements} partial stake sales found</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {listings.map(listing => (
                  <Link key={listing.id} to={`/listings/${listing.id}`} className="card card-hover">
                    <div className="relative h-48 bg-gray-800">
                      {listing.primaryImage ? (
                        <img src={listing.primaryImage} alt={listing.displayTitle} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gray-900 border-b border-gray-800">
                          <FiActivity className="w-16 h-16 text-gray-600" />
                        </div>
                      )}
                      <div className="absolute top-3 left-3">
                        <span className="px-2 py-0.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded text-[10px] font-bold uppercase tracking-wider">
                          Partial Stake Sale
                        </span>
                      </div>
                    </div>
                    <div className="p-4">
                      <div className="flex items-center gap-2 mb-2 flex-wrap">
                        <span className="badge badge-primary">{listing.categoryName}</span>
                        {listing.uniqueCode && <span className="px-2 py-0.5 bg-[#db7c26]/10 text-[#db7c26] border border-[#db7c26]/20 rounded text-[10px] font-bold uppercase tracking-wider">{listing.uniqueCode}</span>}
                      </div>
                      <h3 className="font-semibold text-gray-200 mb-1 line-clamp-1">{listing.displayTitle}</h3>
                      <div className="flex items-center text-gray-500 text-sm mb-2"><FiMapPin className="w-4 h-4 mr-1" />{listing.cityName}{listing.stateName ? `, ${listing.stateName}` : ''}</div>
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-bold text-primary-600">{formatPrice(listing.askingPrice)}</span>
                        {listing.priceNegotiable && <span className="text-xs text-gray-500">Negotiable</span>}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
              
              {pagination.totalPages > 1 && (
                <div className="flex justify-center mt-8 gap-2">
                  <button onClick={() => setPagination(prev => ({ ...prev, page: prev.page - 1 }))} disabled={pagination.page === 0} className="btn btn-secondary">Previous</button>
                  <span className="flex items-center px-4 text-gray-400">Page {pagination.page + 1} of {pagination.totalPages}</span>
                  <button onClick={() => setPagination(prev => ({ ...prev, page: prev.page + 1 }))} disabled={pagination.page >= pagination.totalPages - 1} className="btn btn-secondary">Next</button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default PartialPropertiesPage;
