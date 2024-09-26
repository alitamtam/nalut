import { FaFacebookF, FaTwitter, FaLinkedinIn } from 'react-icons/fa';

const Footer = () => {
    return (
        <div className="bg-neutral-200 text-gray-800 py-12 lg:py-16">
            <div className="container mx-auto px-4 lg:px-8 flex flex-col lg:flex-row justify-between items-center space-y-8 lg:space-y-0">
                {/* Navigation Links on the left */}
                <ul className="flex flex-col lg:flex-row lg:space-x-6 space-y-3 lg:space-y-0 text-center lg:text-left font-semibold font-mono uppercase text-lg">
                    <li><a href="/" className=" text-teal-600 font-extrabold hover:underline hover:text-teal-600">Home</a></li>
                    <li><a href="/about" className="hover:underline hover:text-teal-600">About Us</a></li>
                    <li><a href="/publications" className="hover:underline hover:text-teal-600">Publications / Resources</a></li>
                    <li><a href="/projects" className="hover:underline hover:text-teal-600">Actions / Projects</a></li>
                    <li><a href="/events/view-all" className="hover:underline hover:text-teal-600">Events</a></li>
                </ul>

                {/* Empty middle space for balance */}
                <div className="hidden lg:block flex-1"></div>

                {/* Contact and Social Icons on the right */}
                <div className="flex flex-col items-center lg:items-end space-y-4">
                    <p className="text-center lg:text-right">Contact: <a href="mailto:contact@edulibya.ly" className="hover:underline">contact@edulibya.ly</a></p>
                    <ul className="flex space-x-4">
                        <li><a href="#"><FaFacebookF /></a></li>
                        <li><a href="#"><FaTwitter /></a></li>
                        <li><a href="https://www.linkedin.com/groups/12856663/"><FaLinkedinIn /></a></li>
                    </ul>
                </div>
            </div>

            {/* Footer Bottom Text */}
            <div className="text-center mt-8">
                <p>&copy; {new Date().getFullYear()} EduLibya | All Rights Reserved</p>
            </div>
        </div>
    );
};

export default Footer;
