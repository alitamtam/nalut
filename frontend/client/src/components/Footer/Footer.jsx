import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from 'react-icons/fa';

const Footer = () => {
    return (
        <div className="bg-gray-900 text-white py-4">
            <div className="container mx-auto flex justify-between items-center">
                {/* Social Icons */}
                <ul className="flex space-x-4">
                    <li><a href="#"><FaFacebookF /></a></li>
                    <li><a href="#"><FaTwitter /></a></li>
                    <li><a href="#"><FaLinkedinIn /></a></li>
                    <li><a href="#"><FaInstagram /></a></li>
                </ul>

                {/* Navigation Links */}
                <ul className="flex space-x-4">
                    <li><a href="/" className="hover:underline">Home</a></li>
                    <li><a href="/about" className="hover:underline">About Us</a></li>
                </ul>

                <p>&copy; {new Date().getFullYear()} EduLibya | All Rights Reserved</p>
            </div>
        </div>
    );
};

export default Footer;
