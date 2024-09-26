import { FaFacebookF, FaTwitter, FaLinkedin, FaSearch } from 'react-icons/fa';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useSearch from '../Admin/Dashboard/hooks/useSearch'; // Correct import
import logo from '../../assets/img/logo.png';

const Header = () => {
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();
    const { mutate: search } = useSearch(); // Destructure mutate correctly

    const toggleSearch = () => {
        setIsSearchOpen(!isSearchOpen);
    };

    const handleSearch = (e) => {
        if (e.key === 'Enter' && searchTerm) {
            search(searchTerm, {
                onSuccess: (data) => {
                    console.log("Search results:", data); // Check the structure of data
                    console.log("Type of search results:", typeof data); // Check if it's an object or array
                    navigate('/search-results', { state: { results: data } });
                },
                onError: (error) => {
                    console.error("Search failed:", error);
                },
            });
        }
    };


    return (
        <header className="bg-white lg:mx-80 lg:py-4">
            <div className="px-4 py-4 flex items-center justify-between">
                {/* Logo Section */}
                <a href="/" className="flex lg:items-center ssm:items-start ssm:pr-14">
                    <img
                        className="lg:w-60 h-auto md:w-32 ssm:w-[150px] md:h-auto rounded-md"
                        src={logo}
                        alt="Logo"
                    />
                </a>

                {/* Search Bar and Social Icons */}
                <div className="flex items-center space-x-4 lg:border-gray-200 lg:border-y lg:gap-4 lg:py-4">
                    <h2 className="hover:text-teal-500 text-gray-500 ssm:hidden">
                        <a href="mailto:info@edulibya.ly">info@edulibya.ly</a>
                    </h2>

                    {/* Search Icon with Dropdown Input */}
                    <div className="relative">
                        <button
                            className="text-gray-800 text-xl focus:outline-none"
                            onClick={toggleSearch}
                        >
                            <FaSearch className="hover:text-teal-500" />
                        </button>
                        {isSearchOpen && (
                            <div className="absolute right-0 mt-2 w-full sm:w-64 bg-white border border-gray-300 rounded-none shadow-xl p-2 ssm:w-64">
                                <input
                                    type="text"
                                    placeholder="Search... "
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    onKeyDown={handleSearch} // Trigger search on Enter key press
                                    className="w-full p-2 border bg-gray-100 rounded-none focus:outline-none hover:text-teal-500"
                                />
                            </div>
                        )}
                    </div>

                    {/* Social Icons */}
                    <h1 className="text-gray-500 ssm:hidden">Follow Us</h1>
                    <div className="hidden sm:flex space-x-4 ssm:hidden">
                        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                            <FaFacebookF className="text-gray-800 text-lg hover:text-teal-500" />
                        </a>
                        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                            <FaTwitter className="text-gray-900 text-lg hover:text-teal-500" />
                        </a>
                        <a href="https://www.linkedin.com/groups/12856663/" target="_blank" rel="noopener noreferrer">
                            <FaLinkedin className="text-gray-900 text-lg hover:text-teal-500" />
                        </a>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
