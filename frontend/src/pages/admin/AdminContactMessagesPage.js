import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { adminAPI } from '../../services/api';
import toast from 'react-hot-toast';
import ConfirmationModal from '../../components/common/ConfirmationModal';
import { 
  FiArrowLeft, 
  FiChevronLeft,
  FiChevronRight,
  FiCheckCircle,
  FiTrash2,
  FiEye,
  FiMail,
  FiClock,
  FiMessageSquare,
  FiSend,
  FiX
} from 'react-icons/fi';

const AdminContactMessagesPage = () => {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [totalElements, setTotalElements] = useState(0);
    const [statusFilter, setStatusFilter] = useState('ALL');
    const [confirmModal, setConfirmModal] = useState({ isOpen: false, messageId: null });
    const [stats, setStats] = useState(null);
    const [replyModal, setReplyModal] = useState({ open: false, message: null });
    const [replyContent, setReplyContent] = useState('');
    const [replying, setReplying] = useState(false);

    const fetchStats = useCallback(async () => {
        try {
            const response = await adminAPI.getContactMessageStats();
            setStats(response.data.data);
        } catch (error) {
            console.error('Failed to load contact message stats', error);
        }
    }, []);

    const fetchMessages = useCallback(async () => {
        try {
            setLoading(true);
            const response = await adminAPI.getContactMessages({ page, size: 10, status: statusFilter });
            const data = response.data.data;
            setMessages(data.content || []);
            setTotalPages(data.totalPages || 0);
            setTotalElements(data.totalElements || 0);
        } catch (error) {
            toast.error('Failed to load contact messages');
            console.error(error);
        } finally {
            setLoading(false);
        }
    }, [page, statusFilter]);

    useEffect(() => {
        fetchStats();
    }, [fetchStats]);

    useEffect(() => {
        setPage(0);
        fetchMessages();
    }, [statusFilter]);

    useEffect(() => {
        fetchMessages();
    }, [page, fetchMessages]);

    const formatDate = (dateStr) => {
        return new Date(dateStr).toLocaleDateString('en-IN', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const getStatusStyle = (status) => {
        switch (status) {
            case 'NEW':
                return 'bg-amber-50 text-amber-700 border-amber-200/50';
            case 'READ':
                return 'bg-blue-50 text-blue-700 border-blue-200/50';
            case 'REPLIED':
                return 'bg-green-50 text-green-700 border-green-200/50';
            default:
                return 'bg-gray-50 text-gray-700 border-gray-200/50';
        }
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'NEW':
                return <FiClock className="w-3 h-3" />;
            case 'READ':
                return <FiEye className="w-3 h-3" />;
            case 'REPLIED':
                return <FiCheckCircle className="w-3 h-3" />;
            default:
                return <FiClock className="w-3 h-3" />;
        }
    };

    const handleMarkAsRead = async (id) => {
        try {
            await adminAPI.markContactMessageRead(id);
            toast.success('Message marked as read');
            fetchMessages();
            fetchStats();
        } catch (error) {
            toast.error('Failed to mark message as read');
            console.error(error);
        }
    };

    const handleDelete = async (id) => {
        setConfirmModal({ isOpen: true, messageId: id });
    };

    const confirmDelete = async () => {
        const id = confirmModal.messageId;
        setConfirmModal({ isOpen: false, messageId: null });
        if (!id) return;
        try {
            await adminAPI.deleteContactMessage(id);
            toast.success('Message deleted successfully');
            fetchMessages();
            fetchStats();
        } catch (error) {
            toast.error('Failed to delete message');
            console.error(error);
        }
    };

    const openReplyModal = (msg) => {
        setReplyModal({ open: true, message: msg });
        setReplyContent('');
    };

    const closeReplyModal = () => {
        setReplyModal({ open: false, message: null });
        setReplyContent('');
    };

    const handleReply = async () => {
        if (!replyContent.trim()) {
            toast.error('Please enter a reply message');
            return;
        }
        try {
            setReplying(true);
            await adminAPI.replyToContactMessage(replyModal.message.id, replyContent);
            toast.success('Reply sent successfully');
            closeReplyModal();
            fetchMessages();
            fetchStats();
        } catch (error) {
            toast.error('Failed to send reply');
            console.error(error);
        } finally {
            setReplying(false);
        }
    };

    return (
        <div className="min-h-screen bg-ethereal-surface py-12 px-4 md:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-6">
                    <div>
                        <div className="flex items-center gap-4 mb-3">
                            <Link to="/admin" className="p-2 rounded-xl bg-gray-900/50 text-ethereal-on-surface-variant hover:text-ethereal-primary transition-all duration-300">
                                <FiArrowLeft className="w-5 h-5" />
                            </Link>
                            <span className="section-label tracking-[0.2em]">Communication Hub</span>
                        </div>
                        <h1 className="text-4xl display-title uppercase tracking-tighter">Contact Messages</h1>
                        <p className="text-ethereal-on-surface-variant font-medium mt-1">
                            Managing <span className="text-ethereal-primary font-bold">{totalElements}</span> messages across network
                        </p>
                    </div>
                </div>

                {/* Stats Grid */}
                {stats && (
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                        <div className="glass-card p-6 rounded-[1.5rem] border-none">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="p-2.5 rounded-xl bg-[#f7b538]/20/50 text-[#db7c26]">
                                    <FiMessageSquare size={18} />
                                </div>
                                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-ethereal-on-surface-variant">Total Messages</span>
                            </div>
                            <h3 className="text-2xl font-black text-ethereal-on-surface">{stats.totalMessages || 0}</h3>
                            <p className="text-[10px] uppercase tracking-widest text-[#db7c26] mt-1">All Time Messages</p>
                        </div>
                        <div className="glass-card p-6 rounded-[1.5rem] border-none">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="p-2.5 rounded-xl bg-amber-100/50 text-amber-600">
                                    <FiClock size={18} />
                                </div>
                                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-ethereal-on-surface-variant">New Messages</span>
                            </div>
                            <h3 className="text-2xl font-black text-ethereal-on-surface">{stats.newMessages || 0}</h3>
                            <p className="text-[10px] uppercase tracking-widest text-amber-600 mt-1">Awaiting Review</p>
                        </div>
                        <div className="glass-card p-6 rounded-[1.5rem] border-none">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="p-2.5 rounded-xl bg-blue-100/50 text-blue-600">
                                    <FiEye size={18} />
                                </div>
                                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-ethereal-on-surface-variant">Read Messages</span>
                            </div>
                            <h3 className="text-2xl font-black text-ethereal-on-surface">{stats.readMessages || 0}</h3>
                            <p className="text-[10px] uppercase tracking-widest text-blue-600 mt-1">Reviewed Messages</p>
                        </div>
                        <div className="glass-card p-6 rounded-[1.5rem] border-none overflow-hidden relative">
                            <div className="absolute top-0 right-0 p-4 opacity-5 bg-gradient-to-bl from-green-500 rounded-bl-full w-24 h-24"></div>
                            <div className="flex items-center gap-3 mb-4 relative z-10">
                                <div className="p-2.5 rounded-xl bg-green-100/50 text-green-600">
                                    <FiCheckCircle size={18} />
                                </div>
                                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-ethereal-on-surface-variant">Replied</span>
                            </div>
                            <h3 className="text-2xl font-black text-ethereal-on-surface relative z-10">{stats.repliedMessages || 0}</h3>
                            <p className="text-[10px] uppercase tracking-widest text-green-600 mt-1 relative z-10">Responded Messages</p>
                        </div>
                    </div>
                )}

                {/* Filters */}
                <div className="flex flex-wrap gap-2 mb-6">
                    {['ALL', 'NEW', 'READ', 'REPLIED'].map(status => (
                        <button
                            key={status}
                            onClick={() => setStatusFilter(status)}
                            className={`px-6 py-2.5 rounded-[1.2rem] text-[10px] font-black uppercase tracking-[0.2em] transition-all ${
                                statusFilter === status 
                                ? 'bg-ethereal-primary text-white shadow-lg shadow-ethereal-primary/20' 
                                : 'bg-gray-900 text-ethereal-on-surface-variant hover:bg-ethereal-surface-low shadow-sm'
                            }`}
                        >
                            {status}
                        </button>
                    ))}
                </div>

                {/* Messages Table */}
                <div className="glass-card rounded-[2.5rem] border-none overflow-hidden animate-fadeIn">
                    {loading ? (
                        <div className="p-32 text-center">
                            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-ethereal-primary mx-auto"></div>
                            <p className="text-ethereal-on-surface-variant font-black uppercase tracking-[0.3em] mt-8 text-[10px]">Loading Messages...</p>
                        </div>
                    ) : messages.length === 0 ? (
                        <div className="p-32 text-center">
                            <div className="w-24 h-24 bg-ethereal-surface-low rounded-[2.5rem] flex items-center justify-center mx-auto mb-8 shadow-inner">
                                <FiMail className="w-10 h-10 text-ethereal-primary opacity-40" />
                            </div>
                            <h3 className="text-2xl font-bold text-ethereal-on-surface uppercase tracking-tight">No Messages</h3>
                            <p className="text-ethereal-on-surface-variant font-medium mt-2">No contact messages found for the selected criteria.</p>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-ethereal-surface-low border-b border-ethereal-surface">
                                        <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-ethereal-on-surface-variant">Status & Date</th>
                                        <th className="px-6 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-ethereal-on-surface-variant">Sender Info</th>
                                        <th className="px-6 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-ethereal-on-surface-variant">Subject</th>
                                        <th className="px-6 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-ethereal-on-surface-variant">Message</th>
                                        <th className="px-6 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-ethereal-on-surface-variant">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-ethereal-surface">
                                    {messages.map((msg, idx) => (
                                        <tr key={msg.id} className="hover:bg-ethereal-surface-low/50 transition-all duration-300 animate-fadeIn" style={{ animationDelay: `${idx * 0.05}s` }}>
                                            <td className="px-8 py-6">
                                                <div className="flex flex-col gap-2">
                                                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 text-[9px] font-black tracking-widest uppercase border rounded-full w-fit ${getStatusStyle(msg.status)}`}>
                                                        {getStatusIcon(msg.status)}
                                                        {msg.status}
                                                    </span>
                                                    <div className="flex flex-col gap-1">
                                                        <span className="text-xs font-bold text-ethereal-on-surface">
                                                            {formatDate(msg.createdAt).split(',')[0]}
                                                        </span>
                                                        <span className="text-[10px] font-bold text-ethereal-on-surface-variant uppercase tracking-widest opacity-60">
                                                            {formatDate(msg.createdAt).split(',')[1]}
                                                        </span>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-6">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-10 h-10 bg-ethereal-primary/10 text-ethereal-primary rounded-[0.8rem] flex items-center justify-center font-black shadow-sm">
                                                        <FiMail className="w-4 h-4" />
                                                    </div>
                                                    <div>
                                                        <p className="font-bold text-ethereal-on-surface leading-tight text-sm">{msg.name}</p>
                                                        <p className="text-[10px] font-medium text-ethereal-on-surface-variant tracking-wide mt-0.5">{msg.email}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-6">
                                                <span className="font-bold text-ethereal-on-surface text-sm">{msg.subject}</span>
                                            </td>
                                            <td className="px-6 py-6">
                                                <p className="text-sm text-ethereal-on-surface-variant leading-relaxed line-clamp-2">
                                                    {msg.message && msg.message.length > 100 
                                                        ? `${msg.message.substring(0, 100)}...` 
                                                        : msg.message}
                                                </p>
                                            </td>
                                            <td className="px-6 py-6">
                                                <div className="flex items-center gap-2">
                                                    {msg.status === 'NEW' && (
                                                        <button
                                                            onClick={() => handleMarkAsRead(msg.id)}
                                                            className="p-2.5 rounded-xl bg-blue-500/10 text-blue-500 hover:bg-blue-500/20 transition-all duration-300"
                                                            title="Mark as Read"
                                                        >
                                                            <FiEye className="w-4 h-4" />
                                                        </button>
                                                    )}
                                                    {msg.status !== 'REPLIED' && (
                                                        <button
                                                            onClick={() => openReplyModal(msg)}
                                                            className="p-2.5 rounded-xl bg-green-500/10 text-green-500 hover:bg-green-500/20 transition-all duration-300"
                                                            title="Reply"
                                                        >
                                                            <FiSend className="w-4 h-4" />
                                                        </button>
                                                    )}
                                                    <button
                                                        onClick={() => handleDelete(msg.id)}
                                                        className="p-2.5 rounded-xl bg-rose-500/10 text-rose-500 hover:bg-rose-500/20 transition-all duration-300"
                                                        title="Delete Message"
                                                    >
                                                        <FiTrash2 className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}

                    {/* Sequential Pagination Layer */}
                    {totalPages > 1 && (
                        <div className="bg-ethereal-surface-low/30 px-10 py-8 border-t border-ethereal-surface flex items-center justify-between">
                            <span className="text-[10px] font-black text-ethereal-on-surface-variant uppercase tracking-[0.3em]">
                                Page {page + 1} <span className="mx-3 opacity-20">/</span> {totalPages}
                            </span>
                            <div className="flex gap-4">
                                <button onClick={() => setPage(p => Math.max(0, p - 1))} disabled={page === 0}
                                        className="p-3.5 bg-gray-900 rounded-xl shadow-sm hover:shadow-md disabled:opacity-20 hover:-translate-x-1 transition-all">
                                    <FiChevronLeft className="w-5 h-5" />
                                </button>
                                <button onClick={() => setPage(p => Math.min(totalPages - 1, p + 1))} disabled={page >= totalPages - 1}
                                        className="p-3.5 bg-gray-900 rounded-xl shadow-sm hover:shadow-md disabled:opacity-20 hover:translate-x-1 transition-all">
                                    <FiChevronRight className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Reply Modal */}
            {replyModal.open && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={closeReplyModal}>
                    <div className="bg-gray-900 rounded-[2rem] w-full max-w-2xl shadow-2xl border border-gray-800 animate-fadeIn" onClick={(e) => e.stopPropagation()}>
                        {/* Modal Header */}
                        <div className="flex items-center justify-between p-8 border-b border-gray-800">
                            <div>
                                <h2 className="text-xl font-bold text-white">Reply to Message</h2>
                                <p className="text-sm text-gray-400 mt-1">Replying to <span className="text-ethereal-primary font-bold">{replyModal.message?.name}</span></p>
                            </div>
                            <button onClick={closeReplyModal} className="p-2 rounded-xl hover:bg-gray-800 text-gray-400 hover:text-white transition-all">
                                <FiX className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Original Message */}
                        <div className="px-8 pt-6">
                            <div className="bg-gray-800/50 rounded-xl p-5 border border-gray-700/50">
                                <div className="flex items-center gap-2 mb-3">
                                    <FiMail className="w-4 h-4 text-gray-500" />
                                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">Original Message</span>
                                </div>
                                <p className="text-sm font-bold text-gray-300 mb-1">{replyModal.message?.subject || 'No Subject'}</p>
                                <p className="text-sm text-gray-400 leading-relaxed">{replyModal.message?.message}</p>
                                <p className="text-[10px] text-gray-500 mt-3 uppercase tracking-wider">From: {replyModal.message?.email}</p>
                            </div>
                        </div>

                        {/* Reply Input */}
                        <div className="p-8">
                            <label className="block text-sm font-bold text-gray-300 mb-3">Your Reply</label>
                            <textarea
                                value={replyContent}
                                onChange={(e) => setReplyContent(e.target.value)}
                                rows="5"
                                className="w-full px-5 py-4 bg-gray-800 border border-gray-700 text-white rounded-xl focus:ring-2 focus:ring-ethereal-primary focus:border-transparent outline-none transition placeholder-gray-500 resize-none text-sm leading-relaxed"
                                placeholder="Type your reply here..."
                                autoFocus
                            />
                        </div>

                        {/* Modal Actions */}
                        <div className="flex items-center justify-end gap-3 px-8 pb-8">
                            <button
                                onClick={closeReplyModal}
                                className="px-6 py-3 rounded-xl text-sm font-bold text-gray-400 hover:text-white hover:bg-gray-800 transition-all"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleReply}
                                disabled={replying || !replyContent.trim()}
                                className="px-8 py-3 rounded-xl text-sm font-bold bg-ethereal-primary text-white hover:opacity-90 transition-all flex items-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed shadow-lg shadow-ethereal-primary/20"
                            >
                                {replying ? (
                                    <>
                                        <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white"></div>
                                        Sending...
                                    </>
                                ) : (
                                    <>
                                        <FiSend className="w-4 h-4" />
                                        Send Reply
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            )}
            
            <ConfirmationModal
                isOpen={confirmModal.isOpen}
                onClose={() => setConfirmModal({ isOpen: false, messageId: null })}
                onConfirm={confirmDelete}
                title="Delete Message"
                message="Are you sure you want to delete this contact message? This action cannot be undone."
                confirmText="Delete Message"
                isDanger={true}
            />
        </div>
    );
};

export default AdminContactMessagesPage;
