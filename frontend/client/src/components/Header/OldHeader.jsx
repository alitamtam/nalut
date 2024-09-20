// src/components/Header.jsx

import { FaFacebookF, FaTwitter, FaInstagram } from 'react-icons/fa';
import logo from '../../assets/img/logo.png';

const Header = () => {
    return (
        <header className="bg-white  ">
            <div className="container mx-auto  px-28 py-8 flex items-center justify-between">
                {/* Logo Section */}
                <a href="/" className="flex items-center">
                    <img className="w-full h-auto rounded-md" src={logo} alt="Logo" />
                    <span className="ml-2 text-xl font-bold"></span>
                </a>

                {/* Search Bar and Social Icons */}
                <div className="flex items-center space-x-6">
                    <div className="flex items-center border border-gray-300 rounded-md">
                        <input
                            type="text"
                            placeholder="Search"
                            className="p-2 w-64 border-none rounded-l-md focus:outline-none"
                        />
                        <button className="bg-blue-500 text-white p-2 rounded-r-md hover:bg-blue-600">
                            Search
                        </button>
                    </div>
                    <div className="flex space-x-4">
                        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                            <FaFacebookF className="text-gray-800 text-lg" />
                        </a>
                        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                            <FaTwitter className="text-blue-700 text-lg" />
                        </a>
                        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                            <FaInstagram className="text-gray-900 text-lg" />
                        </a>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
