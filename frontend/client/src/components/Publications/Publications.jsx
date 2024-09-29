import { useGetPublications } from '../Admin/Dashboard/hooks/useGetPublications'; // Hook to fetch publications
import PublicationCard from './PublicationsCards' // Adjust the path as needed

const Publications = () => {
    const { data: publications = [], isLoading, error } = useGetPublications();

    if (isLoading) return <div className="flex items-center justify-center bg-green-100 border lg:mx-80 border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">Loading publications...</div>;
    if (error) return <div className="flex items-center justify-center bg-red-100 border lg:mx-80 border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">Error loading publications</div>;

    // Sort publications by date in descending order
    const sortedPublications = [...publications].sort((a, b) => new Date(b.date) - new Date(a.date));

    return (
        <div className="lg:mx-80 bg-slate-100 p-6 rounded-none shadow-md h-full">
            <h1 className="text-3xl font-bold mb-6">Publications</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {sortedPublications.map(publication => (
                    <PublicationCard key={publication.id} publication={publication} />
                ))}
            </div>
        </div>
    );
};

export default Publications;
