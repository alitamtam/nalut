import { useParams, Link } from 'react-router-dom';
import { useGetPublications } from '../Admin/Dashboard/hooks/useGetPublications'; // Hook to fetch publications
import { useIconOptions } from '../Admin/Dashboard/hooks/useIconOptions'; // Import the icon options hook

const PublicationDetails = () => {
    const { id } = useParams(); // Get publication ID from URL
    const { data: publications, isLoading, error } = useGetPublications();
    const iconOptions = useIconOptions(); // Get the icon options

    if (isLoading) return <div>Loading publication...</div>;
    if (error) return <div>Error loading publication</div>;

    // Find the specific publication by ID
    const publication = publications?.find((pub) => pub.id === parseInt(id));

    if (!publication) return <div>Publication not found</div>;

    // Find the icon based on the publication's topic name
    const topicIcon = iconOptions.find(option => option.name === publication.topic.name)?.icon || null;
    console.log(publication.owner.Profile);

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
                    <div className="w-full md:w-1/2 h-64 flex flex-row items-center justify-center bg-white border-t-8 border-b-8 border-lime-600  rounded-none">
                        {topicIcon ? (
                            <div className="text-lime-600 text-9xl mb-2 mr-10">{topicIcon}</div>
                        ) : (
                            <div className="text-6xl text-gray-300 mb-4">No Icon</div>
                        )}
                        <h3 className="text-2xl font-bold text-gray-700">
                            {publication.topic.name}
                        </h3>
                    </div>
                )}

                {/* Separator line */}
                <div className="hidden md:block w-px bg-gray-300 mx-6"></div>

                {/* Author details on the right */}
                <div className="w-full md:w-1/2 flex flex-col items-start justify-center">
                    <p className="text-gray-600 mb-2 capitalize">
                        By: {publication.owner.first_name} {publication.owner.last_name} | {new Date(publication.created_at).toLocaleDateString()}
                    </p>
                    <Link
                        to={`/profile/${publication.owner.Profile.id}`} // Ensure correct capitalization and optional chaining
                        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                    >
                        View Details
                    </Link>


                </div>
            </div>

            {/* Thin line divider */}
            <hr className="border-t border-gray-300 my-6" />

            {/* Article content */}
            <div className="mt-6 bg-slate-100 p-6 rounded-lg shadow-md">
                <p className="text-gray-800 text-lg font-sans leading-relaxed tracking-wide">
                    {publication.content}
                </p>
            </div>
        </div>
    );

};

export default PublicationDetails;
