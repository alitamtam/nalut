import { useParams } from 'react-router-dom';
import { useGetPublications } from '../Admin/Dashboard/hooks/useGetPublications'; // Hook to fetch publications
import { FaBook } from 'react-icons/fa'; // Example topic icon (replace as needed)

const PublicationDetails = () => {
    const { id } = useParams(); // Get publication ID from URL
    const { data: publications, isLoading, error } = useGetPublications();

    if (isLoading) return <div>Loading publication...</div>;
    if (error) return <div>Error loading publication</div>;

    // Find the specific publication by ID
    const publication = publications?.find((pub) => pub.id === parseInt(id));

    if (!publication) return <div>Publication not found</div>;

    return (
        <div className="lg:mx-80  bg-slate-100">
            <h1 className="text-3xl font-bold mb-4" > {publication.title}</h1 >
            <p className="text-gray-600">
                By: {publication.owner.first_name} {publication.owner.last_name} | {new Date(publication.date).toLocaleDateString()}
            </p>

            {
                publication.image ? (
                    <img
                        src={publication.image}
                        alt={publication.title}
                        className="w-full h-64 object-cover my-6 rounded-lg"
                    />
                ) : (
                    <div className="w-full h-64 flex flex-col items-center justify-center bg-white border border-gray-300 rounded-lg my-6">
                        <FaBook className="text-6xl text-blue-600 mb-4" /> {/* Icon */}
                        <h3 className="text-2xl font-bold text-gray-700">
                            {publication.topic.name}
                        </h3>
                    </div>
                )
            }

            <div className="mt-6 bg-slate-100 p-6 rounded-lg shadow-md">
                <p className="text-gray-800 text-lg font-sans leading-relaxed tracking-wide">
                    {publication.content}
                </p>
            </div>
        </div >
    );
};

export default PublicationDetails;
