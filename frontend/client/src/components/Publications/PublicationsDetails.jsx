// path: frontend/client/src/components/PublicationDetails.jsx
import { useParams } from 'react-router-dom';
import { useGetPublications } from '../Admin/Dashboard/hooks/useGetPublications' // Hook to fetch publications

const PublicationDetails = () => {
    const { id } = useParams();  // Get publication ID from URL
    const { data: publications, isLoading, error } = useGetPublications();

    if (isLoading) return <div>Loading publication...</div>;
    if (error) return <div>Error loading publication</div>;

    // Find the specific publication by ID
    const publication = publications?.find((pub) => pub.id === parseInt(id));

    if (!publication) return <div>Publication not found</div>;

    return (
        <div className="container mx-auto py-10">
            <h1 className="text-3xl font-bold mb-4">{publication.title}</h1>
            <p className="text-gray-600">
                By {publication.author} | {new Date(publication.date).toLocaleDateString()}
            </p>
            <img
                src={publication.image || '/default-image.jpg'}
                alt={publication.title}
                className="w-full h-64 object-cover my-6"
            />
            <div className="mt-6">
                <p>{publication.content}</p>
            </div>
        </div>
    );
};

export default PublicationDetails;
