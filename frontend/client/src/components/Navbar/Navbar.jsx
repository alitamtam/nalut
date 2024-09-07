// src/components/Footer.jsx

import React from 'react';
import { FaEnvelope } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-gray-800 text-white py-4">
            <div className="container mx-auto px-4 flex flex-col items-center space-y-4">
                {/* Contact Info */}
                <div className="flex items-center space-x-2">
                    <FaEnvelope className="text-xl" />
                    <a href="mailto:contact@edulibya.ly" className="text-blue-400 hover:underline">
                        contact@edulibya.ly
                    </a>
                </div>

                {/* Navigation Links */}
                <div className="flex flex-col items-center space-y-2">
                    {/* <Link to="/agenda" className="hover:text-blue-400">Agenda</Link>
                    <Link to="/associations" className="hover:text-blue-400">Associations</Link> */}
                    <Link to="/about" className="hover:text-blue-400">About Us</Link>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
