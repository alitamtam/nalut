import { useEffect, useState } from 'react';
import axios from 'axios';


const PublicationsList = () => {
    const [publications, setPublications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPublications = async () => {
            try {
                const response = await axios.get('/api/publications/topics');
                setPublications(response.data);
                setLoading(false);


            } catch {
                setError('Error fetching publications');
                setLoading(false);
            }
        };
        fetchPublications();
    }, []);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">Publications List</h2>
            <table className="min-w-full bg-white">
                <thead>
                    <tr>
                        <th className="text-left py-2">ID</th>
                        <th className="text-left py-2">Title</th>
                        <th className="text-left py-2">Author</th>
                        <th className="text-left py-2">Published Date</th>
                    </tr>
                </thead>
                <tbody>
                    {publications.map((publication) => (
                        <tr key={publication.id}>
                            <td className="border px-4 py-2">{publication.id}</td>
                            <td className="border px-4 py-2">{publication.title}</td>
                            <td className="border px-4 py-2">{publication.author}</td>
                            <td className="border px-4 py-2">{publication.publishedDate}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default PublicationsList;
