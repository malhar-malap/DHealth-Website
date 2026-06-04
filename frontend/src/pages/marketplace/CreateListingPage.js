import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { listingsAPI, masterAPI } from '../../services/api';
import { toast } from 'react-hot-toast';
import { useAuth } from '../../context/AuthContext';

const CreateListingPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { isAuthenticated } = useAuth();
  const isEditMode = !!id;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const [categories, setCategories] = useState([]);
  const [dealTypes, setDealTypes] = useState([]);
  const [hospitalTypes, setHospitalTypes] = useState([]);



  const [formData, setFormData] = useState({
    title: '', categoryId: '', dealTypeId: '', cityName: '',
    askingPrice: '', priceNegotiable: true, shortDescription: '', detailedDescription: '',
    // Hospital
    numberOfBeds: '', hospitalTypeId: '', nabhAccredited: false, annualRevenue: '',
    landAreaSqft: '', yearEstablished: '', ipBedsOccupied: '',
    // Pharma
    annualTurnover: '', stakePercentage: '', gmpCertified: false, fdaCertified: false,
    whoCertified: false, numberOfSkus: '', productTypes: '', manufacturingCapacity: '',
    ebitda: '', totalLandAreaSqft: '',
    // Pharmacies
    premisesType: '', yearsInBusiness: '', isFurnished: false, carpetAreaSqft: '', oneLineDescription: '',
    // Diagnostic
    diagnosticType: '', machinesIncluded: '', dailyPatientFootfall: '', nablAccredited: false, testsOffered: '',
  });

  useEffect(() => {
    masterAPI.getCategories()
      .then(res => setCategories(res.data?.data || []))
      .catch(() => toast.error('Failed to load categories'));
    
    masterAPI.getHospitalTypes()
      .then(res => setHospitalTypes(res.data?.data || []))
      .catch(() => {});
      

    if (isEditMode) {
      setLoading(true);
      listingsAPI.getById(id).then(res => {
        const data = res.data.data;
        setFormData({
            title: data.title || '', categoryId: data.category?.id || '', dealTypeId: data.dealType?.id || '',
            cityName: data.cityName || '', askingPrice: data.askingPrice || '',
            priceNegotiable: data.priceNegotiable ?? true, shortDescription: data.shortDescription || '',
            detailedDescription: data.detailedDescription || '',
            
            numberOfBeds: data.categoryDetails?.numberOfBeds || '',
            hospitalTypeId: data.categoryDetails?.hospitalType?.id || '',
            nabhAccredited: data.categoryDetails?.nabhAccredited || false,
            annualRevenue: data.categoryDetails?.annualRevenue || '',
            landAreaSqft: data.categoryDetails?.landAreaSqft || '',
            yearEstablished: data.categoryDetails?.yearEstablished || '',
            ipBedsOccupied: data.categoryDetails?.ipBedsOccupied || '',

            annualTurnover: data.categoryDetails?.annualTurnover || '',
            stakePercentage: data.categoryDetails?.stakePercentage || '',
            gmpCertified: data.categoryDetails?.gmpCertified || false,
            fdaCertified: data.categoryDetails?.fdaCertified || false,
            whoCertified: data.categoryDetails?.whoCertified || false,
            numberOfSkus: data.categoryDetails?.numberOfSkus || '',
            productTypes: data.categoryDetails?.productTypes || '',
            manufacturingCapacity: data.categoryDetails?.manufacturingCapacity || '',
            ebitda: data.categoryDetails?.ebitda || '',
            totalLandAreaSqft: data.categoryDetails?.totalLandAreaSqft || '',

            diagnosticType: data.categoryDetails?.diagnosticType || '',
            machinesIncluded: data.categoryDetails?.machinesIncluded || '',
            dailyPatientFootfall: data.categoryDetails?.dailyPatientFootfall || '',
            nablAccredited: data.categoryDetails?.nablAccredited || false,
            testsOffered: data.categoryDetails?.testsOffered || '',

            premisesType: data.categoryDetails?.premisesType || '',
            yearsInBusiness: data.categoryDetails?.yearsInBusiness || '',
            isFurnished: data.categoryDetails?.isFurnished || false,
            carpetAreaSqft: data.categoryDetails?.carpetAreaSqft || '',
            oneLineDescription: data.categoryDetails?.oneLineDescription || '',
        });
      }).finally(() => setLoading(false));
    }
  }, [id, isEditMode]);

  useEffect(() => {
    if (formData.categoryId) {
      masterAPI.getDealTypes(formData.categoryId)
        .then(res => setDealTypes(res.data?.data || []))
        .catch(() => {});
      if (!isEditMode) setFormData(prev => ({ ...prev, dealTypeId: '' }));
    }
  }, [formData.categoryId, isEditMode]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else if (e.target.getAttribute('type') === 'number' && value !== '') {
      // Prevent negative numbers for all numeric fields
      const numVal = parseFloat(value);
      if (numVal < 0) return;
      setFormData(prev => ({ ...prev, [name]: value }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };



  const getCategoryName = () => {
    const cat = categories.find(c => String(c.id) === String(formData.categoryId));
    return cat?.name?.toLowerCase() || '';
  };

  const getDealTypeName = () => {
    const dt = dealTypes.find(d => String(d.id) === String(formData.dealTypeId));
    return dt?.name?.toLowerCase() || '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Check if user is logged in before attempting to create/edit
    if (!isAuthenticated) {
      setError('LOGIN_REQUIRED');
      toast.error('Please login or sign up to create listings.');
      setLoading(false);
      return;
    }

    setLoading(true);
    setError('');

    try {
      // Prepare Payload
      const payload = {
        title: formData.title,
        categoryId: parseInt(formData.categoryId),
        dealTypeId: parseInt(formData.dealTypeId),
        cityName: formData.cityName,
        askingPrice: parseFloat(formData.askingPrice),
        priceNegotiable: formData.priceNegotiable,
        shortDescription: formData.shortDescription,
        detailedDescription: formData.detailedDescription,
        isConfidential: false,
        confidentialTitle: null
      };

      const catName = getCategoryName();
      if (catName === 'hospital' || catName === 'hospitals' || catName === 'dental centre' || catName === 'dental centres') {
        if (formData.numberOfBeds) payload.numberOfBeds = parseInt(formData.numberOfBeds);
        payload.nabhAccredited = formData.nabhAccredited;
        if (formData.annualRevenue) payload.annualRevenue = parseFloat(formData.annualRevenue);
        if (formData.landAreaSqft) payload.landAreaSqft = parseFloat(formData.landAreaSqft);
        if (formData.yearEstablished) payload.yearEstablished = parseInt(formData.yearEstablished);
        if (formData.ipBedsOccupied) payload.ipBedsOccupied = parseInt(formData.ipBedsOccupied);
        if (formData.stakePercentage) payload.stakePercentage = parseFloat(formData.stakePercentage);
      } else if (catName === 'pharma company' || catName === 'pharma companies') {
        if (formData.annualTurnover) payload.annualTurnover = parseFloat(formData.annualTurnover);
        if (formData.stakePercentage && getDealTypeName() === 'partial stake sale') payload.stakePercentage = parseFloat(formData.stakePercentage);
        payload.gmpCertified = formData.gmpCertified;
        payload.fdaCertified = formData.fdaCertified;
        payload.whoCertified = formData.whoCertified;
        if (formData.numberOfSkus) payload.numberOfSkus = parseInt(formData.numberOfSkus);
        payload.productTypes = formData.productTypes;
        payload.manufacturingCapacity = formData.manufacturingCapacity;
        if (formData.ebitda) payload.ebitda = parseFloat(formData.ebitda);
        if (formData.totalLandAreaSqft) payload.totalLandAreaSqft = parseFloat(formData.totalLandAreaSqft);
      } else if (catName === 'pharmacy' || catName === 'pharmacies') {
        payload.premisesType = formData.premisesType;
        if (formData.yearsInBusiness) payload.yearsInBusiness = parseInt(formData.yearsInBusiness);
        payload.isFurnished = formData.isFurnished;
        if (formData.carpetAreaSqft) payload.carpetAreaSqft = parseFloat(formData.carpetAreaSqft);
        payload.oneLineDescription = formData.oneLineDescription;
      } else if (catName === 'diagnostic centre' || catName === 'diagnostic centres' || catName === 'diagnostics') {
        payload.diagnosticType = formData.diagnosticType;
        payload.machinesIncluded = formData.machinesIncluded;
        if (formData.dailyPatientFootfall) payload.dailyPatientFootfall = parseInt(formData.dailyPatientFootfall);
        payload.nablAccredited = formData.nablAccredited;
        payload.testsOffered = formData.testsOffered;
      }

      // 3. Create or Edit Listing
      if (isEditMode) {
        await listingsAPI.update(id, payload);
        toast.success('Listing updated successfully!');
      } else {
        await listingsAPI.create(payload);
        toast.success('Listing created successfully!');
      }
      setTimeout(() => navigate('/dashboard'), 2000);
    } catch (err) {
      console.error(err);
      const status = err.response?.status;
      if (status === 401 || status === 403) {
        setError('LOGIN_REQUIRED');
        toast.error('Please login or sign up to create listings.');
      } else {
        setError(err.response?.data?.message || 'Failed to create listing. Please check your inputs and images.');
        toast.error('Failed to create listing');
      }
    } finally {
      setLoading(false);
    }
  };

  const inputClass = "w-full px-4 py-2.5 border border-gray-600 rounded-lg focus:ring-2 focus:ring-[#d8572a] focus:border-transparent outline-none transition bg-gray-900 text-gray-200 placeholder-gray-500";
  const labelClass = "block text-sm font-semibold text-gray-300 mb-1";

  return (
    <div className="min-h-screen bg-gray-800 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-gray-400 hover:text-[#db7c26] mb-6 transition">
          ← Back
        </button>

        <h1 className="text-2xl md:text-3xl font-bold text-gray-200 mb-2">{isEditMode ? 'Edit Listing' : 'Post a New Listing'}</h1>
        <p className="text-gray-500 mb-8 border-b pb-4">Provide details about your healthcare business to attract verified buyers.</p>

        {error && error === 'LOGIN_REQUIRED' ? (
          <div className="bg-amber-900/30 border-l-4 border-amber-500 p-5 mb-6 rounded-r-lg">
            <div className="flex items-start">
              <div className="flex-shrink-0 text-2xl">🔒</div>
              <div className="ml-4">
                <p className="text-base text-amber-200 font-semibold mb-1">Authentication Required</p>
                <p className="text-sm text-amber-300/80 mb-3">Please login or sign up to create listings on DHealth.</p>
                <div className="flex gap-3">
                  <Link to="/login" className="px-4 py-2 bg-[#db7c26] text-white text-sm font-semibold rounded-lg hover:bg-[#c56a1e] transition">Login</Link>
                  <Link to="/register" className="px-4 py-2 border border-amber-500 text-amber-300 text-sm font-semibold rounded-lg hover:bg-amber-500/10 transition">Sign Up</Link>
                </div>
              </div>
            </div>
          </div>
        ) : error ? (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 rounded-r-lg animate-shake">
            <div className="flex">
              <div className="flex-shrink-0">⚠️</div>
              <div className="ml-3">
                <p className="text-sm text-red-700 font-medium">{error}</p>
              </div>
            </div>
          </div>
        ) : null}

        <form onSubmit={handleSubmit} className="space-y-8 bg-gray-900 p-4 md:p-8 rounded-2xl shadow-xl border border-gray-800">
          


          {/* Basic Information */}
          <section className="space-y-6">
            <h2 className="text-lg font-bold text-gray-200 mb-4 flex items-center gap-2">
              📋 Basic Details
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className={labelClass}>Category *</label>
                <select name="categoryId" value={formData.categoryId} onChange={handleChange} required className={inputClass}>
                  <option value="">Select Category</option>
                  {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
              </div>
              <div>
                <label className={labelClass}>Deal Type *</label>
                <select name="dealTypeId" value={formData.dealTypeId} onChange={handleChange} required className={inputClass}>
                  <option value="">Select Deal Type</option>
                  {dealTypes.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
                </select>
              </div>
            </div>

            <div>
              <label className={labelClass}>Listing Title *</label>
              <input type="text" name="title" value={formData.title} onChange={handleChange} required maxLength="200"
                placeholder="e.g., Well-equipped Diagnostic Center in Central Delhi" className={inputClass} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className={labelClass}>City *</label>
                <input type="text" name="cityName" value={formData.cityName} onChange={handleChange} required
                  list="cityList" placeholder="Search or select city" className={inputClass} autoComplete="off" />
                <datalist id="cityList">
                  <option value="Mumbai" />
                  <option value="Delhi" />
                  <option value="Bengaluru" />
                  <option value="Hyderabad" />
                  <option value="Chennai" />
                  <option value="Kolkata" />
                  <option value="Pune" />
                  <option value="Ahmedabad" />
                  <option value="Jaipur" />
                  <option value="Lucknow" />
                  <option value="Surat" />
                  <option value="Kanpur" />
                  <option value="Nagpur" />
                  <option value="Indore" />
                  <option value="Thane" />
                  <option value="Bhopal" />
                  <option value="Visakhapatnam" />
                  <option value="Patna" />
                  <option value="Vadodara" />
                  <option value="Ghaziabad" />
                  <option value="Ludhiana" />
                  <option value="Agra" />
                  <option value="Nashik" />
                  <option value="Faridabad" />
                  <option value="Meerut" />
                  <option value="Rajkot" />
                  <option value="Varanasi" />
                  <option value="Srinagar" />
                  <option value="Aurangabad" />
                  <option value="Dhanbad" />
                  <option value="Amritsar" />
                  <option value="Navi Mumbai" />
                  <option value="Allahabad" />
                  <option value="Ranchi" />
                  <option value="Howrah" />
                  <option value="Coimbatore" />
                  <option value="Jabalpur" />
                  <option value="Gwalior" />
                  <option value="Vijayawada" />
                  <option value="Jodhpur" />
                  <option value="Madurai" />
                  <option value="Raipur" />
                  <option value="Kota" />
                  <option value="Chandigarh" />
                  <option value="Guwahati" />
                  <option value="Solapur" />
                  <option value="Hubli" />
                  <option value="Mysuru" />
                  <option value="Tiruchirappalli" />
                  <option value="Bareilly" />
                  <option value="Aligarh" />
                  <option value="Tiruppur" />
                  <option value="Moradabad" />
                  <option value="Jalandhar" />
                  <option value="Bhubaneswar" />
                  <option value="Salem" />
                  <option value="Warangal" />
                  <option value="Guntur" />
                  <option value="Bhilai" />
                  <option value="Kochi" />
                  <option value="Gorakhpur" />
                  <option value="Noida" />
                  <option value="Gurgaon" />
                  <option value="Mangalore" />
                  <option value="Dehradun" />
                  <option value="Udaipur" />
                  <option value="Thiruvananthapuram" />
                  <option value="Shimla" />
                  <option value="Panaji" />
                </datalist>
                <p className="text-xs text-gray-500 mt-1">Type to search or pick from the list. You can also enter a custom city.</p>
              </div>
            </div>
          </section>

          <section className="space-y-6">
            <h2 className="text-lg font-bold text-gray-200 mb-4 flex items-center gap-2">
              💰 Pricing & Privacy
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className={labelClass}>Asking Price (₹) *</label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-gray-400">₹</span>
                  <input type="number" name="askingPrice" value={formData.askingPrice} onChange={handleChange} required
                    min="0" step="0.01" placeholder="0.00" className={`${inputClass} pl-8`} />
                </div>
              </div>
              <div className="flex items-center">
                <label className="flex items-center gap-2 cursor-pointer p-2 hover:bg-gray-800 rounded-lg transition">
                  <input type="checkbox" name="priceNegotiable" checked={formData.priceNegotiable} onChange={handleChange}
                    className="w-5 h-5 text-[#db7c26] rounded focus:ring-[#d8572a]" />
                  <span className="text-sm font-medium text-gray-300">Price is Negotiable</span>
                </label>
              </div>
            </div>

            <div className={`p-5 rounded-xl border-2 transition bg-gray-800 border-gray-700`}>
              <div className="flex items-start gap-4">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-xl shadow-inner bg-green-100`}>
                  🔓
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <span className="font-bold text-gray-200">Public Listing</span>
                  </div>
                  <p className="text-xs text-gray-400 leading-relaxed">
                    This listing is visible to the public ecosystem. All basic details (excluding exact contact nodes) will be displayed to authenticated stakeholders.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section>
             <h2 className="text-lg font-bold text-gray-200 mb-4 flex items-center gap-2">
              📝 Description
            </h2>
            <div className="space-y-6">
              <div>
                <label className={labelClass}>Short Description (Elevator Pitch)</label>
                <textarea name="shortDescription" value={formData.shortDescription} onChange={handleChange} rows="2"
                  maxLength="500" placeholder="A one-sentence hook for your listing..." className={inputClass} />
              </div>
            </div>
          </section>

          {/* ====== CATEGORY-SPECIFIC DETAILS ====== */}
          {getCategoryName() && (
            <section className="bg-gray-900/80 p-6 rounded-2xl border border-[#db7c26]/30">
              <h2 className="text-lg font-bold text-[#db7c26] mb-6 flex items-center gap-2 uppercase tracking-wider text-sm">
                📌 {getCategoryName()} Specifications
              </h2>
              
              {['hospital', 'hospitals', 'dental centre', 'dental centres'].includes(getCategoryName()) && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div><label className={labelClass}>{getCategoryName() === 'dental centres' || getCategoryName() === 'dental centre' ? 'Number of Chairs' : 'Number of Beds'}</label>
                    <input type="number" name="numberOfBeds" value={formData.numberOfBeds} onChange={handleChange} min="0" className={inputClass} /></div>
                  <div><label className={labelClass}>Year Established</label>
                    <input type="number" name="yearEstablished" value={formData.yearEstablished} onChange={handleChange} placeholder="YYYY" min="0" className={inputClass} /></div>
                  <div><label className={labelClass}>Annual Revenue (₹)</label>
                    <input type="number" name="annualRevenue" value={formData.annualRevenue} onChange={handleChange} min="0" className={inputClass} /></div>
                  <div><label className={labelClass}>Land Area (sq ft)</label>
                    <input type="number" name="landAreaSqft" value={formData.landAreaSqft} onChange={handleChange} min="0" className={inputClass} /></div>
                  {getDealTypeName() === 'partial stake sale' && (
                    <div><label className={labelClass}>Stake Percentage (%) *</label>
                      <input type="number" step="0.01" min="0.01" max="99.99" name="stakePercentage" value={formData.stakePercentage} onChange={handleChange} required className={inputClass} /></div>
                  )}
                  <div className="flex items-center mt-4">
                    <label className="flex items-center gap-2 cursor-pointer"><input type="checkbox" name="nabhAccredited" checked={formData.nabhAccredited} onChange={handleChange} className="w-5 h-5 text-[#db7c26] rounded" /><span className="text-sm font-medium">NABH Accredited</span></label>
                  </div>
                </div>
              )}

              {(getCategoryName() === 'pharma company' || getCategoryName() === 'pharma companies') && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div><label className={labelClass}>Annual Turnover (₹)</label>
                    <input type="number" name="annualTurnover" value={formData.annualTurnover} onChange={handleChange} min="0" className={inputClass} /></div>
                  <div><label className={labelClass}>EBITDA (%)</label>
                    <input type="number" name="ebitda" value={formData.ebitda} onChange={handleChange} step="0.01" min="0" max="100" placeholder="0 - 100" className={inputClass} /></div>
                  <div><label className={labelClass}>Total Land Area (sq ft)</label>
                    <input type="number" name="totalLandAreaSqft" value={formData.totalLandAreaSqft} onChange={handleChange} min="0" className={inputClass} /></div>
                  {getDealTypeName() === 'partial stake sale' && (
                    <div><label className={labelClass}>Stake Percentage (%) *</label>
                      <input type="number" name="stakePercentage" value={formData.stakePercentage} onChange={handleChange} step="0.01" min="0.01" max="99.99" required className={inputClass} /></div>
                  )}
                  <div><label className={labelClass}>Number of SKUs</label>
                    <input type="number" name="numberOfSkus" value={formData.numberOfSkus} onChange={handleChange} min="0" className={inputClass} /></div>
                  <div><label className={labelClass}>Product Types</label>
                    <input type="text" name="productTypes" value={formData.productTypes} onChange={handleChange} placeholder="e.g., Tablets, Liquid" className={inputClass} /></div>
                  <div className="md:col-span-2"><label className={labelClass}>Manufacturing Capacity</label>
                    <input type="text" name="manufacturingCapacity" value={formData.manufacturingCapacity} onChange={handleChange} className={inputClass} /></div>
                  <div className="flex gap-6 mt-4">
                    <label className="flex items-center gap-2 cursor-pointer"><input type="checkbox" name="gmpCertified" checked={formData.gmpCertified} onChange={handleChange} className="w-5 h-5 text-[#db7c26] rounded" /><span className="text-sm font-medium">GMP</span></label>
                    <label className="flex items-center gap-2 cursor-pointer"><input type="checkbox" name="fdaCertified" checked={formData.fdaCertified} onChange={handleChange} className="w-5 h-5 text-[#db7c26] rounded" /><span className="text-sm font-medium">FDA</span></label>
                    <label className="flex items-center gap-2 cursor-pointer"><input type="checkbox" name="whoCertified" checked={formData.whoCertified} onChange={handleChange} className="w-5 h-5 text-[#db7c26] rounded" /><span className="text-sm font-medium">WHO</span></label>
                  </div>
                </div>
              )}

              {(getCategoryName() === 'pharmacy' || getCategoryName() === 'pharmacies') && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div><label className={labelClass}>Premises (Sale/Rent)</label>
                    <select name="premisesType" value={formData.premisesType} onChange={handleChange} className={inputClass}>
                      <option value="">Select Option</option>
                      <option value="SALE">Sale</option>
                      <option value="RENT">Rent</option>
                    </select></div>
                  <div><label className={labelClass}>Years in Business</label>
                    <input type="number" name="yearsInBusiness" value={formData.yearsInBusiness} onChange={handleChange} min="0" className={inputClass} /></div>
                  <div className="flex items-center mt-4">
                    <label className="flex items-center gap-2 cursor-pointer"><input type="checkbox" name="isFurnished" checked={formData.isFurnished} onChange={handleChange} className="w-5 h-5 text-[#db7c26] rounded" /><span className="text-sm font-medium">Furnished</span></label>
                  </div>
                  <div><label className={labelClass}>Carpet Area (sq ft)</label>
                    <input type="number" name="carpetAreaSqft" value={formData.carpetAreaSqft} onChange={handleChange} min="0" className={inputClass} /></div>
                  <div className="md:col-span-2"><label className={labelClass}>One Line Description</label>
                    <input type="text" name="oneLineDescription" value={formData.oneLineDescription} onChange={handleChange} className={inputClass} /></div>
                </div>
              )}

              {(getCategoryName() === 'diagnostic centre' || getCategoryName() === 'diagnostic centres' || getCategoryName() === 'diagnostics') && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div><label className={labelClass}>Diagnostic Center Type</label>
                    <select name="diagnosticType" value={formData.diagnosticType} onChange={handleChange} className={inputClass}>
                      <option value="">Select Type</option>
                      <option value="PATHOLOGY_LAB">Pathology Lab</option>
                      <option value="XRAY">X-Ray Center</option>
                      <option value="MRI_CT">MRI / CT Scan</option>
                      <option value="ULTRASOUND">Ultrasound Center</option>
                      <option value="MULTI_MODALITY">Multi-Modality / Full-Service</option>
                    </select></div>
                  <div><label className={labelClass}>Daily Patient Footfall</label>
                    <input type="number" name="dailyPatientFootfall" value={formData.dailyPatientFootfall} onChange={handleChange} min="0" className={inputClass} /></div>
                  <div className="md:col-span-2"><label className={labelClass}>Key Machines (Included in Deal)</label>
                    <textarea name="machinesIncluded" value={formData.machinesIncluded} onChange={handleChange} rows="2" placeholder="List key equipment..." className={inputClass} /></div>
                  <div className="md:col-span-2"><label className={labelClass}>Major Tests Offered</label>
                    <textarea name="testsOffered" value={formData.testsOffered} onChange={handleChange} rows="2" placeholder="List major tests..." className={inputClass} /></div>
                  <div className="flex items-center mt-2">
                    <label className="flex items-center gap-2 cursor-pointer"><input type="checkbox" name="nablAccredited" checked={formData.nablAccredited} onChange={handleChange} className="w-5 h-5 text-[#db7c26] rounded" /><span className="text-sm font-medium">NABL Accredited</span></label>
                  </div>
                </div>
              )}

            </section>
          )}

          {/* Submit Button */}
          <div className="pt-6">
            <button 
              type="submit" 
              disabled={loading}
              className={`w-full py-4 text-white font-bold rounded-2xl transition-all shadow-xl flex items-center justify-center gap-3 text-lg ${
                loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-gradient-to-r from-[#db7c26] to-[#db7c26] hover:scale-[1.02] active:scale-[0.98]'
              }`}
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  {isEditMode ? 'Saving Changes...' : 'Creating Listing...'}
                </>
              ) : (
                <>{isEditMode ? '💾 Save Changes' : '🚀 Publish Your Listing'}</>
              )}
            </button>
            <p className="text-center text-xs text-gray-400 mt-4">
              By publishing, you agree to our Terms of Service. Listings are reviewed within 24 hours.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateListingPage;






