/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { IoIosArrowDropupCircle } from "react-icons/io";
import '../index.css'; // Ensure this imports the correct CSS

const BackToTop = () => {
    const [isVisible, setIsVisible] = useState(false);

    // Show or hide button based on scroll position
    const handleScroll = () => {
        // Log scroll position for debugging
        setIsVisible(window.scrollY > 300); // Toggle visibility based on scroll position
    };

    // Scroll to top with smooth behavior
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    // Add scroll event listener
    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll); // Cleanup on unmount
    }, []);

    return (
        <div className={`back-to-top ${isVisible ? 'visible' : ''}`}>
            <button onClick={scrollToTop} className="back-to-top-btn" aria-label="Back to top">
                <IoIosArrowDropupCircle />
            </button>
        </div>
    );
};

export default BackToTop;
