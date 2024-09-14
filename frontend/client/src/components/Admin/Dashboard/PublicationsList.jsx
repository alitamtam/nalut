import { useGetPublications } from "../Dashboard/hooks/useGetPublications";


const PublicationsList = () => {
    const { data: publications, isPending, error } = useGetPublications();

    if (isPending) {
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
                        <th className="text-left py-2">Topic</th>
                        <th className="text-left py-2">Title</th>
                        <th className="text-left py-2">Author</th>
                        <th className="text-left py-2">Published Date</th>
                    </tr>
                </thead>
                <tbody>
                    {publications.map((publication) => (
                        <tr key={publication.id}>
                            <td className="border px-4 py-2">{publication.topicId}</td>
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
