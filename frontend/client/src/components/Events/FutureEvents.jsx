import { Link } from 'react-router-dom';
import { useGetEvents } from '../Admin/Dashboard/hooks/useGetEvent';
import { CiCalendar } from "react-icons/ci";
import { IoLocationOutline } from "react-icons/io5";
import { IoMdTime } from "react-icons/io";
import { useTranslation } from 'react-i18next';

const FutureEvents = () => {
    const { data: events, isLoading, error } = useGetEvents();
    const { t, i18n } = useTranslation('navbar');
    const isArabic = i18n.language === 'ar';

    // Function to get translated content based on the current language
    const getTranslatedContent = (event, key) => {
        const currentLang = i18n.language;
        const translation = event.translations?.find(trans => trans.language === currentLang);
        return translation ? translation[key] : event[key];
    };

    if (isLoading) {
        return <p>{t('loading')}</p>;
    }

    if (error) {
        return <p>{t('error')}: {error.message}</p>;
    }

    if (!events || events.length === 0) {
        return <p>{t('events.no_future_events')}</p>;
    }

    // Get the last 3 events
    const lastThreeEvents = events.slice(-3);

    return (
        <div>
            <div className={`flex flex-col items-center lg:justify-between lg:mx-80 pt-6 ${isArabic ? 'text-right' : 'text-left'}`}>
                <h2 className="text-3xl font-bold mb-4 text-center capitalize font-sans text-gray-800">
                    {t('events.description')}
                </h2>
                <Link
                    to='events/view-all'
                    className={`text-teal-600 font-body rounded-full border-2 hover:border-sky-950 border-teal-600 px-14 hover:bg-teal-600 hover:text-white py-2 text-center mb-4 ${isArabic ? 'lg:text-base lg:font-arabic ssm:font-arabic md:font-arabic ssm:text-sm ssm:font-bold' : ''} lg:mb-0 lg:hidden md:block ssm:block`}
                >
                    {t('view_all')}
                </Link>
            </div>

            <div className="flex flex-col items-center p-12 bg-white text-gray-800 h-4/5 border-b border-teal-600 pb-12 mb-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-center mx-auto space-x-3">
                    {lastThreeEvents.map((event) => (
                        <div
                            key={event.id}
                            className="rounded-none overflow-hidden shadow-md bg-gray-100 hover:shadow-lg transition-shadow duration-300 w-96"
                        >
                            <div className="w-full h-56">
                                {/* Event image with consistent sizing */}
                                {event.image && (
                                    <img
                                        src={event.image}
                                        alt={getTranslatedContent(event, 'title')} // Use translated title for alt text
                                        className="min-w-full h-full object-none"
                                    />
                                )}
                            </div>

                            <div className="p-4">
                                {/* Use translated title */}
                                <h3 className="text-xl font-semibold mb-2 text-gray-900 capitalize">
                                    {getTranslatedContent(event, 'title')}
                                </h3>

                                <div className="flex items-center text-gray-600 text-sm mb-2">
                                    <IoLocationOutline className="mr-2" />
                                    <span>{getTranslatedContent(event, 'location')}</span> {/* Translated location */}
                                </div>

                                <div className="flex flex-col text-gray-600 text-sm mb-2">
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

                                <div className="my-6 text-center">
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
        </div>
    );
};

export default FutureEvents;
