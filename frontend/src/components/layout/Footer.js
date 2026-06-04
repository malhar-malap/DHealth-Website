import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-[#1a2744] text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <img src="/images/logo.png" alt="Logo" className="w-10 h-10 object-contain" />
              <span className="text-xl font-bold text-white">DHAcquisitions.co</span>
            </div>
            <p className="text-sm text-gray-400 mb-4">India's premier healthcare business marketplace. Buy, sell, and lease healthcare businesses and find healthcare jobs.</p>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/listings?category=1" className="text-sm hover:text-[#f7b538] transition-colors">Hospitals for Sale</Link></li>
              <li><Link to="/listings?category=2" className="text-sm hover:text-[#f7b538] transition-colors">Pharma Companies</Link></li>
              <li><Link to="/listings?category=3" className="text-sm hover:text-[#f7b538] transition-colors">Diagnostic Centers</Link></li>
              <li><Link to="/jobs" className="text-sm hover:text-[#f7b538] transition-colors">Healthcare Jobs</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-4">For Sellers</h3>
            <ul className="space-y-2">
              <li><Link to="/listings/create" className="text-sm hover:text-[#f7b538] transition-colors">Post a Listing</Link></li>
              <li><Link to="/register" className="text-sm hover:text-[#f7b538] transition-colors">Create Account</Link></li>
              <li><Link to="/jobs/create" className="text-sm hover:text-[#f7b538] transition-colors">Post a Job</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              <li><Link to="/contact-us" className="text-sm hover:text-[#f7b538] transition-colors">Contact Us</Link></li>
              <li><Link to="/privacy" className="text-sm hover:text-[#f7b538] transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="text-sm hover:text-[#f7b538] transition-colors">Terms of Service</Link></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-[#2a3d57] mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-400">© {new Date().getFullYear()} DHAcquisitions.co Marketplace. All rights reserved.</p>
          <p className="text-sm text-gray-400 mt-2 md:mt-0">Developed & Designed by Sahil & Malhar</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;




