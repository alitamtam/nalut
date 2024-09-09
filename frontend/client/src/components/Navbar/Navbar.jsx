// src/components/Navbar.jsx

import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="bg-sky-950 lg:w-2/3 lg:mx-60 py-4">
            <div className="container mx-auto flex justify-center">
                <div className="flex space-x-6">
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
