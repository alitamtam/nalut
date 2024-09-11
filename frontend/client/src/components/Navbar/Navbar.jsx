// src/components/Navbar.jsx

import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="bg-sky-950  lg:mx-80 ">
            <div className="container mx-auto px-28 py-8 flex justify-center">
                <div className="flex space-x-6 uppercase font-semibold">
                    <Link to="/about" className="text-white hover:text-orange-500">About Us</Link>
                    <Link to="/projects" className="text-white hover:text-orange-500">Actions / Projects</Link>
                    <Link to="/publications" className="text-white hover:text-orange-500">Publications / Resources</Link>
                    <Link to="/news" className="text-white hover:text-orange-500">News / Events</Link>
                    <Link to="/" className="text-yellow-500 font-bold">Main</Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
