import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { adminAPI } from '../../services/api';
import { FiUsers, FiList, FiBriefcase, FiMail, FiCheck, FiX, FiEye, FiCreditCard } from 'react-icons/fi';

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => { fetchStats(); }, []);

  const fetchStats = async () => {
    try {
      const response = await adminAPI.getDashboardStats();
      setStats(response.data.data);
    } catch (error) { console.error('Error fetching stats:', error); }
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-ethereal-surface flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-ethereal-primary"></div>
      </div>
    );
  }

  const statCards = [
    { title: 'Total Network Users', value: stats?.totalUsers || 0, icon: FiUsers, gradient: 'from-blue-500/20 to-indigo-500/20', accent: 'text-blue-600', label: stats?.newUsersToday ? `+${stats.newUsersToday} recently` : 'Stable growth' },
    { title: 'Active Listings', value: stats?.totalListings || 0, icon: FiList, gradient: 'from-[#d8572a]/20 to-[#d8572a]/20', accent: 'text-[#db7c26]', label: stats?.pendingListings ? `${stats.pendingListings} pending review` : 'All caught up' },
    { title: 'Career Opportunities', value: stats?.totalJobs || 0, icon: FiBriefcase, gradient: 'from-purple-500/20 to-pink-500/20', accent: 'text-purple-600', label: stats?.pendingJobs ? `${stats.pendingJobs} processing` : 'Optimized flow' },
    { title: 'Strategic Inquiries', value: stats?.inquiriesToday || 0, icon: FiMail, gradient: 'from-orange-500/20 to-red-500/20', accent: 'text-orange-600', label: '24h activity' }
  ];

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-gray-900 via-gray-900 to-[#d8572a]/10 py-12 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <span className="section-label mb-2 block tracking-[0.2em]">Administrative Control</span>
          <h1 className="text-4xl display-title uppercase tracking-tighter">Command Center</h1>
          <p className="text-ethereal-on-surface-variant font-medium mt-1">Platform-wide analytics and strategic orchestration</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {statCards.map((stat, idx) => (
            <div key={stat.title} className="bg-gray-800/40 backdrop-blur-xl border border-white/5 p-10 rounded-[2.5rem] animate-fadeIn group hover:bg-gray-800/60 hover:border-white/10 transition-all duration-500 shadow-2xl relative overflow-hidden" style={{ animationDelay: `${idx * 0.1}s` }}>
              <div className={`absolute -right-10 -top-10 w-32 h-32 bg-gradient-to-br ${stat.gradient} rounded-full blur-3xl opacity-20 group-hover:opacity-40 transition-opacity duration-500`}></div>
              <div className="flex items-center justify-between mb-10 relative z-10">
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${stat.gradient} border border-white/5 flex items-center justify-center group-hover:scale-110 transition-transform duration-500 shadow-lg`}>
                  <stat.icon className={`w-8 h-8 ${stat.accent}`} />
                </div>
                <span className="text-[10px] font-black uppercase tracking-widest text-gray-400 bg-gray-900/50 px-3 py-1.5 rounded-full border border-white/5">{stat.label}</span>
              </div>
              <h3 className="text-5xl font-black text-white mb-2 tracking-tighter relative z-10">{stat.value.toLocaleString()}</h3>
              <p className="text-xs font-bold text-gray-500 uppercase tracking-[0.2em] relative z-10">{stat.title}</p>
            </div>
          ))}
        </div>

        {/* Core Operations */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          <div className="lg:col-span-2 bg-gray-800/40 backdrop-blur-xl border border-white/5 p-10 md:p-12 rounded-[2.5rem] shadow-2xl">
            <div className="flex justify-between items-center mb-10">
              <h2 className="text-2xl font-bold text-ethereal-on-surface tracking-tight">Active Pipeline</h2>
              <Link to="/admin/listings?status=PENDING" className="text-ethereal-primary text-sm font-black uppercase tracking-widest hover:underline">Full Audit</Link>
            </div>
            <div className="grid gap-4">
              <div className="flex items-center justify-between p-6 bg-ethereal-surface-low/50 rounded-3xl group hover:bg-gray-900 transition-all duration-300">
                <div className="flex items-center gap-5">
                  <div className="p-4 rounded-2xl bg-orange-100/50 text-orange-600"><FiList size={22} /></div>
                  <div>
                    <p className="font-bold text-ethereal-on-surface">Listings Vetting</p>
                    <p className="text-xs font-medium text-ethereal-on-surface-variant opacity-60">{stats?.pendingListings || 0} assets awaiting clinical verification</p>
                  </div>
                </div>
                <Link to="/admin/listings?status=PENDING" className="btn-ethereal-secondary !px-6 !py-2.5 text-xs font-black">Verify</Link>
              </div>
              <div className="flex items-center justify-between p-6 bg-ethereal-surface-low/50 rounded-3xl group hover:bg-gray-900 transition-all duration-300">
                <div className="flex items-center gap-5">
                  <div className="p-4 rounded-2xl bg-purple-100/50 text-purple-600"><FiBriefcase size={22} /></div>
                  <div>
                    <p className="font-bold text-ethereal-on-surface">Career Path Approval</p>
                    <p className="text-xs font-medium text-ethereal-on-surface-variant opacity-60">{stats?.pendingJobs || 0} professional roles in processing</p>
                  </div>
                </div>
                <Link to="/admin/jobs?status=PENDING" className="btn-ethereal-secondary !px-6 !py-2.5 text-xs font-black">Audit</Link>
              </div>
              <div className="flex items-center justify-between p-6 bg-ethereal-surface-low/50 rounded-3xl group hover:bg-gray-900 transition-all duration-300">
                <div className="flex items-center gap-5">
                  <div className="p-4 rounded-2xl bg-blue-100/50 text-blue-600"><FiUsers size={22} /></div>
                  <div>
                    <p className="font-bold text-ethereal-on-surface">KYC Integrity Suite</p>
                    <p className="text-xs font-medium text-ethereal-on-surface-variant opacity-60">{stats?.pendingVerifications || 0} buyer identity requests</p>
                  </div>
                </div>
                <Link to="/admin/verifications" className="btn-ethereal-secondary !px-6 !py-2.5 text-xs font-black">Authorize</Link>
              </div>
            </div>
          </div>

          <div className="bg-gray-800/40 backdrop-blur-xl border border-white/5 p-10 md:p-12 rounded-[2.5rem] shadow-2xl">
            <h2 className="text-2xl font-bold text-ethereal-on-surface tracking-tight mb-8">Pulse Report</h2>
            <div className="space-y-6">
              {[
                { label: 'New Entities', value: stats?.newUsersToday, color: 'bg-green-500' },
                { label: 'Asset Intake', value: stats?.newListingsToday, color: 'bg-blue-500' },
                { label: 'Network Inquiries', value: stats?.inquiriesToday, color: 'bg-orange-500' },
                { label: 'Talent Moves', value: stats?.applicationsToday, color: 'bg-purple-500' },
                { label: 'Weekly Growth', value: stats?.newUsersWeek, color: 'bg-pink-500' },
              ].map((item) => (
                <div key={item.label} className="flex items-center justify-between group">
                  <div className="flex items-center gap-4">
                    <div className={`w-1.5 h-1.5 ${item.color} rounded-full`}></div>
                    <span className="text-sm font-bold text-ethereal-on-surface-variant uppercase tracking-wider group-hover:text-ethereal-primary transition-colors">{item.label}</span>
                  </div>
                  <span className="text-lg font-black text-ethereal-on-surface">{item.value || 0}</span>
                </div>
              ))}
            </div>
            <div className="mt-12 p-6 rounded-3xl bg-ethereal-primary/5 border border-ethereal-primary/10">
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-ethereal-primary mb-2">Systems Status</p>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-xs font-bold text-ethereal-on-surface">Core Infrastructure Nominal</span>
              </div>
            </div>
          </div>
        </div>

        {/* Global Strategy Tools */}
        <div className="bg-gray-800/40 backdrop-blur-xl border border-white/5 p-10 md:p-12 rounded-[2.5rem] shadow-2xl">
          <h2 className="text-2xl font-bold text-ethereal-on-surface tracking-tight mb-10">Ecosystem Management</h2>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { to: '/admin/listings', icon: FiList, label: 'Asset Library' },
              { to: '/admin/jobs', icon: FiBriefcase, label: 'Talent Pool' },
              { to: '/admin/users', icon: FiUsers, label: 'Entity Directory' },
              { to: '/admin/verifications', icon: FiCheck, label: 'Trust Gateway' },
              { to: '/admin/payments', icon: FiCreditCard, label: 'Financial Core' },
              { to: '/admin/contact-messages', icon: FiMail, label: 'Contact Messages' },
            ].map((link) => (
              <Link key={link.label} to={link.to} className="group p-8 bg-ethereal-surface-low/50 rounded-3xl hover:bg-ethereal-primary hover:text-white transition-all duration-500 text-center">
                <link.icon className="w-8 h-8 mx-auto mb-4 text-ethereal-on-surface-variant group-hover:text-white transition-colors" />
                <p className="font-bold uppercase tracking-widest text-[10px]">{link.label}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;




