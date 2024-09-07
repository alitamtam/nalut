import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';

const HomePage = () => {
    return (
        <div className="min-h-screen bg-gray-100">
            <header className="bg-blue-900 text-white py-4">
                <nav className="container mx-auto flex justify-between items-center px-4">
                    <a href="/" className="text-xl font-bold">EduLibya</a>
                    <div className="flex space-x-4">
                        <a href="/search" className="text-white hover:underline">Search</a>
                        <a href="/about" className="text-white hover:underline">About Us</a>
                        <a href="/publications" className="text-white hover:underline">Publications</a>
                        <a href="/news" className="text-white hover:underline">News</a>
                    </div>
                </nav>
            </header>

            <main className="container mx-auto px-4 py-8">
                <section className="bg-white shadow-lg rounded-lg p-6 mb-8">
                    <h1 className="text-4xl font-bold mb-4">Welcome to EduLibya</h1>
                    <p className="mb-4">EduLibya is dedicated to improving education across Libya through community engagement and collaboration.</p>
                    <p className="mb-4">Join us in our mission to make education more meaningful and impactful for students and teachers alike.</p>
                    <div className="flex space-x-4">
                        <Link to="/about" className="bg-blue-900 text-white py-2 px-4 rounded-lg hover:bg-blue-800">Learn More</Link>
                        <Link to="/publications" className="bg-blue-900 text-white py-2 px-4 rounded-lg hover:bg-blue-800">Our Publications</Link>
                    </div>
                </section>

                <section className="bg-white shadow-lg rounded-lg p-6">
                    <h2 className="text-2xl font-bold mb-4">Our Community</h2>
                    <p className="mb-4">Meet the passionate individuals driving change in the Libyan education sector. Our community includes educators, researchers, and community leaders committed to making a difference.</p>
                    <div className="flex space-x-4">
                        <a href="https://facebook.com" className="text-blue-600 hover:text-blue-800"><FaFacebook size={24} /></a>
                        <a href="https://twitter.com" className="text-blue-400 hover:text-blue-600"><FaTwitter size={24} /></a>
                        <a href="https://instagram.com" className="text-pink-600 hover:text-pink-800"><FaInstagram size={24} /></a>
                    </div>
                </section>
            </main>

            <footer className="bg-gray-800 text-white py-4">
                <div className="container mx-auto px-4 flex flex-col items-center">
                    <div className="mb-4">
                        <a href="mailto:contact@edulibya.ly" className="text-blue-400 hover:underline">contact@edulibya.ly</a>
                    </div>
                    <div className="flex flex-col items-center space-y-2">
                        <Link to="/agenda" className="text-white hover:underline">Agenda</Link>
                        <Link to="/associations" className="text-white hover:underline">Associations</Link>
                        <Link to="/about" className="text-white hover:underline">About Us</Link>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default HomePage;
