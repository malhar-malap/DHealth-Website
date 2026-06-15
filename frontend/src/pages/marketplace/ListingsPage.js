import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { listingsAPI, masterAPI } from '../../services/api';
import { formatPrice } from '../../utils/formatPrice';
import { FiSearch, FiMapPin, FiFilter, FiX, FiActivity } from 'react-icons/fi';

const ListingsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [dealTypes, setDealTypes] = useState([]);
  const [cities, setCities] = useState([]);

  const [showFilters, setShowFilters] = useState(false);
  const [pagination, setPagination] = useState({ page: 0, size: 12, totalElements: 0, totalPages: 0 });
  const [filters, setFilters] = useState({
    keyword: searchParams.get('keyword') || '',
    categoryId: searchParams.get('category') || '',
    dealTypeId: searchParams.get('dealType') || '',
    cityName: searchParams.get('city') || '',
    minPrice: '',
    maxPrice: '',
    sortBy: 'createdAt',
    sortDirection: 'desc'
  });

  useEffect(() => {
    fetchMasterData();
    masterAPI.getCities()
      .then(res => setCities(res.data?.data || []))
      .catch(() => setCities([]));
  }, []);

  useEffect(() => {
    const keyword = searchParams.get('keyword') || '';
    const categoryId = searchParams.get('category') || '';
    const dealTypeId = searchParams.get('dealType') || '';
    const cityName = searchParams.get('city') || '';
    const minPrice = searchParams.get('minPrice') || '';
    const maxPrice = searchParams.get('maxPrice') || '';
    
    setFilters(prev => ({
      ...prev,
      keyword,
      categoryId,
      dealTypeId,
      cityName,
      minPrice,
      maxPrice
    }));
  }, [searchParams]);

  const [debouncedKeyword, setDebouncedKeyword] = useState(filters.keyword);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedKeyword(filters.keyword);
    }, 500);
    return () => clearTimeout(timer);
  }, [filters.keyword]);

  useEffect(() => {
    if (filters.categoryId) {
      masterAPI.getDealTypes(filters.categoryId)
        .then(res => setDealTypes(res.data?.data || []))
        .catch(() => setDealTypes([]));
    } else {
      setDealTypes([]);
      setFilters(prev => ({ ...prev, dealTypeId: '' }));
    }
  }, [filters.categoryId]);

  useEffect(() => {
    fetchListings();
  }, [debouncedKeyword, filters.categoryId, filters.dealTypeId, filters.cityName, filters.minPrice, filters.maxPrice, filters.sortBy, filters.sortDirection, pagination.page]);

  const fetchMasterData = async () => {
    // Fetch categories
    try {
      const catRes = await masterAPI.getCategories();
      if (catRes.data && catRes.data.success) {
        setCategories(catRes.data.data || []);
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
    }

  };

  const fetchListings = async () => {
    setLoading(true);
    try {
      const params = { 
        ...filters, 
        keyword: debouncedKeyword,
        page: pagination.page, 
        size: pagination.size 
      };
      Object.keys(params).forEach(key => { if (params[key] === '' || params[key] === null) delete params[key]; });
      const response = await listingsAPI.getAll(params);
      const data = response.data.data;
      setListings(data.content || []);
      setPagination(prev => ({ ...prev, totalElements: data.totalElements, totalPages: data.totalPages }));
    } catch (error) { console.error('Error fetching listings:', error); }
    setLoading(false);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    
    // Price validation: prevent negative values
    if ((name === 'minPrice' || name === 'maxPrice') && value !== '') {
      if (parseFloat(value) < 0) return;
    }
    
    // Handle combined sort value (e.g. "askingPrice_asc")
    if (name === 'sortOption') {
      const [sortBy, sortDirection] = value.split('_');
      setFilters(prev => ({ ...prev, sortBy, sortDirection }));
      return;
    }
    
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const applyFilters = () => {
    const newParams = {};
    if (filters.keyword) newParams.keyword = filters.keyword;
    if (filters.categoryId) newParams.category = filters.categoryId;
    if (filters.dealTypeId) newParams.dealType = filters.dealTypeId;
    if (filters.cityName) newParams.city = filters.cityName;
    if (filters.minPrice) newParams.minPrice = filters.minPrice;
    if (filters.maxPrice) newParams.maxPrice = filters.maxPrice;
    
    setSearchParams(newParams);
    setPagination(prev => ({ ...prev, page: 0 }));
    setShowFilters(false);
  };

  const clearFilters = () => {
    setFilters({ keyword: '', categoryId: '', dealTypeId: '', cityName: '', minPrice: '', maxPrice: '', sortBy: 'createdAt', sortDirection: 'desc' });
    setSearchParams({});
    fetchListings();
  };



  return (
    <div className="min-h-screen bg-gray-800">
      <div className="bg-gray-900 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h1 className="text-2xl font-bold text-gray-200 mb-4">Browse Healthcare Listings</h1>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <FiSearch className="absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input type="text" name="keyword" value={filters.keyword} onChange={handleFilterChange} placeholder="Search hospitals, pharma companies, labs..." className="form-input search-input" onKeyDown={(e) => e.key === 'Enter' && applyFilters()} />
            </div>
            <button onClick={() => setShowFilters(!showFilters)} className="btn btn-secondary flex items-center gap-2">
              <FiFilter /> Filters {(filters.categoryId || filters.cityName || filters.minPrice || filters.maxPrice) && <span className="bg-primary-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">!</span>}
            </button>
            <button onClick={applyFilters} className="btn btn-primary">Search</button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="md:flex md:gap-6">
          {showFilters && (
            <>
              {/* Mobile backdrop overlay */}
              <div
                className="fixed inset-0 bg-black/60 z-40 md:hidden"
                onClick={() => setShowFilters(false)}
              />
              <div className="fixed inset-0 z-50 overflow-y-auto bg-gray-900 p-6 md:relative md:inset-auto md:z-auto md:overflow-visible md:w-72 md:rounded-xl md:shadow-sm md:h-fit md:sticky md:top-24">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold text-gray-200">Filters</h3>
                <div className="flex items-center gap-3">
                  <button onClick={clearFilters} className="text-sm text-primary-500 hover:text-primary-600">Clear All</button>
                  <button onClick={() => setShowFilters(false)} className="md:hidden p-2 -mr-2 text-gray-400 hover:text-gray-200" aria-label="Close filters">
                    <FiX className="w-5 h-5" />
                  </button>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="form-label">Category</label>
                  <select name="categoryId" value={filters.categoryId} onChange={handleFilterChange} className="form-input">
                    <option value="">All Categories</option>
                    {categories.map(cat => (<option key={cat.id} value={cat.id}>{cat.name}</option>))}
                  </select>
                </div>
                {filters.categoryId && dealTypes.length > 0 && (
                  <div>
                    <label className="form-label">Deal Type (Buy/Lease)</label>
                    <select name="dealTypeId" value={filters.dealTypeId} onChange={handleFilterChange} className="form-input">
                      <option value="">All Types</option>
                      {dealTypes.map(type => (<option key={type.id} value={type.id}>{type.name}</option>))}
                    </select>
                  </div>
                )}
                <div>
                  <label className="form-label">City</label>
                  <input type="text" name="cityName" value={filters.cityName} onChange={handleFilterChange} list="filterCityList" placeholder="All Cities" className="form-input" autoComplete="off" />
                  <datalist id="filterCityList">
                    {cities.map(city => (
                      <option key={city.id} value={city.name} />
                    ))}
                  </datalist>
                </div>
                <div>
                  <label className="form-label">Price Range</label>
                  <div className="flex gap-2">
                    <input type="number" name="minPrice" value={filters.minPrice} onChange={handleFilterChange} placeholder="Min" min="0" className="form-input text-sm" />
                    <input type="number" name="maxPrice" value={filters.maxPrice} onChange={handleFilterChange} placeholder="Max" min="0" className="form-input text-sm" />
                  </div>
                </div>
                <div>
                  <label className="form-label">Sort By</label>
                  <select name="sortOption" value={`${filters.sortBy}_${filters.sortDirection}`} onChange={handleFilterChange} className="form-input">
                    <option value="createdAt_desc">Newest First</option>
                    <option value="createdAt_asc">Oldest First</option>
                    <option value="askingPrice_asc">Price: Low to High</option>
                    <option value="askingPrice_desc">Price: High to Low</option>
                  </select>
                </div>
                <button onClick={applyFilters} className="btn btn-primary w-full">Apply Filters</button>
              </div>
              </div>
            </>
          )}

          <div className="flex-1">
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map(i => (<div key={i} className="card p-4"><div className="skeleton h-48 w-full mb-4"></div><div className="skeleton h-4 w-3/4 mb-2"></div><div className="skeleton h-4 w-1/2"></div></div>))}
              </div>
            ) : listings.length === 0 ? (
              <div className="text-center py-16">
                <FiActivity className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-400 mb-2">No listings found</h3>
                <p className="text-gray-500 mb-4">Try adjusting your search or filters</p>
                <button onClick={clearFilters} className="btn btn-primary">Clear Filters</button>
              </div>
            ) : (
              <>
                <div className="flex justify-between items-center mb-4">
                  <p className="text-gray-400">{pagination.totalElements} listings found</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {listings.map(listing => (
                    <Link key={listing.id} to={`/listings/${listing.id}`} className="card card-hover">
                      <div className="relative h-48 bg-gray-800">
                        {listing.primaryImage ? <img src={listing.primaryImage} alt={listing.displayTitle} className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center bg-gray-900 border-b border-gray-800"><FiActivity className="w-16 h-16 text-gray-600" /></div>}
                      </div>
                      <div className="p-4">
                        <div className="flex items-center gap-2 mb-2 flex-wrap">
                          <span className="badge badge-primary">{listing.categoryName}</span>
                          {listing.dealType && <span className="px-2 py-0.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded text-[10px] font-bold uppercase tracking-wider">{listing.dealType}</span>}
                          {listing.uniqueCode && <span className="px-2 py-0.5 bg-[#db7c26]/10 text-[#db7c26] border border-[#db7c26]/20 rounded text-[10px] font-bold uppercase tracking-wider">{listing.uniqueCode}</span>}
                        </div>
                        <h3 className="font-semibold text-gray-200 mb-1 line-clamp-1">{listing.displayTitle}</h3>
                        <div className="flex items-center text-gray-500 text-sm mb-2"><FiMapPin className="w-4 h-4 mr-1" />{listing.cityName}, {listing.stateName}</div>
                        <div className="flex items-center justify-between"><span className="text-lg font-bold text-primary-600">{formatPrice(listing.askingPrice)}</span>{listing.priceNegotiable && <span className="text-xs text-gray-500">Negotiable</span>}</div>
                      </div>
                    </Link>
                  ))}
                </div>
                {pagination.totalPages > 1 && (
                  <div className="flex justify-center mt-8 gap-2">
                    <button onClick={() => { setPagination(prev => ({ ...prev, page: prev.page - 1 })); fetchListings(); }} disabled={pagination.page === 0} className="btn btn-secondary">Previous</button>
                    <span className="flex items-center px-4 text-gray-400">Page {pagination.page + 1} of {pagination.totalPages}</span>
                    <button onClick={() => { setPagination(prev => ({ ...prev, page: prev.page + 1 })); fetchListings(); }} disabled={pagination.page >= pagination.totalPages - 1} className="btn btn-secondary">Next</button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListingsPage;



