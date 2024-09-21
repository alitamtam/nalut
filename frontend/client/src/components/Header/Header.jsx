import { FaFacebookF, FaTwitter, FaInstagram, FaSearch } from 'react-icons/fa';
import { useState } from 'react';
import logo from '../../assets/img/logo.png';

const Header = () => {
    const [isSearchOpen, setIsSearchOpen] = useState(false);

    const toggleSearch = () => {
        setIsSearchOpen(!isSearchOpen);
    };

    return (
        <header className="bg-white">
            <div className="container mx-auto lg:px-48 px-4 py-4 flex items-center justify-between">
                {/* Logo Section */}
                <a href="/" className="flex items-center">
                    <img
                        className="w-20 h-auto md:w-32 md:h-auto rounded-md" // Adjusted sizes for mobile and desktop
                        src={logo}
                        alt="Logo"
                    />
                </a>

                {/* Search Bar and Social Icons */}
                <div className="flex items-center space-x-4">
                    {/* Search Icon with Dropdown Input */}
                    <div className="relative">
                        <button
                            className="text-gray-800 text-xl"
                            onClick={toggleSearch}
                        >
                            <FaSearch />
                        </button>
                        {isSearchOpen && (
                            <div className="absolute right-0 mt-2 w-full sm:w-64 bg-white border border-gray-300 rounded-md shadow-lg p-2">
                                <input
                                    type="text"
                                    placeholder="Search..."
                                    className="w-full p-2 border-none rounded-md focus:outline-none"
                                />
                            </div>
                        )}
                    </div>

                    {/* Social Icons */}
                    <div className="hidden sm:flex space-x-4">
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
