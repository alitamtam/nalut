import { useGetEvents } from '../Admin/Dashboard/hooks/useGetEvent';
import { CiCalendar } from "react-icons/ci";
import { IoLocationOutline } from "react-icons/io5";
import { IoMdTime } from "react-icons/io";
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next'; // Import the hook

const AllEvents = () => {
    // Fetch all events using the useGetEvents hook
    const { data: events, isLoading, isError, error } = useGetEvents();
    const { t, i18n } = useTranslation('navbar'); // Use the hook to get the translation function
    const isArabic = i18n.language === 'ar'; // Check if the language is Arabic

    // Function to get translated content based on the current language
    const getTranslatedContent = (event, key) => {
        const currentLang = i18n.language;
        const translation = event.translations?.find(trans => trans.language === currentLang);
        return translation ? translation[key] : event[key];
    };

    if (isLoading) {
        return <p>{t('loading')}</p>; // Show loading state while fetching events
    }

    if (isError) {
        return <p>{t('error')}: {error.message}</p>; // Display error if there's an issue
    }

    if (!events || events.length === 0) {
        return <p>{t('events.no_events_found')}</p>; // Handle case where no events are returned
    }

    return (
        <div className="flex flex-col items-center py-12  text-gray-800 h-4/5">
            <h2 className="text-3xl font-bold mb-4 items-start capitalise font-sans text-gray-800">
                {t('events.last-events')}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xxl:px-80 lg:mx-20 xl:mx-20 gap-4 justify-center mx-auto xxl:py-6">
                {events.map((event) => (
                    <div
                        key={event.id}
                        className="rounded-none overflow-hidden bg-gray-100 hover:shadow-lg transition-shadow duration-300 xxl:w-96"
                    >
                        <div className="w-full h-56">
                            {/* Event image with consistent sizing */}
                            {event.image && (
                                <img
                                    src={event.image} // Image source
                                    alt={getTranslatedContent(event, 'title')} // Accessible alt text with translated title
                                    className="w-full h-full object-fit" // Full width, height, and object-cover to maintain aspect ratio
                                    loading="lazy"

                                />
                            )}
                        </div>
                        <div className="p-4">
                            {/* Translated event title */}
                            <h3 className={`font-semibold mb-2 ${isArabic ? 'text-right' : ' '} text[#092a40] capitalize  text-lg py-4`}>
                                {getTranslatedContent(event, 'title')}
                            </h3>

                            <div className={`flex flex-col ${isArabic ? 'items-end' : ' '} text[#092a40] text-ssm mb-2`}>
                                {/* Translated event location */}
                                <div className="flex items-center text[#092a40] text-ssm mb-2">
                                    <IoLocationOutline className="mr-2" />
                                    <span>{getTranslatedContent(event, 'location')}</span>
                                </div>

                                {/* Event date formatted based on language */}
                                <div className="flex items-center mb-1">
                                    <CiCalendar className="mr-2" />
                                    <span>
                                        {new Date(event.startTime).toLocaleDateString(isArabic ? 'ar-LY' : 'en-UK', {
                                            year: 'numeric',
                                            month: 'short',
                                            day: 'numeric',
                                        })}
                                    </span>
                                </div>

                                {/* Event time formatted based on language */}
                                <div className="flex items-center">
                                    <IoMdTime className="mr-2" />
                                    <span>
                                        {new Date(event.startTime).toLocaleTimeString(isArabic ? 'ar-LY' : 'en-UK', {
                                            hour: '2-digit',
                                            minute: '2-digit',
                                        })} -{' '}
                                        {new Date(event.endTime).toLocaleTimeString(isArabic ? 'ar-LY' : 'en-UK', {
                                            hour: '2-digit',
                                            minute: '2-digit',
                                        })}
                                    </span>
                                </div>
                            </div>

                            <div className="mt-4 text-center py-5">
                                <Link
                                    to={`/events/${event.id}`}
                                    className="bg-teal-600 text-white font-sans py-4 border-teal-600 text-base rounded-full hover:bg-sky-950 hover:text-white px-8 transition-colors duration-300"
                                >
                                    {t('viewDetails.title')}
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AllEvents;
