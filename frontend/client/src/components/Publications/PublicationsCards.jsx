import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next'; // Import the translation hook
import { useIconOptions } from '../Admin/Dashboard/hooks/useIconOptions';

const PublicationCard = ({ publication }) => {
    const { id, topic, translations, createdAt, title } = publication;
    const { name: topicName } = topic || {}; // Ensure topic is defined
    const iconOptions = useIconOptions();

    const { t, i18n } = useTranslation('navbar'); // Use translation hook
    const isArabic = i18n.language === 'ar';
    const topicIcon = iconOptions.find(option => option.name === topicName)?.icon || (
        <div className="text-6xl text-gray-300"> {/* Default icon */}
            <a href="http://localhost:5173/"></a>
        </div>
    );

    if (!publication) {
        return <div className="text-red-600">Publication data is unavailable</div>;
    }

    return (
        <div className="bg-gray-100 shadow-lg rounded-none overflow-hidden flex flex-col h-full">
            {/* Removed image section */}
            <div className="flex items-center justify-center border-y-4 border-teal-600 h-48 bg-gray-50 text-sky-950 text-lg font-bold">
                <div className="flex-shrink-1 text-teal-600 text-9xl md:text-9xl mr-6 border-gray-200">
                    {topicIcon}
                </div>
                {isArabic ? topic?.translations[0]?.name : topicName || 'No Image'}
            </div>

            <div className={`p-4 flex ${isArabic ? 'items-end text-right' : ''} flex-col flex-grow`}>
                <h1 className="text-sm text-gray-600">
                    {new Date(createdAt).toLocaleDateString()}
                </h1>

                <h2 className="text-base font-normal text-sky-900 mb-2">
                    {t('topics.title.title')} :  {isArabic ? translations[0].title : title}
                </h2>

                <h3 className="text-base font-medium text-gray-600 mb-4">
                    {t('topics.title')} : {isArabic ? topic?.translations[0]?.name : topicName}
                </h3>

                <div className="mt-auto"> {/* Ensures button stays at the bottom */}
                    <Link
                        to={`/publications/${id}`}
                        className=" border-teal-600 text-center text-lg  hover:bg-sky-950 bg-teal-600  text-white py-2 px-8 font-arabic hover:border-none"
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
            translations: PropTypes.arrayOf(
                PropTypes.shape({
                    name: PropTypes.string,
                })
            ),
        }),
        title: PropTypes.string.isRequired,
        createdAt: PropTypes.string.isRequired,
        translations: PropTypes.arrayOf(
            PropTypes.shape({
                language: PropTypes.string.isRequired,
                title: PropTypes.string,
            })
        ).isRequired,
    }).isRequired,
};

export default PublicationCard;
