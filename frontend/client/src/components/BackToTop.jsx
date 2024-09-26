import { useState, useEffect } from 'react';
import { FaArrowUp } from 'react-icons/fa';
import '../components/style/BackToTop.css';

const BackToTop = () => {
    const [isVisible, setIsVisible] = useState(false);

    // Show button when the page is scrolled down
    const toggleVisibility = () => {
        if (window.scrollY > 300) { // Fixed here: Use window.scrollY
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    };

    // Scroll to top when the button is clicked
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    useEffect(() => {
        window.addEventListener('scroll', toggleVisibility);
        return () => window.removeEventListener('scroll', toggleVisibility);
    }, []);

    return (
        <div className="back-to-top z-10" style={{ opacity: isVisible ? 1 : 0, visibility: isVisible ? 'visible' : 'hidden' }}>
            <button onClick={scrollToTop}>
                <FaArrowUp />
            </button>
        </div>
    );
};

export default BackToTop;
