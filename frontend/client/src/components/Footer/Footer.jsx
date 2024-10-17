import { Link } from 'react-router-dom';
import { FaFacebookF, FaLinkedinIn } from 'react-icons/fa';
import { CiMail } from 'react-icons/ci';
import BackToTop from '../BackToTop';
import { useTranslation } from 'react-i18next'; // Import the hook

const Footer = () => {
    const { t } = useTranslation('navbar'); // Use the hook to get the translation function

    return (
        <footer className="bg-sky-950 text-white py-12 lg:py-16">
            {/* Back to Top Button */}
            <BackToTop />

            <div className="container mx-auto px-4 lg:px-8 flex flex-col lg:flex-row justify-between items-center space-y-8 lg:space-y-0">
                {/* Navigation Links on the left */}
                <nav aria-label="Footer navigation" className="text-center lg:text-left">
                    <ul className="flex flex-col lg:flex-row lg:space-x-6 space-y-3 lg:space-y-0 font-arabic uppercase text-base">
                        <li>
                            <Link to="/" className="text-orange-600 font-extrabold hover:text-teal-600">
                                {t('home')}
                            </Link>
                        </li>
                        <li>
                            <Link to="/about" className="hover:text-teal-600">
                                {t('about.title')}
                            </Link>
                        </li>
                        <li>
                            <Link to="/publications" className="hover:text-teal-600">
                                {t('publications.title')}
                            </Link>
                        </li>
                        <li>
                            <Link to="/projects" className="hover:text-teal-600">
                                {t('projects.title')}
                            </Link>
                        </li>
                        <li>
                            <Link to="/events/view-all" className="hover:text-teal-600">
                                {t('events.title')}
                            </Link>
                        </li>
                    </ul>
                </nav>

                {/* Empty space for layout balance */}
                <div aria-hidden="true" className="hidden lg:block flex-1"></div>

                {/* Contact and Social Icons on the right */}
                <div className="flex flex-col items-center lg:items-center space-y-4 font-arabic  text-sm">
                    <h3 className='capitalize text-gray-100 text-sm'>EduLibya, education reform, community </h3>
                    <p className="flex items-center  xxl:text-right ">
                        <CiMail className="text-lg mr-1 mt-0 text-gray-50" aria-hidden="true" />
                        <a href="mailto:contact@edulibya.ly" className="hover:underline text-white hover:text-teal-600">
                            contact@edulibya.ly
                        </a>
                    </p>

                    {/* Social Media Links */}
                    <div aria-label="Social media links" className="flex space-x-2 text-lg ">
                        <a
                            href="https://www.facebook.com/groups/527521202798857/"
                            aria-label="EduLibya Facebook"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-teal-600"
                        >
                            <FaFacebookF aria-hidden="true" />
                        </a>
                        <a
                            href="https://www.linkedin.com/groups/12856663/"
                            aria-label="EduLibya LinkedIn"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-teal-600"
                        >
                            <FaLinkedinIn aria-hidden="true" />
                        </a>
                    </div>
                </div>
            </div>

            {/* Footer Bottom Text */}
            <div className="text-center mt-8 text-white font-arabic">
                <p>&copy; {new Date().getFullYear()} EduLibya | {t('all_rights_reserved')}</p>
            </div>
        </footer>
    );
};

export default Footer;
