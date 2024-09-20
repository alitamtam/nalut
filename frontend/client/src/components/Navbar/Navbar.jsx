import { Link } from 'react-router-dom';
import { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false); // State for burger menu

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <nav className="bg-sky-950 lg:mx-80">
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                <Link to="/" className="text-yellow-500 font-thin text-base lg:hidden">Menu</Link>

                {/* Burger Menu Icon */}
                <div className="lg:hidden">
                    <button onClick={toggleMenu} className="text-white text-2xl focus:outline-none">
                        {isOpen ? <FaTimes /> : <FaBars />}
                    </button>
                </div>

                {/* Desktop Menu */}
                <div className="hidden lg:flex space-x-6 uppercase font-semibold">
                    <Link to="/" className="text-yellow-500 font-bold">Main</Link>
                    <Link to="/about" className="text-white hover:text-orange-500">About Us</Link>
                    <Link to="/publications" className="text-white hover:text-orange-500">Publications / Resources</Link>
                    <Link to="/projects" className="text-white hover:text-orange-500">Actions / Projects</Link>
                    <Link to="/news" className="text-white hover:text-orange-500">Events</Link>
                </div>

                {/* Mobile Menu (Burger Menu) */}
                {isOpen && (
                    <div className="lg:hidden absolute top-16 left-0 w-full bg-sky-950 text-white p-4 space-y-4 z-20">
                        <Link to="/" className="block hover:text-orange-500" onClick={toggleMenu}>Main</Link>
                        <Link to="/about" className="block hover:text-orange-500" onClick={toggleMenu}>About Us</Link>
                        <Link to="/publications" className="block hover:text-orange-500" onClick={toggleMenu}>Publications / Resources</Link>
                        <Link to="/projects" className="block hover:text-orange-500" onClick={toggleMenu}>Actions / Projects</Link>
                        <Link to="/news" className="block hover:text-orange-500" onClick={toggleMenu}>Events</Link>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
