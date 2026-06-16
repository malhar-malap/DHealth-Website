import React from 'react';
import { Link } from 'react-router-dom';

const TermsOfServicePage = () => {
  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-gray-900 via-gray-900 to-[#d8572a]/10 pb-20">
      {/* Hero */}
      <section className="relative pt-20 pb-16 bg-gray-900">
        <div className="absolute inset-0 bg-gradient-to-br from-[#d8572a]/5 via-transparent to-transparent -z-10"></div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-4">Terms of Service</h1>
          <p className="text-gray-400 text-lg font-medium">Last updated: May 2026</p>
        </div>
      </section>

      {/* Content */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-gray-900 rounded-3xl border border-gray-800 p-8 md:p-12 space-y-10">

          <div>
            <h2 className="text-2xl font-bold text-white mb-4">1. Acceptance of Terms</h2>
            <p className="text-gray-400 leading-relaxed">
              By accessing and using the DHAcquisitions.co platform ("Platform"), operated by Dhumavati Consulting LLP, you agree to be bound by these Terms of Service. If you do not agree with any part of these terms, you must not use the Platform. These terms apply to all users, including buyers, sellers, lessors, lessees, job seekers, and employers.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-white mb-4">2. Description of Services</h2>
            <p className="text-gray-400 leading-relaxed">
              DHAcquisitions.co is India's premier healthcare business marketplace. Our Platform enables users to:
            </p>
            <ul className="list-disc pl-6 mt-3 text-gray-400 space-y-2 leading-relaxed">
              <li>Buy, sell, and lease healthcare businesses including hospitals, pharma companies, diagnostic centres, dental clinics, and pharmacies.</li>
              <li>List partial stake sale opportunities in healthcare entities.</li>
              <li>Post and apply for healthcare industry jobs.</li>
              <li>Access seller contact details through a secure, paid access model.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-white mb-4">3. User Accounts & Registration</h2>
            <p className="text-gray-400 leading-relaxed">
              To access certain features of the Platform, you must create an account. You agree to provide accurate, current, and complete information during registration and to keep your account credentials secure. You are responsible for all activity under your account. DHAcquisitions.co reserves the right to suspend or terminate accounts that violate these terms or engage in fraudulent activity.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-white mb-4">4. Listing & Content Guidelines</h2>
            <p className="text-gray-400 leading-relaxed">
              Users who post listings or job advertisements on the Platform must ensure that:
            </p>
            <ul className="list-disc pl-6 mt-3 text-gray-400 space-y-2 leading-relaxed">
              <li>All information provided is accurate, truthful, and not misleading.</li>
              <li>They have legal authority to sell, lease, or represent the listed entity.</li>
              <li>Listings do not contain unlawful, defamatory, or infringing content.</li>
              <li>All uploaded media (images, documents) are owned by the user or used with proper authorization.</li>
            </ul>
            <p className="text-gray-400 leading-relaxed mt-3">
              DHAcquisitions.co reserves the right to review, approve, edit, or remove any listing at its sole discretion.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-white mb-4">5. Payments & Refund Policy</h2>
            <p className="text-gray-400 leading-relaxed">
              Certain services on the Platform, such as accessing seller contact details, require payment. All payments are processed securely through Razorpay. By making a payment, you agree to:
            </p>
            <ul className="list-disc pl-6 mt-3 text-gray-400 space-y-2 leading-relaxed">
              <li>Pay the specified fee (currently ₹1,000) for contact access per listing.</li>
              <li>Understand that payments are non-refundable once seller contact details have been delivered.</li>
              <li>Do not share purchased contact details with unauthorized third parties.</li>
            </ul>
            <p className="text-gray-400 leading-relaxed mt-3">
              Refund requests for technical failures or duplicate payments will be reviewed on a case-by-case basis by contacting our support team.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-white mb-4">6. Buyer Verification</h2>
            <p className="text-gray-400 leading-relaxed">
              To maintain the integrity and security of our marketplace, buyers may be required to complete a verification process. Verified buyers gain enhanced credibility and access to exclusive features. DHAcquisitions.co reserves the right to reject verification requests that do not meet our standards.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-white mb-4">7. Intellectual Property</h2>
            <p className="text-gray-400 leading-relaxed">
              All content on the Platform, including logos, text, graphics, software, and design elements, is the intellectual property of Dhumavati Consulting LLP or its licensors. You may not reproduce, distribute, or create derivative works from any Platform content without prior written consent.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-white mb-4">8. Limitation of Liability</h2>
            <p className="text-gray-400 leading-relaxed">
              DHAcquisitions.co acts solely as a marketplace platform connecting buyers and sellers. We do not:
            </p>
            <ul className="list-disc pl-6 mt-3 text-gray-400 space-y-2 leading-relaxed">
              <li>Guarantee the accuracy of any listing information posted by users.</li>
              <li>Assume liability for losses arising from deals conducted through the Platform.</li>
              <li>Provide legal, financial, or medical advice.</li>
              <li>The Buyers and Sellers are required to do their own due diligence before entering in any transaction.</li>

            </ul>
            <p className="text-gray-400 leading-relaxed mt-3">
              Users are strongly advised to conduct independent due diligence before entering into any transaction.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-white mb-4">9. Prohibited Activities</h2>
            <ul className="list-disc pl-6 text-gray-400 space-y-2 leading-relaxed">
              <li>Posting fraudulent, fake, or misleading information.</li>
              <li>Attempting to access other users' accounts without authorization.</li>
              <li>Using automated bots or scrapers to extract data from the Platform.</li>
              <li>Circumventing the payment system to obtain seller contact details.</li>
              <li>Harassing, threatening, or abusing other users of the Platform.</li>
              <li>Violating any applicable Indian laws or regulations.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-white mb-4">10. Termination</h2>
            <p className="text-gray-400 leading-relaxed">
              DHAcquisitions.co reserves the right to suspend or permanently terminate your account and access to the Platform at any time, without prior notice, for conduct that we determine violates these Terms of Service or is harmful to other users, the Platform, or third parties.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-white mb-4">11. Governing Law</h2>
            <p className="text-gray-400 leading-relaxed">
              These Terms shall be governed by and construed in accordance with the laws of India. Any disputes arising out of or in connection with these Terms shall be subject to the exclusive jurisdiction of the courts in Mumbai, Maharashtra.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-white mb-4">12. Changes to Terms</h2>
            <p className="text-gray-400 leading-relaxed">
              We reserve the right to modify these Terms of Service at any time. Changes will be effective immediately upon posting on the Platform. Your continued use of the Platform after any modifications constitutes acceptance of the revised terms.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-white mb-4">13. Contact Us</h2>
            <p className="text-gray-400 leading-relaxed">
              If you have any questions about these Terms of Service, please contact us through our <Link to="/contact-us" className="text-[#db7c26] hover:underline font-semibold">Contact Us</Link> page or email us at support@dhacquisitions.com.
            </p>
          </div>

        </div>
      </section>
    </div>
  );
};

export default TermsOfServicePage;
