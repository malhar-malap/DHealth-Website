import React, { useState, useEffect } from 'react';
import { adminAPI } from '../../services/api';
import { FiSearch, FiFilter, FiActivity, FiClock, FiUser, FiInfo } from 'react-icons/fi';
import toast from 'react-hot-toast';

const AdminLogsPage = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({ page: 0, size: 20, totalPages: 0, totalElements: 0 });
  const [filters, setFilters] = useState({
    userId: '',
    action: ''
  });

  const fetchLogs = async (page = 0) => {
    try {
      setLoading(true);
      const params = { page, size: pagination.size };
      if (filters.userId) params.userId = filters.userId;
      if (filters.action) params.action = filters.action;

      const res = await adminAPI.getAuditLogs(params);
      const data = res.data.data;
      setLogs(data.content || []);
      setPagination(prev => ({
        ...prev,
        page: data.number,
        totalPages: data.totalPages,
        totalElements: data.totalElements
      }));
    } catch (error) {
      console.error("Error fetching logs:", error);
      toast.error("Failed to load audit logs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs(0);
  }, []);

  const handleFilterChange = (e) => {
    setFilters(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const applyFilters = () => {
    fetchLogs(0);
  };

  const clearFilters = () => {
    setFilters({ userId: '', action: '' });
    setTimeout(() => fetchLogs(0), 0);
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const dateStr = dateString.endsWith('Z') ? dateString : `${dateString}Z`;
    const date = new Date(dateStr);
    return date.toLocaleString();
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-200 flex items-center gap-2">
            <FiActivity className="text-primary-500" /> System Audit Logs
          </h1>
          <p className="text-gray-400 mt-1">Track high-value user and system actions.</p>
        </div>
      </div>

      {/* Filters */}
      <div className="glass p-4 rounded-xl shadow-lg border border-gray-700/50 flex flex-col md:flex-row gap-4 items-end">
        <div className="flex-1 w-full relative">
          <label className="block text-xs font-medium text-gray-400 mb-1">Filter by User ID</label>
          <div className="relative">
            <FiUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
            <input 
              type="text" 
              name="userId"
              value={filters.userId}
              onChange={handleFilterChange}
              placeholder="e.g. 42" 
              className="w-full pl-10 pr-4 py-2 bg-gray-900/50 border border-gray-700 rounded-lg focus:outline-none focus:border-primary-500 text-gray-200"
            />
          </div>
        </div>
        <div className="flex-1 w-full relative">
          <label className="block text-xs font-medium text-gray-400 mb-1">Filter by Action</label>
          <div className="relative">
            <FiFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
            <input 
              type="text" 
              name="action"
              value={filters.action}
              onChange={handleFilterChange}
              placeholder="e.g. VERIFY_PAYMENT" 
              className="w-full pl-10 pr-4 py-2 bg-gray-900/50 border border-gray-700 rounded-lg focus:outline-none focus:border-primary-500 text-gray-200"
            />
          </div>
        </div>
        <div className="flex gap-2 w-full md:w-auto">
          <button onClick={applyFilters} className="btn-gradient px-6 py-2 rounded-lg font-semibold flex-1 md:flex-none">
            Filter
          </button>
          <button onClick={clearFilters} className="px-6 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors flex-1 md:flex-none">
            Clear
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="glass rounded-xl shadow-xl border border-gray-700/50 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-900/50 text-gray-400 text-sm uppercase tracking-wider">
                <th className="p-4 font-semibold w-24">Log ID</th>
                <th className="p-4 font-semibold">Actor</th>
                <th className="p-4 font-semibold">Action</th>
                <th className="p-4 font-semibold">Target / Entity</th>
                <th className="p-4 font-semibold">Details / IP</th>
                <th className="p-4 font-semibold w-48">Timestamp</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {loading ? (
                <tr>
                  <td colSpan="6" className="p-8 text-center text-gray-400">
                    <div className="flex justify-center items-center">
                      <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary-500"></div>
                    </div>
                  </td>
                </tr>
              ) : logs.length === 0 ? (
                <tr>
                  <td colSpan="6" className="p-8 text-center text-gray-400">
                    No logs found.
                  </td>
                </tr>
              ) : (
                logs.map((log) => (
                  <tr key={log.id} className="hover:bg-gray-800/30 transition-colors">
                    <td className="p-4 text-gray-300">#{log.id}</td>
                    <td className="p-4">
                      <div className="flex flex-col">
                        <span className="text-sm font-semibold text-gray-200">
                          {log.actorName || `User`}
                        </span>
                        <span className="text-xs text-gray-500">ID: {log.userId}</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className="text-primary-400 font-semibold text-sm tracking-wide bg-primary-500/10 px-3 py-1 rounded-full">
                        {log.action}
                      </span>
                    </td>
                    <td className="p-4 text-gray-300">
                      <div className="flex flex-col">
                        <span className="text-sm">{log.entityType}</span>
                        {log.targetName && <span className="text-xs font-semibold text-primary-400">{log.targetName}</span>}
                        {log.entityId && !log.targetName && <span className="text-xs text-gray-500">#{log.entityId}</span>}
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="text-sm text-gray-300 max-w-xs truncate" title={log.details}>
                        {log.details || '-'}
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        IP: {log.ipAddress || 'Unknown'}
                      </div>
                    </td>
                    <td className="p-4 text-sm text-gray-400">
                      <div className="flex items-center gap-1.5">
                        <FiClock /> {formatDate(log.timestamp)}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {!loading && pagination.totalPages > 1 && (
          <div className="p-4 border-t border-gray-800 flex items-center justify-between bg-gray-900/30">
            <span className="text-sm text-gray-400">
              Showing page {pagination.page + 1} of {pagination.totalPages} ({pagination.totalElements} total logs)
            </span>
            <div className="flex gap-2">
              <button
                disabled={pagination.page === 0}
                onClick={() => fetchLogs(pagination.page - 1)}
                className="px-3 py-1.5 bg-gray-800 hover:bg-gray-700 disabled:opacity-50 text-gray-300 rounded text-sm transition-colors"
              >
                Previous
              </button>
              <button
                disabled={pagination.page >= pagination.totalPages - 1}
                onClick={() => fetchLogs(pagination.page + 1)}
                className="px-3 py-1.5 bg-gray-800 hover:bg-gray-700 disabled:opacity-50 text-gray-300 rounded text-sm transition-colors"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminLogsPage;
