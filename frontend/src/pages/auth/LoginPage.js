import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FiMail, FiLock, FiEye, FiEyeOff } from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';
import toast from 'react-hot-toast';

const LoginPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { login, isAuthenticated } = useAuth();
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const redirect = location.search ? location.search.split('=')[1] : '/dashboard';

    useEffect(() => { if (isAuthenticated) navigate(redirect); }, [isAuthenticated, navigate, redirect]);

    const validateForm = () => {
        const e = {};
        if (!formData.email) e.email = 'Email is required';
        else if (!/\S+@\S+\.\S+/.test(formData.email)) e.email = 'Invalid email format';
        if (!formData.password) e.password = 'Password is required';
        setErrors(e);
        return Object.keys(e).length === 0;
    };

    const handleSubmit = async (ev) => {
        ev.preventDefault();
        if (!validateForm()) return;
        setLoading(true);
        const result = await login(formData);
        setLoading(false);
        if (result.success) navigate(redirect);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
    };

    return (
        <div className="min-h-full w-full flex overflow-hidden relative bg-transparent">

            {/* Left Pane */}
            <div className="flex-1 hidden md:flex flex-col items-center justify-center p-12 relative z-30 min-h-[70vh]">
                <div className="max-w-md flex flex-col items-center text-center">
                    <Link to="/" className="flex flex-col items-center mb-6">
                        <div className="w-16 h-16 glass bg-[#db7c26]/10 rounded-2xl flex items-center justify-center mb-4 shadow-xl shadow-[#db7c26]/5">
                            <span className="text-gradient font-black text-3xl tracking-tighter">DH</span>
                        </div>
                        <span className="text-[10px] font-black text-white uppercase tracking-[0.5em] opacity-30">DHAcquisitions.co</span>
                    </Link>
                    <div className="space-y-4 text-center">
                        <h1 className="text-5xl font-black text-white tracking-tighter leading-[0.9]">
                            Elevating <span className="text-gradient">Healthcare</span> Standards.
                        </h1>
                        <p className="text-base font-bold text-[#e5e7eb] opacity-60 leading-relaxed max-w-sm mx-auto">
                            Access the most elite marketplace for clinical equipment and specialized medical careers.
                        </p>
                        <div className="pt-6">
                            <div className="inline-flex items-center gap-4 px-5 py-2.5 glass bg-gray-900/50 rounded-xl border-none shadow-sm">
                                <div className="w-2 h-2 rounded-full bg-[#d8572a] animate-pulse" />
                                <span className="text-[9px] font-black uppercase tracking-widest text-[#e5e7eb] opacity-50">Verified Network of 5,000+ Specialists</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Pane */}
            <div className="flex-1 flex items-center justify-center p-6 md:p-12 relative z-30 min-h-[70vh]">
                <div className="max-w-md w-full">
                    <div className="md:hidden text-center mb-8">
                        <h2 className="text-3xl font-black text-white tracking-tighter">Welcome Back</h2>
                    </div>
                    <div className="glass-card p-6 md:p-10 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.1)] relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#db7c26] to-[#d8572a] opacity-60" />
                        <div className="mb-8 text-center md:text-left">
                            <h2 className="text-3xl font-black text-white tracking-tighter leading-none mb-2">Sign <span className="text-gradient">In</span></h2>
                        </div>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label htmlFor="email" className="text-[9px] font-black uppercase tracking-widest text-white mb-2 block">Email Id</label>
                                <div className="relative group/input">
                                    <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-[#d8572a] w-4 h-4 group-focus-within/input:text-[#db7c26]" />
                                    <input id="email" name="email" type="email" value={formData.email} onChange={handleChange}
                                        className={`glass w-full pl-12 pr-4 py-4 bg-gray-900/40 border-none rounded-xl text-white placeholder-[#e5e7eb]/20 font-bold focus:ring-4 focus:ring-[#d8572a]/10 transition-all ${errors.email ? 'ring-4 ring-red-500/5' : ''}`}
                                        placeholder="dr.smith@hospital.com" />
                                </div>
                                {errors.email && <p className="text-[9px] font-bold text-red-500 mt-2 uppercase tracking-wide">{errors.email}</p>}
                            </div>
                            <div>
                                <div className="flex justify-between items-center mb-2">
                                    <label htmlFor="password" className="text-[9px] font-black uppercase tracking-widest text-white">Password</label>
                                    <Link to="/forgot-password" className="text-[9px] font-black text-[#db7c26] hover:text-[#d8572a] uppercase tracking-widest transition-colors">Recover</Link>
                                </div>
                                <div className="relative group/input">
                                    <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-[#d8572a] w-4 h-4 group-focus-within/input:text-[#db7c26]" />
                                    <input id="password" name="password" type={showPassword ? 'text' : 'password'} value={formData.password} onChange={handleChange}
                                        className={`glass w-full pl-12 pr-12 py-4 bg-gray-900/40 border-none rounded-xl text-white placeholder-[#e5e7eb]/20 font-bold focus:ring-4 focus:ring-[#d8572a]/10 transition-all ${errors.password ? 'ring-4 ring-red-500/5' : ''}`}
                                        placeholder="••••••••" />
                                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-[#f7b538] hover:text-[#db7c26] transition-colors">
                                        {showPassword ? <FiEyeOff className="w-4 h-4" /> : <FiEye className="w-4 h-4" />}
                                    </button>
                                </div>
                                {errors.password && <p className="text-[9px] font-bold text-red-500 mt-2 uppercase tracking-wide">{errors.password}</p>}
                            </div>
                            <div className="flex items-center pb-1">
                                <label className="flex items-center cursor-pointer group/check">
                                    <div className="relative">
                                        <input type="checkbox" className="peer w-4 h-4 opacity-0 absolute cursor-pointer" />
                                        <div className="w-4 h-4 rounded-lg border-none glass bg-[#db7c26]/10 peer-checked:bg-[#db7c26] flex items-center justify-center transition-all">
                                            <div className="w-1.5 h-1.5 rounded-full bg-gray-900 opacity-0 peer-checked:opacity-100 transition-opacity" />
                                        </div>
                                    </div>
                                    <span className="ml-3 text-[9px] font-black uppercase tracking-widest text-[#e5e7eb] opacity-40 group-hover/check:opacity-100 transition-opacity">Remember Login</span>
                                </label>
                            </div>
                            <button type="submit" disabled={loading}
                                className="btn-gradient w-full py-5 rounded-2xl font-black text-xs uppercase tracking-[0.3em] shadow-xl shadow-[#db7c26]/20 hover:shadow-[#db7c26]/40 hover:-translate-y-1 transition-all flex items-center justify-center gap-4 mt-2">
                                {loading ? <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-gray-900"></div> : <>Login <FiLock className="w-4 h-4" /></>}
                            </button>
                        </form>
                    </div>
                    <div className="mt-8 text-center md:flex items-center justify-center gap-6">
                        <p className="text-[9px] font-black text-[#e5e7eb] opacity-30 uppercase tracking-[0.2em]">Don't have an account?</p>
                        <Link to="/register" className="glass px-6 py-2.5 rounded-full text-[9px] font-black text-[#db7c26] hover:text-[#d8572a] uppercase tracking-widest transition-all hover:bg-gray-900 inline-block mt-4 md:mt-0">Sign Up</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;





