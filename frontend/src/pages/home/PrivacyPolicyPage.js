import React from 'react';
import { Link } from 'react-router-dom';

const PrivacyPolicyPage = () => {
  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-gray-900 via-gray-900 to-[#d8572a]/10 pb-20">
      {/* Hero */}
      <section className="relative pt-20 pb-16 bg-gray-900">
        <div className="absolute inset-0 bg-gradient-to-br from-[#d8572a]/5 via-transparent to-transparent -z-10"></div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-4">Privacy Policy</h1>
          <p className="text-gray-400 text-lg font-medium">Last updated: May 2026</p>
        </div>
      </section>

      {/* Content */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-gray-900 rounded-3xl border border-gray-800 p-8 md:p-12 space-y-10">

          <div>
            <h2 className="text-2xl font-bold text-white mb-4">1. Introduction</h2>
            <p className="text-gray-400 leading-relaxed">
              DHAcquisitions.co, operated by Dhumavati Consulting LLP ("we", "us", "our"), is committed to protecting the privacy of our users. This Privacy Policy explains how we collect, use, disclose, and safeguard your personal information when you use our healthcare marketplace platform ("Platform"). By using the Platform, you consent to the practices described in this policy.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-white mb-4">2. Information We Collect</h2>
            <p className="text-gray-400 leading-relaxed mb-4">We collect the following types of information:</p>
            
            <h3 className="text-lg font-semibold text-gray-200 mb-2">a) Personal Information</h3>
            <ul className="list-disc pl-6 text-gray-400 space-y-2 leading-relaxed mb-4">
              <li><strong className="text-gray-300">Account Registration:</strong> Full name, email address, mobile number, password, company name, and city.</li>
              <li><strong className="text-gray-300">Seller Listings:</strong> Business details including category-specific information (bed count, annual revenue, certifications, stake percentages, EBITDA, land area, etc.).</li>
              <li><strong className="text-gray-300">Job Postings:</strong> Company name, job details, salary information, and contact details.</li>
              <li><strong className="text-gray-300">Buyer Verification:</strong> Identity documents and business credentials submitted for verification purposes.</li>
              <li><strong className="text-gray-300">Payment Information:</strong> Transaction IDs and payment confirmations processed through Razorpay. We do not store credit/debit card details on our servers.</li>
            </ul>

            <h3 className="text-lg font-semibold text-gray-200 mb-2">b) Automatically Collected Information</h3>
            <ul className="list-disc pl-6 text-gray-400 space-y-2 leading-relaxed">
              <li>Browser type and version, operating system, and device information.</li>
              <li>IP address and approximate geographic location.</li>
              <li>Pages visited, time spent on pages, and navigation patterns.</li>
              <li>Referral sources and search queries used to find our Platform.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-white mb-4">3. How We Use Your Information</h2>
            <p className="text-gray-400 leading-relaxed mb-3">We use the collected information for the following purposes:</p>
            <ul className="list-disc pl-6 text-gray-400 space-y-2 leading-relaxed">
              <li><strong className="text-gray-300">Account Management:</strong> To create and manage your user account, authenticate logins, and communicate account-related updates.</li>
              <li><strong className="text-gray-300">Marketplace Operations:</strong> To display listings, facilitate inquiries between buyers and sellers, and process contact access payments.</li>
              <li><strong className="text-gray-300">Verification:</strong> To verify buyer identities and maintain trust within the marketplace.</li>
              <li><strong className="text-gray-300">Communication:</strong> To send service-related notifications, respond to inquiries, and provide customer support.</li>
              <li><strong className="text-gray-300">Platform Improvement:</strong> To analyze usage patterns, fix bugs, and improve our services and user experience.</li>
              <li><strong className="text-gray-300">Legal Compliance:</strong> To comply with applicable laws, regulations, and legal processes.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-white mb-4">4. Information Sharing & Disclosure</h2>
            <p className="text-gray-400 leading-relaxed mb-3">We do not sell your personal information. We may share your information only in the following circumstances:</p>
            <ul className="list-disc pl-6 text-gray-400 space-y-2 leading-relaxed">
              <li><strong className="text-gray-300">Seller Contact Access:</strong> When a buyer purchases contact access for a listing, the seller's name, email, and phone number are shared with the paying buyer.</li>
              <li><strong className="text-gray-300">Inquiry System:</strong> When you send an inquiry on a listing, your name, email, and phone number are shared with the listing owner.</li>
              <li><strong className="text-gray-300">Payment Processing:</strong> Transaction data is shared with Razorpay for secure payment processing.</li>
              <li><strong className="text-gray-300">Legal Requirements:</strong> We may disclose information when required by law, court order, or government regulation.</li>
              <li><strong className="text-gray-300">Platform Administration:</strong> Authorized administrators may access user data for moderation, verification, and support purposes.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-white mb-4">5. Data Security</h2>
            <p className="text-gray-400 leading-relaxed">
              We implement industry-standard security measures to protect your personal information, including:
            </p>
            <ul className="list-disc pl-6 mt-3 text-gray-400 space-y-2 leading-relaxed">
              <li>Encrypted password storage using BCrypt hashing.</li>
              <li>JWT-based authentication tokens with expiration controls.</li>
              <li>Secure HTTPS connections for all data transmission.</li>
              <li>Role-based access controls for administrative functions.</li>
            </ul>
            <p className="text-gray-400 leading-relaxed mt-3">
              While we strive to use commercially acceptable means to protect your data, no method of electronic transmission or storage is 100% secure. We cannot guarantee absolute security.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-white mb-4">6. Data Retention</h2>
            <p className="text-gray-400 leading-relaxed">
              We retain your personal information for as long as your account is active or as needed to provide our services. Listing data is retained according to the listing's lifecycle (active, expired, sold, or withdrawn). You may request deletion of your account and associated data by contacting our support team, subject to legal retention requirements.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-white mb-4">7. Cookies & Tracking</h2>
            <p className="text-gray-400 leading-relaxed">
              Our Platform uses local storage and session tokens to maintain your authentication state and preferences. We may use analytics tools to understand usage patterns and improve our services. You can control cookie preferences through your browser settings.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-white mb-4">8. Your Rights</h2>
            <p className="text-gray-400 leading-relaxed mb-3">As a user, you have the right to:</p>
            <ul className="list-disc pl-6 text-gray-400 space-y-2 leading-relaxed">
              <li><strong className="text-gray-300">Access:</strong> Request a copy of the personal information we hold about you.</li>
              <li><strong className="text-gray-300">Correction:</strong> Update or correct inaccurate personal information through your profile settings.</li>
              <li><strong className="text-gray-300">Deletion:</strong> Request deletion of your account and personal data, subject to legal obligations.</li>
              <li><strong className="text-gray-300">Withdrawal of Consent:</strong> Withdraw consent for data processing at any time by discontinuing use of the Platform.</li>
              <li><strong className="text-gray-300">Portability:</strong> Request your data in a commonly used, machine-readable format.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-white mb-4">9. Third-Party Services</h2>
            <p className="text-gray-400 leading-relaxed">
              Our Platform integrates with third-party services including Razorpay (payment processing). These services have their own privacy policies and data handling practices. We encourage you to review their privacy policies. We are not responsible for the privacy practices of third-party services.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-white mb-4">10. Children's Privacy</h2>
            <p className="text-gray-400 leading-relaxed">
              Our Platform is not intended for use by individuals under the age of 18. We do not knowingly collect personal information from minors. If we discover that we have collected data from a minor, we will take steps to delete it promptly.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-white mb-4">11. Changes to This Policy</h2>
            <p className="text-gray-400 leading-relaxed">
              We may update this Privacy Policy from time to time to reflect changes in our practices, technology, or legal requirements. Any changes will be posted on this page with an updated "Last updated" date. Your continued use of the Platform after changes are posted constitutes acceptance of the revised policy.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-white mb-4">12. Contact Us</h2>
            <p className="text-gray-400 leading-relaxed">
              If you have any questions or concerns about this Privacy Policy or our data practices, please reach out to us through our <Link to="/contact-us" className="text-[#db7c26] hover:underline font-semibold">Contact Us</Link> page or email us at support@dhacquisitions.com.
            </p>
            <div className="mt-6 p-6 bg-gray-800 rounded-2xl border border-gray-700">
              <p className="text-gray-300 font-semibold mb-1">Dhumavati Consulting LLP</p>
              <p className="text-gray-400 text-sm">Operator of DHAcquisitions.co Healthcare Marketplace</p>
              <p className="text-gray-400 text-sm">Mumbai, Maharashtra, India</p>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
};

export default PrivacyPolicyPage;
