import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const PublicationCard = ({ publication }) => {
    const { id, image, topic, } = publication;
    const { name: topicName } = topic;

    return (
        <div className="bg-white shadow-lg rounded-none overflow-hidden flex flex-col">
            {image ? (
                <img
                    src={image}
                    alt={publication.title}
                    className="w-full h-48 object-cover"
                />
            ) : (
                <div className="flex items-center justify-center h-48 bg-gray-200 text-gray-600 text-lg">
                    {topicName || 'No Image'}
                </div>
            )}
            <div className="p-4 flex flex-col flex-grow">
                <h2 className="text-xl font-semibold text-gray-800 mb-2">
                    {publication.title}
                </h2>
                <h3 className="text-lg font-medium text-gray-600 mb-2">
                    {topicName}
                </h3>
                {/* <p className="text-gray-700 mb-4 flex-grow">
                    {content}
                </p> */}
                <Link
                    to={`/publications/${id}`}
                    className="bg-teal-500 text-white py-2 px-4 rounded-md hover:bg-teal-600 transition duration-300 text-center"
                >
                    View Details
                </Link>
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
        resumeText: PropTypes.string.isRequired,
    }).isRequired,
};

export default PublicationCard;
