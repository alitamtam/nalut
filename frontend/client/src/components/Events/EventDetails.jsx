import { useParams } from 'react-router-dom';
import { useGetEventById } from '../Admin/Dashboard/hooks/useGetEventById';
import { CiCalendar } from "react-icons/ci";
import { IoLocationOutline } from "react-icons/io5";
import { IoMdTime } from "react-icons/io";
import { FaFacebookF, FaTwitter, FaLinkedinIn } from "react-icons/fa";
import FutureEvents from './FutureEvents';
import { useTranslation } from 'react-i18next'; // Import useTranslation

const EventDetails = () => {
    const { id } = useParams();
    const { data: event, isLoading, error } = useGetEventById(id);
    const currentUrl = window.location.href;
    const { t, i18n } = useTranslation(); // Use i18n for translations
    const isArabic = i18n.language === 'ar'; // Check if the current language is Arabic
    if (isLoading) {
        return <p>{t('event.loading')}</p>; // Translated loading message
    }

    if (error) {
        return <p>{t('event.error')}{error.message}</p>; // Translated error message
    }

    const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${currentUrl}`;
    const twitterShareUrl = `https://twitter.com/intent/tweet?url=${currentUrl}&text=${encodeURIComponent(event.title)}`;
    const linkedinShareUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${currentUrl}&title=${encodeURIComponent(event.title)}`;

    // Helper function to get the translated title and description based on the current language
    const getTranslatedContent = (key) => {
        const currentLang = i18n.language;
        const translation = event.translations?.find(trans => trans.language === currentLang);
        return translation ? translation[key] : event[key];
    };

    return (
        < >
            <div className={`flex flex-col items-center p-8 ${isArabic ? 'text-right ' : ' '} bg-white text-gray-800 `}>
                <div className="lg:max-w-7xl w-full flex flex-col lg:flex-row bg-white  overflow-hidden ">
                    {/* Left Section: Title and Date */}
                    <div className="flex-1 bg-neutral-200 p-6 flex flex-col justify-between">
                        <div>
                            <h2 className="text-3xl  mb-4 py-6 px-6 text-gray-700 lg:font-arabic ">
                                {getTranslatedContent('title')}
                            </h2>
                            <div className="flex items-center text-gray-700 text-xl mb-4">
                                <CiCalendar className="mr-2" />
                                <span>
                                    {new Date(event.startTime).toLocaleDateString('en-UK', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric',
                                    })}
                                </span>
                            </div>

                            <a className="flex items-center text-gray-700 text-xl mb-4" href={`${event.link}`}>
                                {t('events.event-link')}
                            </a>
                            {/* Share on social media links */}
                            <div className="flex items-center space-x-2 mt-2">
                                <span className="text-sky-950 font-bold">{t('event.share')}</span>
                                <a href={facebookShareUrl} target="_blank" rel="noopener noreferrer" className="text-sky-950 hover:text-teal-600">
                                    <FaFacebookF size={18} />
                                </a>
                                <a href={twitterShareUrl} target="_blank" rel="noopener noreferrer" className="text-sky-950 hover:text-teal-600">
                                    <FaTwitter size={18} />
                                </a>
                                <a href={linkedinShareUrl} target="_blank" rel="noopener noreferrer" className="text-sky-950 hover:text-teal-600">
                                    <FaLinkedinIn size={18} />
                                </a>
                            </div>
                        </div>
                        <div className="flex-1"></div>
                    </div>

                    {/* Right Section: Image and Event Details */}
                    <div className="flex-1 flex flex-col">
                        {event.image && (
                            <img
                                src={event.image}
                                alt={event.title}
                                className="h-60 object-cover w-full lg:h-full"
                            />
                        )}

                        {/* Event Details (location, start/end time) */}

                    </div>
                </div>
            </div>
            <div className={`flex flex-col  p-8 ${isArabic ? 'text-right ' : ' '} bg-white text-gray-800  lg:min-w-80 items-center `}>
                <div className={`bg-sky-950 flex items-center  flex-col text-white p-3 h-[200px] w-[200px]`}>
                    <div className="mb-4">
                        <IoLocationOutline className="inline-block mr-2" />
                        <span>{event.location}</span>
                    </div>
                    <div className={`mb-4 flex ${isArabic ? 'text-left' : ''} items-center `}>
                        <IoMdTime className="inline-block mr-2" />
                        <span>
                            {new Date(event.startTime).toLocaleTimeString(isArabic ? 'ar-LY' : 'en-UK', {
                                hour: '2-digit',
                                minute: '2-digit',
                                hour12: true,
                            })} -{' '}
                            {new Date(event.endTime).toLocaleTimeString(isArabic ? 'ar-LY' : 'en-UK', {
                                hour: '2-digit',
                                minute: '2-digit',
                                hour12: true,
                            })}
                        </span>
                    </div>
                </div>
                {/* Description Section */}
                <div className="max-w-6xl w-full bg-white p-6 mt-6 border-b border-sky-950 ">
                    <p className="text-gray-800 text-sm mb-6 leading-relaxed">
                        {getTranslatedContent('description')}
                    </p>
                </div>

                <FutureEvents /></div>
        </>
    );
};

export default EventDetails;
