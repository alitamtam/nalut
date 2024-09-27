import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import { IoIosArrowDown } from 'react-icons/io';

const Navbar = () => {
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
        <nav className="bg-sky-950 lg:mx-80">
            <div className="container mx-auto px-4 lg:py-8 ssm:py-4 flex justify-between items-center">
                <Link to="/" className="text-orange-500 font-bold text-base lg:hidden shadow-sm">
                    Menu
                </Link>

                {/* Burger Menu Icon for mobile */}
                <div className="lg:hidden">
                    <button
                        onClick={toggleMenu}
                        className="text-white text-2xl focus:outline-none"
                    >
                        {isOpen ? <FaTimes /> : <FaBars />}
                    </button>
                </div>

                {/* Desktop Menu */}
                <div className="hidden lg:flex space-x-8 mx-auto uppercase font-thin">
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
                    <div className="lg:hidden absolute top-20 left-0 w-full bg-sky-950 text-white p-4 space-y-4 z-20">
                        <Link to="/" className="block hover:text-orange-500" onClick={toggleMenu}>
                            Main
                        </Link>

                        {/* About Us with Dropdown */}
                        <div className="block hover:text-orange-500">
                            <button
                                onClick={toggleAboutUs}
                                className="w-full flex justify-between items-center text-left"
                            >
                                About Us <IoIosArrowDown className={`${aboutUsOpen ? 'rotate-180' : ''}`} />
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

export default Navbar;
