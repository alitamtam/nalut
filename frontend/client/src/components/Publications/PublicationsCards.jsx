import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const PublicationCard = ({ publication }) => {
    const { id, image, topic } = publication;
    const { name: topicName } = topic;

    return (
        <div className="bg-gray-300 shadow-lg rounded-none overflow-hidden flex flex-col h-full">
            {image ? (
                <img
                    src={image}
                    alt={publication.title}
                    className="w-full h-70 object-cover"
                />
            ) : (
                <div className="flex items-center justify-center h-48 bg-gray-300 text-gray-600 text-lg">
                    {topicName || 'No Image'}
                </div>
            )}
            <div className="p-4 flex flex-col flex-grow">
                <h1 className="text-sm text-gray-600">
                    {new Date(publication.created_at).toLocaleDateString()}
                </h1>

                <h2 className="text-xl font-semibold text-gray-800 mb-2">
                    {publication.title}
                </h2>
                <h3 className="text-lg font-medium text-gray-600 mb-4">
                    {topicName}
                </h3>

                <div className="mt-auto"> {/* Ensures button stays at the bottom */}
                    <Link
                        to={`/publications/${id}`}
                        className="text-blue-950 border-2 border-blue-950 text-center rounded-full hover:bg-blue-950 bg-gray-300 hover:text-gray-300 py-2 px-8 font-sans hover:border-none"
                    >
                        View Details
                    </Link>
                </div>
            </div>
        </div>
    );
};

PublicationCard.propTypes = {
    publication: PropTypes.shape({
        id: PropTypes.number.isRequired,
        topic: PropTypes.shape({
            name: PropTypes.string,
        }),
        image: PropTypes.string,
        title: PropTypes.string.isRequired,
        publicatinTitle: PropTypes.string.isRequired,
        topicTitle: PropTypes.string,
        content: PropTypes.string.isRequired,
        created_at: PropTypes.string.isRequired,
        resumeText: PropTypes.string.isRequired,
    }).isRequired,
};

export default PublicationCard;
