import React, { useState } from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaChevronDown, FaChevronUp } from 'react-icons/fa';

const Footer = () => {
  const [isCompanyOpen, setIsCompanyOpen] = useState(false);
  const [isExploreOpen, setIsExploreOpen] = useState(false);

  return (
    <footer className="bg-black text-white py-10 px-4 md:px-20 lg:px-[70px]">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div>
          <div 
            className="flex justify-between items-center cursor-pointer md:cursor-auto" 
            onClick={() => setIsCompanyOpen(!isCompanyOpen)}
          >
            <h2 className="text-lg font-bold mb-4">Company</h2>
            <span className="md:hidden">
              {isCompanyOpen ? <FaChevronUp /> : <FaChevronDown />}
            </span>
          </div>
          <ul className={`${isCompanyOpen ? 'block' : 'hidden'} md:block`}>
            <li className="mb-2"><a href="#">About Us</a></li>
            <li className="mb-2"><a href="#">Team</a></li>
            <li className="mb-2"><a href="#">Sales Leadership</a></li>
            <li className="mb-2"><a href="#">Investors</a></li>
            <li className="mb-2"><a href="#">Join as an agent</a></li>
            <li className="mb-2"><a href="#">Careers</a></li>
            <li className="mb-2"><a href="#">Contact Us</a></li>
            <li className="mb-2"><a href="#">Offices</a></li>
            <li className="mb-2"><a href="#">Newsroom</a></li>
          </ul>
        </div>
        <div>
          <div 
            className="flex justify-between items-center cursor-pointer md:cursor-auto" 
            onClick={() => setIsExploreOpen(!isExploreOpen)}
          >
            <h2 className="text-lg font-bold mb-4">Explore</h2>
            <span className="md:hidden">
              {isExploreOpen ? <FaChevronUp /> : <FaChevronDown />}
            </span>
          </div>
          <ul className={`${isExploreOpen ? 'block' : 'hidden'} md:block`}>
            <li className="mb-2"><a href="#">Concierge</a></li>
            <li className="mb-2"><a href="#">Private Exclusives</a></li>
            <li className="mb-2"><a href="#">Compass Coming Soon</a></li>
            <li className="mb-2"><a href="#">Compass Luxury</a></li>
            <li className="mb-2"><a href="#">Find an Agent</a></li>
            <li className="mb-2"><a href="#">Mortgage Calculator</a></li>
            <li className="mb-2"><a href="#">Compass Academy</a></li>
            <li className="mb-2"><a href="#">Compass Cares</a></li>
            <li className="mb-2"><a href="#">Diversity & Inclusion</a></li>
            <li className="mb-2"><a href="#">Blog</a></li>
            <li className="mb-2"><a href="#">Neighborhood Guides</a></li>
            <li className="mb-2"><a href="#">New Development</a></li>
            <li className="mb-2"><a href="#">Commercial</a></li>
            <li className="mb-2"><a href="#">Sports & Entertainment</a></li>
            <li className="mb-2"><a href="#">Military</a></li>
            <li className="mb-2"><a href="#">External Suppliers Site</a></li>
            <li className="mb-2"><a href="#">Market Research</a></li>
            <li className="mb-2"><a href="#">Recently Sold Homes</a></li>
            <li className="mb-2"><a href="#">Sitemap</a></li>
          </ul>
        </div>
        <div>
          <h2 className="text-lg font-bold mb-4">Mobile Apps</h2>
          <div className="flex space-x-4 mb-4">
            <a href="#">
              <img className="w-[120px] md:w-[150px]" src="https://www.compass.com/ucfe-assets/public-media/homepage/appstore.png" alt="App Store" />
            </a>
            <a href="#">
              <img className="w-[120px] md:w-[150px]" src="https://www.compass.com/ucfe-assets/public-media/homepage/playstore.png" alt="Google Play" />
            </a>
          </div>
          <div className="flex space-x-4 mb-4">
            <a href="#"><FaInstagram size={24} /></a>
            <a href="#"><FaFacebook size={24} /></a>
            <a href="#"><FaTwitter size={24} /></a>
          </div>
          <ul>
            <li className="mb-2"><a href="#">Do Not Sell or Share My Personal Information</a></li>
            <li className="mb-2"><a href="#">Terms of Service</a></li>
            <li className="mb-2"><a href="#">Privacy Center</a></li>
            <li className="mb-2"><a href="#">Scam Avoidance</a></li>
            <li className="mb-2"><a href="#">Responsible Disclosure</a></li>
            <li className="mb-2"><a href="#">Compass is an E-Verify employer</a></li>
            <li className="mb-2"><a href="#">Notice for California Applicants</a></li>
            <li className="mb-2"><a href="#">California COVID-19 Rules of Entry</a></li>
            <li className="mb-2"><a href="#">Your CA Privacy Rights</a></li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
