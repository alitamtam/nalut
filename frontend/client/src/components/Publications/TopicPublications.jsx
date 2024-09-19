// path: frontend/client/src/components/TopicPublications.jsx
import { useParams, Link } from 'react-router-dom';
import { useGetPublications } from '../Admin/Dashboard/hooks/useGetPublications';

const TopicPublications = () => {
    const { topicName } = useParams();

    // Fetch publications by topic
    const { data: publications, isLoading, error } = useGetPublications(topicName);

    if (isLoading) return <div>Loading publications...</div>;
    if (error) return <div>Error loading publications</div>;

    if (publications.length === 0) return <div>No publications found for {topicName}</div>;

    // Sort publications by date (assuming `publication.date` is available)
    const sortedPublications = [...publications].sort(
        (a, b) => new Date(b.date) - new Date(a.date)
    );

    // Get the most recent publication
    const recentPublication = sortedPublications[0];
    const otherPublications = sortedPublications.slice(1);

    return (
        <div className="container mx-auto py-10">
            <h2 className="text-3xl font-bold text-teal-600 mb-6">{topicName} - Latest Publications</h2>

            {/* Most Recent Publication */}
            <div className="mb-10">
                <h3 className="text-2xl font-semibold mb-2">Featured Publication</h3>
                <div className="border rounded-lg shadow-lg p-6 flex flex-col md:flex-row">
                    <img
                        src={recentPublication.image || '/default-image.jpg'}
                        alt={recentPublication.title}
                        className="w-full md:w-1/3 object-cover rounded-lg mb-4 md:mb-0"
                    />
                    <div className="md:ml-6">
                        <h4 className="text-xl font-bold">{recentPublication.title}</h4>
                        <p className="text-sm text-gray-500 capitalize">By: {recentPublication.owner.first_name} {recentPublication.owner.last_name} | {new Date(recentPublication.created_at).toLocaleDateString()}</p>
                        <p className="mt-4 text-gray-700">{recentPublication.summary}</p>
                        <Link to={`/publications/${recentPublication.id}`} className="text-teal-500 hover:underline mt-4 inline-block">
                            Read Full Publication
                        </Link>
                    </div>
                </div>
            </div>

            {/* Other Publications */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {otherPublications.map((publication) => (
                    <div key={publication.id} className="border rounded-lg shadow-lg p-4">
                        <img
                            src={publication.image || '/default-image.jpg'}
                            alt={publication.title}
                            className="w-full h-48 object-cover rounded-lg mb-4"
                        />
                        <h4 className="text-xl font-bold">{publication.title}</h4>
                        <p className="text-sm text-gray-500">By {publication.author} | {new Date(publication.date).toLocaleDateString()}</p>
                        <Link to={`/publications/${publication.id}`} className="text-teal-500 hover:underline mt-2 inline-block">
                            Read More
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TopicPublications;
