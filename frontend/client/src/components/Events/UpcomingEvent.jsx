import { useState } from 'react';
import Slider from 'react-slick';
import { Link } from 'react-router-dom';
import { FaMapMarkerAlt, FaCalendarAlt } from 'react-icons/fa';
import { useGetEvents } from '../Admin/Dashboard/hooks/useGetEvent';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './sliderStyle.css';
import { useTranslation } from 'react-i18next';

const UpcomingEvent = () => {
    const { data: events, isLoading, isError } = useGetEvents();
    const [currentSlide, setCurrentSlide] = useState(0);
    const { t, i18n } = useTranslation('navbar'); // Get both translation function and the current language

    const settings = {
        dots: true,
        dotsClass: 'slick-dots custom-dots',
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        beforeChange: (oldIndex, newIndex) => setCurrentSlide(newIndex),
        arrows: false,
    };

    if (isLoading) {
        return <div>{t('loading')}...</div>;
    }

    if (isError) {
        return <div>{t('errorFetchingEvents')}</div>;
    }

    // Sort events by startTime and limit to last 3
    const sortedEvents = [...events].sort((a, b) => new Date(a.startTime) - new Date(b.startTime)).slice(-3);

    // Helper function to get the translated title based on the current language
    const getTranslatedTitle = (event) => {
        const currentLang = i18n.language; // Get the current language
        const translation = event.translations?.find(trans => trans.language === currentLang);
        return translation?.title || event.title; // Use translated title if available, otherwise default title
    };

    return (
        <div className='lg:mx-80 mb-20'>
            {/* Heading and View All Button */}
            <div className="flex flex-col items-center lg:flex-row lg:justify-between pb-5">
                <h2 className="text-2xl lg:mb-4 text-center capitalize font-bold text-gray-800">
                    {t('upcoming events')}
                </h2>
                <Link to='events/view-all' className="border-2 text-teal-600 font-body border-teal-600 rounded-full hover:bg-teal-600 hover:text-white py-2 px-8 mb-4 lg:mb-0 hidden lg:block md:hidden">
                    {t('view_all')}
                </Link>
            </div>

            {/* Event Details and Slider */}
            <div className="mx-auto px-4 lg:py-8 flex flex-col-reverse lg:flex-row justify-between items-center">
                <div className='pt-20 m-auto'>
                    <Link to='events/view-all' className="border-2 text-teal-600 font-body border-teal-600 rounded-full hover:bg-teal-600 hover:text-white py-2 px-14 mb-4 lg:mb-0 lg:hidden md:block ssm:block">
                        {t('topics.view_all')}
                    </Link>
                </div>
                <div className="w-full lg:w-1/2 bg-[#e2dfd8] lg:h-[340px] px-4 py-6 lg:px-8 lg:py-12 lg:mb-0 h-full">
                    {sortedEvents.length > 0 && (
                        <>
                            <Link to={`/events/${sortedEvents[currentSlide]?.id}`} className="text-gray-800 font-serif text-xl lg:text- font-bold mb-6 hover:text-teal-600 block capitalize">
                                {getTranslatedTitle(sortedEvents[currentSlide])} {/* Get translated title */}
                            </Link>
                            <div className='mb-6'>
                                <p className="text-gray-700 mb-2 flex items-center">
                                    <FaMapMarkerAlt className="mr-2" /> {sortedEvents[currentSlide]?.location}
                                </p>
                                <p className="text-gray-700 mb-4 flex items-center">
                                    <FaCalendarAlt className="mr-2" /> {new Date(sortedEvents[currentSlide]?.startTime).toLocaleDateString()} {t('at')} {new Date(sortedEvents[currentSlide]?.startTime).toLocaleTimeString()}
                                </p>
                            </div>
                            <Link to={`/events/${sortedEvents[currentSlide]?.id}`} className="bg-teal-600 text-white font-sans py-3 lg:py-4 border-teal-600 text-base rounded-full hover:bg-sky-950 hover:text-white px-6 lg:px-8 transition-colors duration-300">
                                {t('viewDetails.title')}
                            </Link>
                        </>
                    )}
                </div>

                {/* Right Side: Image Slider */}
                <div className="w-full lg:w-1/2 h-auto lg:h-[340px]">
                    <Slider {...settings}>
                        {sortedEvents.map((event, index) => (
                            <div key={index}>
                                <img
                                    src={event.image || '/default-event-image.jpg'}
                                    alt={getTranslatedTitle(event)} // Use the translated title for alt text
                                    className="w-full h-60 lg:h-[340px] object-cover"
                                />
                            </div>
                        ))}
                    </Slider>
                </div>
            </div>
        </div>
    );
};

export default UpcomingEvent;
