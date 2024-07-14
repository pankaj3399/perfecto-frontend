import React, { useState } from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import newLogo from "../../assets/images/LogoNobg.png";

const Footer = () => {
  const [isCompanyOpen, setIsCompanyOpen] = useState(false);

  return (
    <footer className="bg-black text-white py-10 px-4 md:px-20 lg:px-[70px]">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div>
          <img className='h-[160px] w-auto mb-6' src={newLogo} alt="Perfecto Homes Logo" /> 
        </div>
        <div>
          <div 
            className="flex justify-between items-center cursor-pointer md:cursor-auto" 
            onClick={() => setIsCompanyOpen(!isCompanyOpen)}
          >
            <h2 className="text-lg font-bold mb-4">Contact</h2>
            <span className="md:hidden">
              {isCompanyOpen ? <FaChevronUp /> : <FaChevronDown />}
            </span>
          </div>
          <ul className={`${isCompanyOpen ? 'block' : 'hidden'} md:block space-y-2`}>
            <li>Email: <a href="mailto:abc@perfectohome.com" className="hover:underline">abc@perfectohome.com</a></li>
            <li>Phone: <a href="tel:333-333-3333" className="hover:underline">333-333-3333</a></li>
            <li>Address: 2903 Shattuck Ave, Berkeley, CA, 94705</li>
            <li>Business Hours: 8:00am-8:00pm Monday-Saturday</li>
          </ul>
        </div>
        <div>
          <h2 className="text-lg font-bold mb-4">Socials</h2>
          <div className="flex space-x-4">
            <a href="https://www.instagram.com/perfectohomescalifornia/?igsh=MzRlODBiNWFlZA%3D%3D" className="hover:text-gray-400 transition-colors duration-200">
              <FaInstagram size={24} />
            </a>
            <a href="#" className="hover:text-gray-400 transition-colors duration-200">
              <FaFacebook size={24} />
            </a>
            <a href="#" className="hover:text-gray-400 transition-colors duration-200">
              <FaTwitter size={24} />
            </a>
          </div>
        </div>
      </div>
      <div className="mt-8 text-center text-sm text-gray-400">
        © 2024 Perfecto Homes. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
