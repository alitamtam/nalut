import { useLocation } from 'react-router-dom';

const SearchResultPage = () => {
    const location = useLocation();
    const { results } = location.state || { results: {} }; // Get the search results passed via state

    // Check if results is an object
    const isObject = results && typeof results === 'object' && !Array.isArray(results);

    // Extract results from the object
    const allResults = isObject ? [
        ...results.projects,
        ...results.users,
        ...results.profiles,
        ...results.events,
        ...results.publications
    ] : [];

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-2xl font-semibold mb-4">Search Results</h1>

            {allResults.length === 0 ? (
                <p>No results found.</p>
            ) : (
                <ul>
                    {allResults.map((result, index) => (
                        <li key={index} className="mb-4 p-4 border border-gray-200 rounded-md">
                            <h2 className="text-xl font-medium">{result.title || result.name || result.id}</h2>
                            <p>{result.content || result.description || 'No description available.'}</p>
                            {result.link && (
                                <a
                                    href={result.link}
                                    className="text-blue-500 hover:underline"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    View More
                                </a>
                            )}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default SearchResultPage;
