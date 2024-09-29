import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useGetPublications } from '../Admin/Dashboard/hooks/useGetPublicationById'; // Hook to fetch publications
import { useIconOptions } from '../Admin/Dashboard/hooks/useIconOptions'; // Import the icon options hook

const PublicationDetails = () => {
    const { id } = useParams(); // Correct usage: Get publication ID from URL without passing id
    const { data: publication, isLoading, error } = useGetPublications(id); // Fetch publications by ID
    const iconOptions = useIconOptions(); // Get the icon options

    if (isLoading) return <div className="flex items-center justify-center bg-green-100 border lg:mx-80 border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">Loading publication...</div>;
    if (error) return (
        <div className="flex items-center justify-center bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
            <strong className="font-bold">Error!</strong>
            <span className="block sm:inline ml-2">Error loading publication.</span>
        </div>
    );
    // // Find the specific publication by ID
    // const publication = publications?.find((pub) => pub.id === parseInt(id));

    if (!publication) return <div>Publication not found</div>;

    // Find the icon based on the publication's topic name
    const topicIcon = iconOptions.find(option => option.name === publication.topic.name)?.icon || null;

    const formatContent = (content) => {
        // Regular expression to match dot followed by a capital letter
        const regex = /(?<=\.) (?=[A-Z])/g;

        // Split content based on the regular expression
        const lines = content.split(regex).filter(line => line.trim() !== '');

        return lines.map((line, index) => (
            <React.Fragment key={index}>
                {line.trim()}
                {/* Add line break between sentences, but not after the last one */}
                {index < lines.length - 1 && <br />}
            </React.Fragment>
        ));
    };

    return (
        <div className="lg:mx-80 bg-slate-100 p-6 rounded-lg shadow-md">
            <h1 className="text-3xl font-bold mb-4">{publication.title}</h1>

            {/* Flex container for image and author details */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
                {/* Image on the left */}
                {publication.image ? (
                    <img
                        src={publication.image}
                        alt={publication.title}
                        className="w-full md:w-1/2 h-64 object-cover rounded-lg"
                    />
                ) : (
                    <div className="w-full md:w-1/2 h-64 flex items-center justify-center bg-gray-100 border-t-8 border-b-8 border-sky-950 rounded-none p-4">
                        {/* Icon Section */}
                        <div className="flex-shrink-1 text-sky-950 text-9xl md:text-9xl mr-6">
                            {topicIcon ? (
                                <div className="mb-2">{topicIcon}</div>
                            ) : (
                                <div className="text-6xl text-gray-300">No Icon</div>
                            )}
                        </div>

                        {/* Title Section */}
                        <h3 className="text-2xl font-bold text-gray-700 text-center whitespace-normal break-words">
                            {publication.topic.name}
                        </h3>
                    </div>
                )}

                {/* Separator line */}
                <div className="hidden md:block w-px bg-gray-300 mx-6"></div>

                {/* Author details on the right */}
                <div className="w-full md:w-1/2 flex flex-col items-start justify-center">
                    <Link to={`/profileDisplay/${publication.owner.profile?.id}`} className="text-gray-600 mb-2 capitalize font-bold hover:text-teal-600 py-5">
                        By {publication.owner.first_name} {publication.owner.last_name} | {new Date(publication.created_at).toLocaleDateString("en-UK", { day: 'numeric', month: 'long', year: 'numeric' })}
                    </Link>

                </div>
            </div>

            {/* Thin line divider */}
            <hr className="border-t border-gray-300 my-6" />

            {/* Article content */}
            <div className="mt-6 p-6 rounded-lg">
                <p className="text-gray-700 mb-4 flex-grow">
                    {formatContent(publication.content)}
                </p>
            </div>
        </div>
    );
};

export default PublicationDetails;
