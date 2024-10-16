import { Link } from 'react-router-dom';

import { FaFacebookF, FaLinkedinIn } from 'react-icons/fa';
import { CiMail } from "react-icons/ci";
import BackToTop from '../BackToTop';
import { useTranslation } from 'react-i18next'; // Import the hook

const Footer = () => {
    const { t } = useTranslation('navbar'); // Use the hook to get the translation function

    return (
        <div className="bg-sky-950 text-white py-12 lg:py-16">
            <BackToTop />
            <div className="container mx-auto px-4 lg:px-8 flex flex-col lg:flex-row justify-between items-center space-y-8 lg:space-y-0">
                {/* Navigation Links on the left */}
                <ul className="flex flex-col lg:flex-row lg:space-x-6 space-y-3 lg:space-y-0 text-center lg:text-left font-semibold font-arabic uppercase text-lg">
                    <li><Link to="/" className=" text-teal-600 font-extrabold  hover:text-teal-600">{t('home')}</Link></li>
                    <li><Link to="/about" className=" hover:text-teal-600">{t('about.title')}</Link></li>
                    <li><Link to="/publications" className=" hover:text-teal-600">{t('publications.title')}</Link></li>
                    <li><Link to="/projects" className=" hover:text-teal-600">{t('projects.title')}</Link></li>
                    <li><Link to="/events/view-all" className=" hover:text-teal-600">{t('events.title')}</Link></li>
                </ul>
                {/* Empty middle space for balance */}
                <div className="hidden lg:block flex-1"></div>

                {/* Contact and Social Icons on the right */}
                <div className="flex flex-col items-center lg:items-end space-y-4 font-arabic">
                    <p className="flex text-center lg:text-right"><CiMail className='text-lg mr-2 mt-1 text-sky-950' />  <a href="mailto:contact@edulibya.ly" className="hover:underline text-white hover:text-teal-600"> contact@edulibya.ly</a></p>
                    <ul className="flex space-x-2 text-lg lg:pr-10"> <span className='text-white py-0 mb-2'></span>
                        <li><a href="https://www.facebook.com/groups/527521202798857/"><FaFacebookF className='hover:text-teal-600' /></a></li>
                        {/* <li><a href="#"><FaTwitter /></a></li> */}
                        <li><a href="https://www.linkedin.com/groups/12856663/"><FaLinkedinIn className='hover:text-teal-600' /></a></li>
                    </ul>
                </div>

            </div>

            {/* Footer Bottom Text */}
            <div className="text-center mt-8 text-white font-arabic">
                <p>&copy; {new Date().getFullYear()} EduLibya | All Rights Reserved</p>
            </div>
        </div>
    );
};

export default Footer;
