import { Link } from 'react-router-dom';
import { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import PropTypes from 'prop-types';

const Navbar = ({ hideSidebar }) => {
    const [isOpen, setIsOpen] = useState(false); // State for burger menu
    const [aboutUsOpen, setAboutUsOpen] = useState(false); // State for About Us dropdown

    const toggleMenu = () => {
        setIsOpen(!isOpen);
        setAboutUsOpen(false); // Close the About Us dropdown when main menu closes
    };

    const toggleAboutUs = () => {
        setAboutUsOpen(!aboutUsOpen);
        hideSidebar(aboutUsOpen); // Disable sidebar when About Us dropdown is active
    };

    return (
        <nav className="bg-sky-950 lg:mx-80">
            <div className="container mx-auto px-4 lg:py-8 ssm:py-4 flex justify-between items-center">
                <Link to="/" className="text-yellow-500 font-thin text-base lg:hidden">
                    Menu
                </Link>

                {/* Burger Menu Icon */}
                <div className="lg:hidden">
                    <button
                        onClick={toggleMenu}
                        className="text-white text-2xl focus:outline-none"
                    >
                        {isOpen ? <FaTimes /> : <FaBars />}
                    </button>
                </div>

                {/* Desktop Menu */}
                <div className="hidden lg:flex space-x-8  mx-auto uppercase font-thin">
                    <Link to="/" className="text-yellow-500 font-bold">
                        Main
                    </Link>
                    <Link to="/about" className="text-white hover:text-orange-500">
                        About Us
                    </Link>
                    <Link to="/publications" className="text-white hover:text-orange-500">
                        Publications
                    </Link>
                    <Link to="/projects" className="text-white hover:text-orange-500">
                        Projects
                    </Link>
                    <Link to="/events/view-all" className="text-white hover:text-orange-500">
                        Events
                    </Link>
                </div>

                {/* Mobile Menu (Burger Menu) */}
                {isOpen && (
                    <div className="lg:hidden absolute top-16 left-0 w-full bg-sky-950 text-white p-4 space-y-4 z-20">
                        <Link to="/" className="block hover:text-orange-500" onClick={toggleMenu}>
                            Main
                        </Link>

                        {/* About Us with Dropdown */}
                        <div className="block hover:text-orange-500">
                            <button onClick={toggleAboutUs} className="w-full text-left">
                                About Us {aboutUsOpen ? '-' : '+'}
                            </button>
                            {aboutUsOpen && (
                                <div className="ml-4 mt-2 space-y-2">
                                    <Link to="/about#about-us" onClick={toggleMenu} className="block hover:text-orange-500">
                                        About Us Overview
                                    </Link>
                                    <Link to="/about#our-team" onClick={toggleMenu} className="block hover:text-orange-500">
                                        Our Team
                                    </Link>
                                    <Link to="/about#join-us" onClick={toggleMenu} className="block hover:text-orange-500">
                                        Join or Commission EduLibya
                                    </Link>
                                </div>
                            )}
                        </div>

                        <Link to="/publications" className="block hover:text-orange-500" onClick={toggleMenu}>
                            Publications
                        </Link>
                        <Link to="/projects" className="block hover:text-orange-500" onClick={toggleMenu}>
                            Projects
                        </Link>
                        <Link to="/events/view-all" className="block hover:text-orange-500" onClick={toggleMenu}>
                            Events
                        </Link>
                    </div>
                )}
            </div>
        </nav>
    );
};
Navbar.propTypes = {
    hideSidebar: PropTypes.func.isRequired,
};

export default Navbar;
