import { FaFacebookF, FaLinkedin, FaSearch } from 'react-icons/fa';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useSearch from '../Admin/Dashboard/hooks/useSearch';
import { useTranslation } from 'react-i18next'; // Import useTranslation hook
import i18n from 'i18next'; // Import i18n
import logo from '../../assets/img/logo.png';


const Header = () => {
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [language, setLanguage] = useState(i18n.language);
    const { t } = useTranslation('navbar'); // Access translation function

    const navigate = useNavigate();
    const { mutate: search } = useSearch();

    const toggleSearch = () => {
        setIsSearchOpen(!isSearchOpen);
    };

    const handleSearch = (e) => {
        if (e.key === 'Enter' && searchTerm) {
            search(searchTerm, {
                onSuccess: (data) => {
                    console.log('Search results:', data);
                    navigate('/search-results', { state: { results: data } });
                },
                onError: (error) => {
                    console.error('Search failed:', error);
                },
            });
        }
    };

    const handleLanguageChange = (lang) => {
        setLanguage(lang);
        i18n.changeLanguage(lang);
    };

    return (
        <header className=" lg:mx-20  xxl:mx-80 xl:mx-20 lg:py-4">
            <div className="px-4 py-4 flex items-center justify-between">
                <a href="/" className="flex lg:items-center ssm:items-start ssm:pr-14">
                    <img
                        className="lg:w-60 h-auto md:w-32 ssm:w-[150px] md:h-auto rounded-md"
                        src={logo}
                        alt="Logo"
                    />
                </a>

                <div className="flex items-center space-x-4 lg:border-gray-200 lg:border-y lg:gap-4 lg:py-4">
                    <h2 className="hover:text-teal-500 text-gray-500 hidden md:block lg:block">
                        <a href="mailto:info@edulibya.ly">{t('info@edulibya.ly')}</a>
                    </h2>

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
                                    placeholder={t('search_placeholder')} // Translation applied here
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    onKeyDown={handleSearch}
                                    className="w-full p-2 border bg-gray-100 rounded-none focus:outline-none hover:text-teal-500"
                                />
                            </div>
                        )}
                    </div>

                    {/* Language Switcher */}
                    <div className="flex items-center space-x-2 ">
                        <button
                            onClick={() => handleLanguageChange('en')}
                            className={`p-1 rounded  hover:bg-sky-950 hover:text-white ${language === 'en' ? 'bg-teal-600 ' : ' '}`}
                        >
                            <p className="text-xs font-arabic" title="Arabic">EN</p>
                        </button>
                        <button
                            onClick={() => handleLanguageChange('ar')}
                            className={`px-1 m-0 rounded hover:bg-sky-950 hover:text-white ${language === 'ar' ? 'bg-teal-600    ' : ''}`}
                        >
                            <p className="text-sm font-arabic px-1 inline-block align-top" title="Arabic">ع</p>
                        </button>
                    </div>

                    {/* Social Icons */}
                    <h1 className="text-gray-500 hidden md:block lg:block">{t('follow_us')}</h1>
                    <div className="hidden sm:flex space-x-4 ssm:hidden">
                        <a href="https://www.facebook.com/groups/527521202798857/" target="_blank" rel="noopener noreferrer">
                            <FaFacebookF className="text-gray-800 text-lg hover:text-teal-500" />
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
