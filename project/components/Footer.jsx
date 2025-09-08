"use client";

import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-black text-gray-400 px-6 py-10">
      <div className="max-w-6xl mx-auto">
       
        <div className="flex space-x-6 mb-6">
          <FaFacebookF className="hover:text-white cursor-pointer" size={20} />
          <FaInstagram className="hover:text-white cursor-pointer" size={20} />
          <FaTwitter className="hover:text-white cursor-pointer" size={20} />
          <FaYoutube className="hover:text-white cursor-pointer" size={20} />
        </div>

      
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-6 text-sm">
          <a href="#" className="hover:underline">Audio Description</a>
          <a href="#" className="hover:underline">Help Centre</a>
          <a href="#" className="hover:underline">Gift Cards</a>
          <a href="#" className="hover:underline">Media Centre</a>

          <a href="#" className="hover:underline">Investor Relations</a>
          <a href="#" className="hover:underline">Jobs</a>
          <a href="#" className="hover:underline">Terms of Use</a>
          <a href="#" className="hover:underline">Privacy</a>

          <a href="#" className="hover:underline">Legal Notices</a>
          <a href="#" className="hover:underline">Cookie Preferences</a>
          <a href="#" className="hover:underline">Corporate Information</a>
          <a href="#" className="hover:underline">Contact Us</a>
        </div>


        <button className="border border-gray-400 text-gray-400 px-3 py-1 text-sm hover:text-white hover:border-white">
          Service Code
        </button>

        <p className="text-xs text-gray-500 mt-6">
          © 1997-2025 Netflix, Inc.
        </p>
      </div>
    </footer>
  );
}
