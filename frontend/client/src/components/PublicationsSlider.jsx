import { TECarousel, TECarouselItem } from "tw-elements-react";
import { useGetPublications } from "./Admin/Dashboard/hooks/useGetPublications";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useTranslation } from 'react-i18next'; // Import the hook

const PublicationsSlider = () => {
    const { data: publications = [], isLoading, isError } = useGetPublications();
    const [activeIndex, setActiveIndex] = useState(0);
    const { t, i18n } = useTranslation('navbar'); // Use the hook to get the translation function
    const isArabic = i18n.language === 'ar'; // Check if the language is Arabic
    const recentPublications = Array.isArray(publications) ? publications.slice(0, 3) : []; // Ensure it's an array

    if (isLoading) return <p>{t('loading_publications')}</p>;
    if (isError) return <p>{t('error_fetching_publications')}</p>;

    const handleNext = () => {
        setActiveIndex((prevIndex) =>
            prevIndex === recentPublications.length - 1 ? 0 : prevIndex + 1
        );
    };

    const handlePrev = () => {
        setActiveIndex((prevIndex) =>
            prevIndex === 0 ? recentPublications.length - 1 : prevIndex - 1
        );
    };

    const handleIndicatorClick = (index) => {
        setActiveIndex(index);
    };

    return (
        <div className={`relative  ${isArabic ? 'lg:text-right flex-row-reverse ' : ''} overflow-hidden capitalize`}>
            <TECarousel
                className="relative h-[550px] object-cover w-[stretch]"
                showControls
                autoPlay
                crossfade
                ride="carousel"
                prevBtnIcon={
                    <span
                        className="absolute top-1/3 left-2 transform-translate-y-1/2 text-white h-8 w-8 bg-sky-950 rounded-full"
                        onClick={handlePrev}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M15.75 19.5L8.25 12l7.5-7.5"
                            />
                        </svg>
                    </span>
                }
                nextBtnIcon={
                    <span
                        className="absolute top-1/3 right-2 transform-translate-y-1/2 text-white h-8 w-8 bg-sky-950 rounded-full"
                        onClick={handleNext}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M8.25 4.5l7.5 7.5-7.5 7.5"
                            />
                        </svg>
                    </span>
                }
            >
                {recentPublications.length > 0 ? recentPublications.map((pub, index) => {
                    const translation = pub.translations.find(t => t.language === i18n.language) || {};
                    const profileTranslation = pub.owner.profile.translations.find(t => t.language === i18n.language) || {};
                    const topicTranslation = pub.topic.translations.find(t => t.language === i18n.language) || {};
                    const publicationTitle = translation.title || pub.title;
                    const arabicName = profileTranslation.title || '';
                    const EnglishName = `${pub.owner.firstName} ${pub.owner.lastName}`;

                    return (
                        <TECarouselItem
                            key={pub.id}
                            itemID={pub.id}
                            className={`absolute top-0 left-0 lg:w-full lg:h-full transition-opacity duration-500 ease-in-out ${activeIndex === index ? "opacity-100" : "opacity-0"} `}
                        >
                            {/* Image Section */}
                            <div className={`relative ${isArabic ? 'lg:text-right' : ''}`}>
                                <img
                                    src={pub.image || "https://via.placeholder.com/600x400"}
                                    className="block w-full h-[435px] object-cover"
                                    alt={publicationTitle}
                                />
                                <span className={`absolute bottom-4  text-white  px-2  ${isArabic ? 'ssm:text-right ssm:flex ssm:flex-row-reverse  ' : 'ssm:text-left'} py-1 lg:text-lg ssm:text-lg  shadow-slate-600 font-arabic`}>
                                    <Link to={`/publications/${pub.id}`} >
                                        {publicationTitle}
                                    </Link>
                                </span>
                            </div>

                            {/* Slide Details Section */}
                            <div className={`bg-white p-2 ${isArabic ? 'text-right  ' : ''} text-black hover:text-teal-600 `}>
                                <h5 className={`flex text-lg font-normal ${isArabic ? 'text-right flex flex-row-reverse lg:text-base' : ''} text-sky-950 hover:text-teal-600 py-1`}>
                                    {topicTranslation.name || ''}
                                </h5>
                                <p className={`text-gray-600 text-bold ${isArabic ? 'text-right  ' : ''} ssm:flex-row-reverse`}>
                                    {new Date(pub?.createdAt).toLocaleDateString(
                                        isArabic ? 'ar-LY' : 'en-UK',
                                        { day: 'numeric', month: 'short', year: 'numeric' }
                                    )}
                                </p>

                                <p className={`text-sm mt-1 ${isArabic ? 'text-right ' : ''} font-bold capitalize text-orange-400 hover:text-teal-600 z-10`}>
                                    <span className={` text-gray-500 ${isArabic ? '' : ''}`}>{t('By')} : </span>
                                    <Link to={`/profileDisplay/${pub.owner.profile.id}`}> {isArabic ? `${arabicName}` : `${EnglishName}`}</Link>
                                </p>
                            </div>
                        </TECarouselItem>
                    );
                }) : (
                    <div className="text-center text-gray-600">
                        <p>{t('no_publications_found')}</p> {/* Optional message when there are no publications */}
                    </div>
                )}

                {/* Indicators */}
                <div className={`absolute bottom-0 w-full py-2 flex ${isArabic ? 'text-right' : ''} justify-center space-x-2 border-b-4 border-gray-100 shadow-lg px-4`}>
                    {recentPublications.length > 0 && recentPublications.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => handleIndicatorClick(index)}
                            className={`h-3 w-3 rounded-full transition-all ${isArabic ? 'text-right' : ''} duration-300 ${activeIndex === index ? "bg-sky-950" : "bg-gray-300"}`}
                        ></button>
                    ))}
                </div>
            </TECarousel>
        </div>
    );
};

export default PublicationsSlider;
