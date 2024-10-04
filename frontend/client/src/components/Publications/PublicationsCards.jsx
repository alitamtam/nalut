/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next'; // Import the translation hook

const PublicationCard = ({ publication }) => {
    const { id, image, topic } = publication;
    const { name: topicName } = topic;
    const { t, i18n } = useTranslation('navbar'); // Use translation hook
    const isArabic = i18n.language === 'ar';
    console.log('arabic version:', topic.translations[0])

    return (
        <div className="bg-gray-100 shadow-lg rounded-none overflow-hidden flex flex-col h-full">
            {image ? (
                <img
                    src={image}
                    alt={publication.title}
                    className="w-full h-70 object-cover"
                />
            ) : (
                <div className="flex items-center justify-center h-48 bg-gray-50 text-gray-600 text-lg">
                    {topicName || 'No Image'}
                </div>
            )}
            <div className={`p-4 flex ${isArabic ? 'items-end text-right' : ''} flex-col flex-grow`}>
                <h1 className="text-sm text-gray-600">
                    {new Date(publication.createdAt).toLocaleDateString()}
                </h1>

                <h2 className="text-base font-medium text-gray-800 mb-2">
                    {isArabic ? publication.translations[0].title : publication.title}
                </h2>
                <h3 className="text-lg font-medium text-gray-600 mb-4">
                    {isArabic ? topic.translations[0].name : topicName} </h3>

                <div className="mt-auto"> {/* Ensures button stays at the bottom */}
                    <Link
                        to={`/publications/${id}`}
                        className="text-sky-950 border-2 border-sky-950 text-center rounded-full hover:bg-sky-950 bg-gray-50 hover:text-white py-2 px-8 font-sans hover:border-none"
                    >
                        {t('viewDetails.title')}
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
        createdAt: PropTypes.string.isRequired,
        translations: PropTypes.arrayOf(
            PropTypes.shape({
                language: PropTypes.string.isRequired,
                title: PropTypes.string,
            })
        ).isRequired,
        resumeText: PropTypes.string.isRequired,
    }).isRequired,
};

export default PublicationCard;
