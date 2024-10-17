/* eslint-disable no-unused-vars */
import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import { IoIosArrowDown } from 'react-icons/io';
import { useTranslation } from 'react-i18next'; // Import the hook

const Navbar = () => {
    const { t, i18n } = useTranslation('navbar'); // Use the hook to get the translation function
    const isArabic = i18n.language === 'ar'; // Check if the current language is Arabic
    const [isOpen, setIsOpen] = useState(false); // State for burger menu
    const [aboutUsOpen, setAboutUsOpen] = useState(false); // State for About Us dropdown

    const toggleMenu = () => {
        setIsOpen(!isOpen);
        setAboutUsOpen(false); // Close the About Us dropdown when main menu closes
    };

    const toggleAboutUs = () => {
        setAboutUsOpen(!aboutUsOpen);
    };

    // Close the burger menu when scrolling
    useEffect(() => {
        const handleScroll = () => {
            if (isOpen) {
                setIsOpen(false);
                setAboutUsOpen(false); // Close the dropdown as well
            }
        };

        window.addEventListener('scroll', handleScroll);

        // Clean up the event listener on component unmount
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [isOpen]); // Add isOpen as a dependency so it runs when the menu is open

    return (
        <nav aria-label={t('navbar.title')} className="bg-sky-950 lg:mx-20 xxl:mx-80 md:max-w-full lg:py-4">
            <div className={`flex ${isArabic ? 'flex-row-reverse' : 'flex-row'} container mx-auto px-4 lg:py-8 ssm:py-4 justify-between items-center`}>
                <Link to="/" className="text-orange-500 font-bold text-base lg:hidden shadow-sm" aria-label={t('home')}>
                    Menu
                </Link>

                {/* Burger Menu Icon for mobile */}
                <div className="lg:hidden">
                    <button
                        onClick={toggleMenu}
                        className="text-white text-2xl focus:outline-none"
                        aria-label={isOpen ? t('close menu') : t('open menu')}
                    >
                        {isOpen ? <FaTimes /> : <FaBars />}
                    </button>
                </div>

                {/* Desktop Menu */}
                <div className={`hidden lg:flex lg:space-x-20 mx-auto uppercase text-base ${isArabic ? 'lg:gap-10 lg:font-arabic lg:text-lg flex-row-reverse' : 'flex-row'}`}>
                    <Link to="/" className="text-orange-500 lg:font-semibold hover:underline" aria-label={t('home')}>
                        {t('home')}
                    </Link>
                    <Link to="/about" className="text-white hover:text-orange-500" aria-label={t('about.title')}>
                        {t('about.title')}
                    </Link>
                    <Link to="/publications" className="text-white hover:text-orange-500" aria-label={t('publications.title')}>
                        {t('publications.title')}
                    </Link>
                    <Link to="/projects/ViewAllProjects" className="text-white hover:text-orange-500" aria-label={t('projects.title')}>
                        {t('projects.title')}
                    </Link>
                    <Link to="/events/view-all" className="text-white hover:text-orange-500" aria-label={t('events.title')}>
                        {t('events.title')}
                    </Link>
                </div>

                {/* Mobile Menu (Burger Menu) */}
                {isOpen && (
                    <div className={`lg:hidden absolute top-20 left-0 w-full bg-sky-950 text-white p-4 space-y-4 z-20 ${isArabic ? 'font-arabic text-lg' : ''}`}>
                        <Link to="/" className="block hover:text-orange-500 font-arabic" onClick={toggleMenu} aria-label={t('home')}>
                            {t('home')}
                        </Link>

                        {/* About Us with Dropdown */}
                        <div className="block hover:text-orange-500 font-arabic">
                            <button
                                onClick={toggleAboutUs}
                                className="w-full flex justify-between items-center text-left"
                                aria-label={t('about.title')}
                            >
                                {t('about.title')}
                                <IoIosArrowDown className={`${aboutUsOpen ? 'rotate-180' : ''}`} />
                            </button>
                            {aboutUsOpen && (
                                <div className="ml-4 mt-2 space-y-2">
                                    <Link to="/about#about-us" onClick={toggleMenu} className="block hover:text-orange-500" aria-label={t('about.title')}>
                                        {t('about.title')}
                                    </Link>
                                    <Link to="/about#our-team" onClick={toggleMenu} className="block hover:text-orange-500" aria-label={t('our team')}>
                                        {t('our team')}
                                    </Link>
                                    <Link to="/about#join-us" onClick={toggleMenu} className="block hover:text-orange-500" aria-label={t('join us')}>
                                        {t('join us')}
                                    </Link>
                                </div>
                            )}
                        </div>

                        <Link to="/publications" className="block hover:text-orange-500" onClick={toggleMenu} aria-label={t('publications.title')}>
                            {t('publications.title')}
                        </Link>
                        <Link to="/projects/ViewAllProjects" className="block hover:text-orange-500" onClick={toggleMenu} aria-label={t('projects.title')}>
                            {t('projects.title')}
                        </Link>
                        <Link to="/events/view-all" className="block hover:text-orange-500" onClick={toggleMenu} aria-label={t('events.title')}>
                            {t('events.title')}
                        </Link>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
