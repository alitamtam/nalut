import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useGetPublications } from '../Admin/Dashboard/hooks/useGetPublicationById'; // Hook to fetch publications
import { useIconOptions } from '../Admin/Dashboard/hooks/useIconOptions'; // Import the icon options hook
import { useTranslation } from 'react-i18next'; // Import the translation hook

const PublicationDetails = () => {
    const { id } = useParams(); // Get publication ID from URL
    const { data: publication, isLoading, error } = useGetPublications(id); // Fetch publication by ID
    const iconOptions = useIconOptions(); // Get the icon options
    const { t } = useTranslation('navbar'); // Use translation hook

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

    // Find the icon based on the publication's topic name
    const topicIcon = iconOptions.find(option => option.name === publication.topic.name)?.icon || null;
    const translation = publication.translations[0]; // Assuming only one translation per language

    const formatContent = (content) => {
        const regex = /(?<=\.) (?=[A-Z])/g; // Split content based on dot followed by a capital letter
        const lines = content.split(regex).filter(line => line.trim() !== '');

        return lines.map((line, index) => (
            <React.Fragment key={index}>
                {line.trim()}
                {index < lines.length - 1 && <br />} {/* Add line break between sentences */}
            </React.Fragment>
        ));
    };

    return (
        <div className="lg:mx-80 bg-[#f1f1f1] p-6">
            <h1 className="text-3xl font-bold mb-4">{translation?.title || publication.title}</h1>

            {/* Flex container for image and author details */}
            <div className="flex flex-col md:flex-row items-start md:items-center space-x-6 mb-6">
                {/* Image on the left */}
                {publication.image ? (
                    <img
                        src={publication.image}
                        alt={publication.title}
                        className="w-full md:w-1/2 h-[300px] object-cover border-b border-gray-300 rounded-none"
                    />
                ) : (
                    <div className="w-full md:w-1/2 h-64 flex items-center justify-center bg-gray-100 border-t-8 border-b-8 border-sky-950 rounded-none p-4">
                        {/* Icon Section */}
                        <div className="flex-shrink-1 text-sky-950 text-9xl md:text-9xl mr-6 border-b border-gray-200">
                            {topicIcon ? (
                                <div className="mb-2">{topicIcon}</div>
                            ) : (
                                <div className="text-6xl text-gray-300">{t('No Icon')}</div>
                            )}
                        </div>

                        {/* Title Section */}
                        <h3 className="text-2xl font-bold text-gray-700 text-center whitespace-normal break-words">
                            {publication.topic.name}
                        </h3>
                    </div>
                )}

                {/* Author details on the right */}
                <div className="w-auto justify-center ssm:py-3">
                    <span className="text-gray-600 mb-2 capitalize font-bold hover:text-teal-600 py-5">{t('By')} </span>
                    <Link
                        to={`/profileDisplay/${publication.owner.profile?.id}`}
                        className="text-gray-600 mb-2 capitalize font-bold hover:text-teal-600 py-5"
                    >
                        {publication.owner.firstName} {publication.owner.lastName}
                    </Link>  |  {/* Add a separator between author and date */}
                    <span className="text-gray-500 mb-2 capitalize font-normal">
                        {new Date(publication.createdAt).toLocaleDateString('en-UK', { day: 'numeric', month: 'numeric', year: 'numeric' })}

                    </span>
                </div>
            </div>

            {/* Article content */}
            <div className="w-auto mt-6 p-6 ssm:border-t border-gray-300">
                <p className="text-gray-700 mb-4 flex-grow">
                    {formatContent(translation?.content || publication.content)} {/* Use translation if available */}
                </p>
            </div>
        </div>
    );
};

export default PublicationDetails;
