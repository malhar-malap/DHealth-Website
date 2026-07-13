import React, { useState, useEffect } from 'react';
import { useNavigate, Link, useParams } from 'react-router-dom';
import { jobsAPI, masterAPI } from '../../services/api';
import { useAuth } from '../../context/AuthContext';

const CreateJobPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = !!id;
  const { isAuthenticated } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const [jobCategories, setJobCategories] = useState([]);
  const [cities, setCities] = useState([]);

  const [formData, setFormData] = useState({
    title: '', jobCategoryId: '', specialisation: '', employmentType: '',
    salaryMinLpa: '', salaryMaxLpa: '', cityName: '', experienceRequired: '',
    qualifications: '', description: '', applicationDeadline: '',
    numberOfOpenings: 1, contactEmail: '',
  });

  useEffect(() => {
    masterAPI.getJobCategories().then(res => setJobCategories(res.data?.data || [])).catch(() => {});
    masterAPI.getCities().then(res => setCities(res.data?.data || [])).catch(() => {});
  }, []);

  useEffect(() => {
    if (isEditMode) {
      setLoading(true);
      jobsAPI.getById(id).then(res => {
        const job = res.data.data;
        setFormData({
          title: job.title || '',
          jobCategoryId: job.jobCategory?.id || job.jobCategoryId || '',
          specialisation: job.specialisation || '',
          employmentType: job.employmentType || '',
          salaryMinLpa: job.salaryMinLpa || '',
          salaryMaxLpa: job.salaryMaxLpa || '',
          cityName: job.cityName || job.city?.name || '',
          experienceRequired: job.experienceRequired || '',
          qualifications: job.qualifications || '',
          description: job.description || '',
          applicationDeadline: job.applicationDeadline ? new Date(job.applicationDeadline).toISOString().split('T')[0] : '',
          numberOfOpenings: job.numberOfOpenings || 1,
          contactEmail: job.contactEmail || '',
        });
        setLoading(false);
      }).catch(err => {
        setError('Failed to fetch job details');
        setLoading(false);
      });
    }
  }, [id, isEditMode]);


  const handleChange = (e) => {
    const { name, value, type } = e.target;
    if (e.target.getAttribute('type') === 'number' && value !== '') {
      if (parseFloat(value) < 0) return;
    }
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if user is logged in before attempting to post
    if (!isAuthenticated) {
      setError('LOGIN_REQUIRED');
      return;
    }

    setLoading(true); setError(''); setSuccess('');
    try {
      const payload = {
        title: formData.title,
        jobCategoryId: parseInt(formData.jobCategoryId),
        specialisation: formData.specialisation,
        employmentType: formData.employmentType,
        cityName: formData.cityName,
        experienceRequired: formData.experienceRequired,
        qualifications: formData.qualifications,
        description: formData.description,
        applicationDeadline: formData.applicationDeadline,
        numberOfOpenings: parseInt(formData.numberOfOpenings) || 1,
        contactEmail: formData.contactEmail,
      };
      if (formData.salaryMinLpa) payload.salaryMinLpa = parseFloat(formData.salaryMinLpa);
      if (formData.salaryMaxLpa) payload.salaryMaxLpa = parseFloat(formData.salaryMaxLpa);

      if (isEditMode) {
        await jobsAPI.update(id, payload);
        setSuccess('Job updated successfully!');
      } else {
        await jobsAPI.create(payload);
        setSuccess('Job posted successfully! It will be reviewed by admin.');
      }
      setTimeout(() => navigate('/dashboard'), 2000);
    } catch (err) {
      const status = err.response?.status;
      if (status === 401 || status === 403) {
        setError('LOGIN_REQUIRED');
      } else {
        setError(err.response?.data?.message || 'Failed to post job. Please check all fields.');
      }
    } finally { setLoading(false); }
  };

  const inputClass = "w-full px-4 py-2.5 border border-gray-600 rounded-lg focus:ring-2 focus:ring-[#d8572a] focus:border-transparent outline-none transition bg-gray-900 text-gray-200 placeholder-gray-500";
  const labelClass = "block text-sm font-semibold text-gray-300 mb-1";

  return (
    <div className="min-h-screen bg-gray-800 py-8">
      <div className="max-w-3xl mx-auto px-4">
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-gray-400 hover:text-[#db7c26] mb-6 transition">
          ← Back
        </button>

        <h1 className="text-2xl font-bold text-gray-200 mb-2">{isEditMode ? 'Edit Job' : 'Post a Job'}</h1>
        <p className="text-gray-500 mb-6">{isEditMode ? 'Update your job posting details.' : 'Hire healthcare professionals for your organization.'}</p>

        {error && error === 'LOGIN_REQUIRED' ? (
          <div className="bg-amber-900/30 border-l-4 border-amber-500 p-5 rounded-lg mb-4">
            <div className="flex items-start">
              <div className="flex-shrink-0 text-2xl">🔒</div>
              <div className="ml-4">
                <p className="text-base text-amber-200 font-semibold mb-1">Authentication Required</p>
                <p className="text-sm text-amber-300/80 mb-3">Please login or sign up to post jobs on DHealth.</p>
                <div className="flex gap-3">
                  <Link to="/login" className="px-4 py-2 bg-[#db7c26] text-white text-sm font-semibold rounded-lg hover:bg-[#c56a1e] transition">Login</Link>
                  <Link to="/register" className="px-4 py-2 border border-amber-500 text-amber-300 text-sm font-semibold rounded-lg hover:bg-amber-500/10 transition">Sign Up</Link>
                </div>
              </div>
            </div>
          </div>
        ) : error ? (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4">{error}</div>
        ) : null}
        {success && <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg mb-4">{success}</div>}

        <form onSubmit={handleSubmit} className="space-y-6 bg-gray-900 p-6 rounded-xl shadow-sm border">
          {/* Job Title */}
          <div>
            <label className={labelClass}>Job Title *</label>
            <input type="text" name="title" value={formData.title} onChange={handleChange} required maxLength="200"
              placeholder="e.g., Senior Cardiologist" className={inputClass} />
          </div>

          {/* Category & Employment Type */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Job Category *</label>
              <select name="jobCategoryId" value={formData.jobCategoryId} onChange={handleChange} required className={inputClass}>
                <option value="">Select Category</option>
                {jobCategories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
            </div>
            <div>
              <label className={labelClass}>Employment Type *</label>
              <select name="employmentType" value={formData.employmentType} onChange={handleChange} required className={inputClass}>
                <option value="">Select Type</option>
                <option value="FULL_TIME">Full Time</option>
                <option value="PART_TIME">Part Time</option>
                <option value="CONTRACT">Contract</option>
                <option value="LOCUM">Locum</option>
                <option value="INTERNSHIP">Internship</option>
              </select>
            </div>
          </div>

          {/* Specialisation & Experience */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Specialisation</label>
              <input type="text" name="specialisation" value={formData.specialisation} onChange={handleChange}
                placeholder="e.g., Cardiology, Radiology" className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Experience Required *</label>
              <select name="experienceRequired" value={formData.experienceRequired} onChange={handleChange} required className={inputClass}>
                <option value="">Select</option>
                <option value="FRESHER">Fresher</option>
                <option value="ONE_TO_THREE">1-3 Years</option>
                <option value="THREE_TO_FIVE">3-5 Years</option>
                <option value="FIVE_TO_TEN">5-10 Years</option>
                <option value="TEN_PLUS">10+ Years</option>
              </select>
            </div>
          </div>

          {/* Salary & City */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className={labelClass}>Min Salary (LPA)</label>
              <input type="number" name="salaryMinLpa" value={formData.salaryMinLpa} onChange={handleChange}
                step="0.5" min="0" placeholder="e.g., 8" className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Max Salary (LPA)</label>
              <input type="number" name="salaryMaxLpa" value={formData.salaryMaxLpa} onChange={handleChange}
                step="0.5" min="0" placeholder="e.g., 20" className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>City *</label>
              <input type="text" name="cityName" value={formData.cityName} onChange={handleChange}
                required list="jobCityList" placeholder="Search or select city" className={inputClass} autoComplete="off" />
              <datalist id="jobCityList">
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
            </div>
          </div>

          {/* Qualifications */}
          <div>
            <label className={labelClass}>Qualifications</label>
            <input type="text" name="qualifications" value={formData.qualifications} onChange={handleChange}
              placeholder="e.g., MBBS, MD Cardiology" className={inputClass} />
          </div>

          {/* Description */}
          <div>
            <label className={labelClass}>Job Description *</label>
            <textarea name="description" value={formData.description} onChange={handleChange} rows="5" required
              maxLength="3000" placeholder="Full job description, responsibilities, requirements..." className={inputClass} />
          </div>

          {/* Openings, Deadline, Contact */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className={labelClass}>Openings</label>
              <input type="number" name="numberOfOpenings" value={formData.numberOfOpenings} onChange={handleChange}
                min="1" className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Application Deadline *</label>
              <input type="date" name="applicationDeadline" value={formData.applicationDeadline} onChange={handleChange}
                required className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Contact Email *</label>
              <input type="email" name="contactEmail" value={formData.contactEmail} onChange={handleChange}
                required placeholder="hr@hospital.com" className={inputClass} />
            </div>
          </div>

          {/* Submit */}
          <button type="submit" disabled={loading}
            className="w-full py-3 bg-[#db7c26] text-white font-semibold rounded-lg hover:bg-[#3a5578] disabled:opacity-50 transition flex items-center justify-center gap-2">
            ✉ {loading ? (isEditMode ? 'Updating...' : 'Posting...') : (isEditMode ? 'Update Job' : 'Post Job')}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateJobPage;




