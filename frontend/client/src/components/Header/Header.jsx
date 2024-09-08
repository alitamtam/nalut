// src/components/Header.jsx

import { Link } from 'react-router-dom';
import { FaFacebookF, FaTwitter, FaInstagram } from 'react-icons/fa';
const Header = () => {
    return (
        <header className="bg-white shadow-md">
            <nav>
                <div className="container mx-auto px-4 py-2 flex items-center justify-between">
                    {/* Logo Section */}
                    <div className="flex items-center">
                        <Link to="/" className="flex items-center">
                            {/* <img className="w-24 h-auto" src="/img/logo2.jpg" alt="Logo" /> */}
                            <span className="ml-2 text-xl font-bold">EduLibya</span>
                        </Link>
                        {/* Search Bar */}
                        <div className="ml-8 flex items-center border border-gray-300 rounded-md">
                            <input
                                type="text"
                                placeholder="Search"
                                className="p-2 w-64 border-none rounded-l-md focus:outline-none"
                            />
                            <button className="bg-blue-500 text-white p-2 rounded-r-md hover:bg-blue-600">
                                Search
                            </button>
                        </div>
                        {/* Social Icons */}
                        <div className="ml-8 flex space-x-4">
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

                    {/* Navigation Menu */}
                    <div className="mt-4">
                        <div className="flex space-x-4">
                            <Link to="/about" className="text-gray-700 hover:text-blue-500">About Us</Link>
                            <Link to="/projects" className="text-gray-700 hover:text-blue-500">Actions / Projects</Link>
                            <Link to="/publications" className="text-gray-700 hover:text-blue-500">Publications / Resources</Link>
                            <Link to="/news" className="text-gray-700 hover:text-blue-500">News / Events</Link>
                            <Link to="/" className="text-blue-500 font-bold">Main</Link>
                        </div>
                    </div>
                </div>

            </nav>
        </header>
    );
};

export default Header;
