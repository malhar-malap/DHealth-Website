import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { FiShield, FiFileText, FiRefreshCcw, FiArrowLeft } from 'react-icons/fi';

const LegalCenterPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Determine active tab based on URL path
  const getInitialTab = () => {
    if (location.pathname.includes('/terms')) return 'terms';
    if (location.pathname.includes('/refund-policy')) return 'refund';
    return 'privacy';
  };

  const [activeTab, setActiveTab] = useState(getInitialTab());

  // Sync tab with URL if user navigates back/forward
  useEffect(() => {
    setActiveTab(getInitialTab());
  }, [location.pathname]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    if (tab === 'privacy') navigate('/privacy');
    else if (tab === 'terms') navigate('/terms');
    else if (tab === 'refund') navigate('/refund-policy');
  };

  const tabs = [
    { id: 'privacy', label: 'Privacy Policy', icon: FiShield },
    { id: 'terms', label: 'Terms of Service', icon: FiFileText },
    { id: 'refund', label: 'Refund Policy', icon: FiRefreshCcw }
  ];

  const content = {
    privacy: {
      subtitle: 'CUSTOMER SECURITY',
      title: 'Privacy Policy',
      lastUpdated: 'April 17, 2026',
      sections: [
        {
          title: 'Introduction',
          body: 'DHAcquisitions.co, operated by Dhumavati Consulting LLP ("we", "us", "our"), is committed to protecting the privacy of our users. This Privacy Policy explains how we collect, use, disclose, and safeguard your personal information when you use our healthcare marketplace platform ("Platform"). By using the Platform, you consent to the practices described in this policy.'
        },
        {
          title: 'Information We Collect',
          body: 'We collect Personal Information (Account Registration, Seller Listings, Job Postings, Buyer Verification, Payment Information) and Automatically Collected Information (Browser type, IP address, navigation patterns). We do not store credit/debit card details on our servers.'
        },
        {
          title: 'How We Use Your Information',
          body: 'We use the collected information for Account Management, Marketplace Operations, Verification, Communication, Platform Improvement, and Legal Compliance.'
        },
        {
          title: 'Information Sharing & Disclosure',
          body: 'We do not sell your personal information. We may share your information only in specific circumstances such as Seller Contact Access (when a buyer purchases access), Inquiry System, Payment Processing (with Razorpay), Legal Requirements, and Platform Administration.'
        },
        {
          title: 'Data Security',
          body: 'We implement industry-standard security measures including encrypted password storage using BCrypt, JWT-based authentication tokens, secure HTTPS connections, and role-based access controls. While we strive to use commercially acceptable means to protect your data, no method of electronic transmission or storage is 100% secure.'
        },
        {
          title: 'Data Retention',
          body: 'We retain your personal information for as long as your account is active or as needed to provide our services. You may request deletion of your account and associated data by contacting our support team, subject to legal retention requirements.'
        },
        {
          title: 'Cookies & Tracking',
          body: 'Our Platform uses local storage and session tokens to maintain your authentication state and preferences. We may use analytics tools to understand usage patterns and improve our services.'
        }
      ]
    },
    terms: {
      subtitle: 'PLATFORM GOVERNANCE',
      title: 'Terms of Service',
      lastUpdated: 'April 17, 2026',
      sections: [
        {
          title: 'Acceptance of Terms',
          body: 'By accessing and using the DHAcquisitions.co platform ("Platform"), operated by Dhumavati Consulting LLP, you agree to be bound by these Terms of Service. If you do not agree with any part of these terms, you must not use the Platform.'
        },
        {
          title: 'Description of Services',
          body: 'DHAcquisitions.co is India\'s premier healthcare business marketplace. Our Platform enables users to buy, sell, and lease healthcare businesses, list partial stake sale opportunities, post and apply for healthcare industry jobs, and access seller contact details through a secure, paid access model.'
        },
        {
          title: 'User Accounts & Registration',
          body: 'To access certain features, you must create an account and provide accurate, current, and complete information. You are responsible for all activity under your account. We reserve the right to suspend or terminate accounts that violate these terms.'
        },
        {
          title: 'Listing & Content Guidelines',
          body: 'Users who post listings must ensure all information is accurate, truthful, and not misleading. They must have legal authority to sell or lease the listed entity. We reserve the right to review, approve, edit, or remove any listing at our sole discretion.'
        },
        {
          title: 'Payments & Refund Policy',
          body: 'Certain services require payment processed securely through Razorpay. Payments for contact access are non-refundable once details have been delivered. Do not share purchased contact details with unauthorized third parties.'
        },
        {
          title: 'Buyer Verification',
          body: 'To maintain marketplace integrity, buyers may be required to complete a verification process. Verified buyers gain enhanced credibility and access to exclusive features.'
        },
        {
          title: 'Intellectual Property',
          body: 'All content on the Platform is the intellectual property of Dhumavati Consulting LLP or its licensors. You may not reproduce or distribute any Platform content without prior written consent.'
        },
        {
          title: 'Limitation of Liability',
          body: 'DHAcquisitions.co acts solely as a marketplace platform. We do not guarantee the accuracy of listing information, assume liability for losses arising from deals, or provide legal, financial, or medical advice. Users should conduct their own due diligence.'
        }
      ]
    },
    refund: {
      subtitle: 'TRANSACTION POLICY',
      title: 'Refund Policy',
      lastUpdated: 'April 17, 2026',
      sections: [
        {
          title: 'General Refund Guidelines',
          body: 'At DHAcquisitions.co, all payments made for unlocking seller contact details or premium listing features are generally considered final and non-refundable, as the service (delivery of information) is executed immediately upon successful payment.'
        },
        {
          title: 'Exceptions for Refunds',
          body: 'Refunds will only be processed under the following circumstances: (1) A technical failure resulting in duplicate charges for a single transaction. (2) The system fails to provide the purchased contact details after a successful payment deduction.'
        },
        {
          title: 'Refund Process',
          body: 'If you believe you are eligible for a refund due to a technical error, you must contact our support team within 48 hours of the transaction. Please provide your transaction ID, registered email address, and a brief explanation of the issue.'
        },
        {
          title: 'Processing Time',
          body: 'Approved refunds will be processed and credited back to the original method of payment within 5-7 business days, depending on your bank or payment provider\'s processing times.'
        }
      ]
    }
  };

  const activeData = content[activeTab];

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-gray-900 via-gray-900 to-[#d8572a]/10 pb-20 pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Back Link */}
        <div className="mb-8">
          <Link to="/" className="inline-flex items-center text-cyan-400 hover:text-cyan-300 font-semibold transition-colors">
            <FiArrowLeft className="mr-2" /> Back to Home
          </Link>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Sidebar */}
          <div className="w-full lg:w-80 flex-shrink-0">
            <div className="bg-gray-900/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6 sticky top-24 shadow-2xl">
              <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-gray-500 mb-6 px-4">Legal Center</h3>
              <nav className="space-y-2">
                {tabs.map((tab) => {
                  const isActive = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => handleTabChange(tab.id)}
                      className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl font-bold transition-all duration-300 ${
                        isActive 
                          ? 'bg-gradient-to-r from-cyan-500 to-cyan-400 text-gray-900 shadow-[0_0_20px_rgba(34,211,238,0.3)]' 
                          : 'text-gray-300 hover:bg-white/5 hover:text-white'
                      }`}
                    >
                      <tab.icon className={`w-5 h-5 ${isActive ? 'text-gray-900' : 'text-cyan-500'}`} />
                      {tab.label}
                    </button>
                  );
                })}
              </nav>
            </div>
          </div>

          {/* Content Area */}
          <div className="flex-1">
            <div className="bg-gray-900/50 backdrop-blur-xl border border-white/5 rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden">
              
              {/* Header */}
              <div className="mb-12 border-b border-white/10 pb-8 pt-6 relative">
                <div className="absolute top-0 left-0 w-32 h-1 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full"></div>
                <h4 className="text-cyan-500 font-black uppercase tracking-widest text-xs mb-3">{activeData.subtitle}</h4>
                <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4">{activeData.title}</h1>
                <p className="text-gray-400 font-medium text-sm">Last Updated: {activeData.lastUpdated}</p>
              </div>

              {/* Sections */}
              <div className="space-y-12">
                {activeData.sections.map((section, index) => {
                  const sectionNumber = String(index + 1).padStart(2, '0');
                  return (
                    <div key={index} className="group">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center font-black text-sm group-hover:bg-cyan-500/20 transition-colors">
                          {sectionNumber}
                        </div>
                        <h2 className="text-2xl font-bold text-white tracking-tight">{section.title}</h2>
                      </div>
                      <div className="pl-14 text-gray-400 leading-relaxed font-medium">
                        <p>{section.body}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default LegalCenterPage;
