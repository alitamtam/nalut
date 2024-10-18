import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useGetPublications } from '../Admin/Dashboard/hooks/useGetPublicationById';
import { useIconOptions } from '../Admin/Dashboard/hooks/useIconOptions';
import { useTranslation } from 'react-i18next';
import { FaFacebookF, FaTwitter, FaLinkedinIn } from "react-icons/fa";

const PublicationDetails = () => {
    const { id } = useParams();
    const { data: publication, isLoading, error } = useGetPublications(id);
    const iconOptions = useIconOptions();
    const { t, i18n } = useTranslation('navbar');
    const isArabic = i18n.language === 'ar';
    const currentUrl = window.location.href;


    if (isLoading) {
        return (
            <div className="flex items-center justify-center bg-green-100 border lg:mx-80 border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
                {t('Loading publication...')}
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex items-center justify-center bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                <strong className="font-bold">{t('Error!')}</strong>
                <span className="block sm:inline ml-2">{t('Error loading publication.')}</span>
            </div>
        );
    }

    if (!publication) {
        return <div>{t('Publication not found')}</div>;
    }

    const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${currentUrl}`;
    const twitterShareUrl = `https://twitter.com/intent/tweet?url=${currentUrl}&text=${encodeURIComponent(publication.title)}`;
    const linkedinShareUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${currentUrl}&title=${encodeURIComponent(publication.title)}`;

    const translation = publication.translations[0];

    const profileTranslations = Array.isArray(publication?.owner?.profile?.translations)
        ? publication.owner.profile.translations
        : [];
    const profileTranslation = profileTranslations.filter(t => t.language === i18n.language)[0] || {};
    const arabicName = profileTranslation?.title || '';
    const EnglishName = `${publication?.owner?.firstName || ''} ${publication?.owner?.lastName || ''}`;

    const formatContent = (content) => {
        // Split the content by new lines and filter out empty strings
        const lines = content.split('\n').filter(line => line.trim() !== '');

        return lines.map((line, index) => {
            // Use a regular expression to find hashtags within the line
            const parts = line.split(/(#\w+)/g); // Split by hashtags while keeping them

            return (
                <React.Fragment key={index}>
                    {parts.map((part, partIndex) => {
                        // Check if the part is a hashtag
                        const isHashtag = part.startsWith('#');
                        return (
                            <span key={partIndex} className={isHashtag ? 'font-bold text-blue-950' : ''}>
                                {part}
                            </span>
                        );
                    })}
                    <br /> {/* Add line break for each line */}
                    <br /> {/* Add an additional line break for an empty line */}
                </React.Fragment>
            );
        });
    };

    const topicIcon = iconOptions.find(option => option.name === publication.topic.name)?.icon || null;
    return (
        <div className={`xxl:mx-80 lg:mx-20 xl:mx-20 bg-[#f1f1f1] p-6 ${isArabic ? 'text-right flex-row-reverse' : 'text-left '}`}>
            <h1 className="text-lg font-arabic mb-4 text-gray-600">{translation?.title || publication.title}</h1>
            <div className="w-auto justify-center ssm:py-3">
                <span className="text-gray-500 font-thin">{t('By')} :</span>
                <Link
                    to={`/profileDisplay/${publication.owner.profile?.id}`}
                    className="text-gray-600 mb-2 capitalize font-bold hover:text-teal-600 py-5"
                >
                    <span className="text-orange-600 hover:underline hover:text-teal-600"> {isArabic ? `${arabicName}` : `${EnglishName}`}</span>
                </Link>
            </div>
            <div className="flex flex-col md:flex-row items-start md:items-center space-x-6 mb-6">
                {publication.image ? (
                    <img
                        src={publication.image}
                        alt={publication.title}
                        className="w-full md:w-2/3 h-[300px] object-cover border-b border-gray-300 rounded-none"
                        loading="lazy"
                    />
                ) : (
                    <div className="w-full md:w-1/2 h-64 flex items-center justify-center bg-gray-100 border-t-8 border-b-8 border-teal-700 rounded-none p-4">
                        <div className="flex-shrink-1 text-teal-600 text-9xl md:text-9xl mr-6  border-gray-200">
                            {topicIcon ? (
                                <div className="mb-2">{topicIcon}</div>
                            ) : (
                                <div className="text-6xl text-gray-300">{t('No Icon')}</div>
                            )}
                        </div>
                        <h3 className="text-2xl font-bold text-gray-700 text-center whitespace-normal break-words">
                            {isArabic ? publication.topic.translations[0].name : publication.topic.name}
                        </h3>
                    </div>
                )}
            </div>
            <span className={`mb-4 flex text-gray-500 ${isArabic ? 'flex-col-reverse text-right' : 'text-left'}`}>
                {new Date(publication.createdAt).toLocaleDateString(isArabic ? 'ar-LY' : 'en-UK', {
                    year: 'numeric',
                    month: 'numeric', // Short month format for Arabic
                    day: 'numeric'
                }).replace(/[\u200E\u200F]/g, '')} {/* Remove any LTR/RTL marks if any */}
            </span>


            <div className={`flex items-center space-x-2 mt-2 ${isArabic ? 'lg:text-right flex-row-reverse font-arabic' : ' text-left'}`}>
                <span className="text-sky-950  font-arabic font-bold text-xs uppercase">{t('events.share')}</span>
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
            <div className={` w-full  py-6 mt-6 border-b ${isArabic ? 'text-right flex-col-reverse' : 'text-left '} border-sky-950 `}>
                <p className={`"text-gray-700 mb-4 ${isArabic ? 'xxl:text-right xxl:flex-col-reverse ' : 'text-left '}`}>
                    {formatContent(translation?.content || publication.content)}
                </p>
            </div>
        </div>
    );
};

export default PublicationDetails;
