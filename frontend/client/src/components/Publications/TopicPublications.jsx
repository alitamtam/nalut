import { useParams, Link } from 'react-router-dom';
import { useGetPublications } from '../Admin/Dashboard/hooks/useGetPublications';
import { useGetTopics } from '../Admin/Dashboard/hooks/useGetTopics';
import { useIconOptions } from '../Admin/Dashboard/hooks/useIconOptions';
import { useTranslation } from 'react-i18next';

const TopicPublications = () => {
    const { topicName } = useParams();  // Extract topic name from URL
    const iconOptions = useIconOptions();
    const { t, i18n } = useTranslation('navbar');
    const isArabic = i18n.language === 'ar';

    // Fetch all topics
    const { data: topics, isLoading: topicsLoading } = useGetTopics();

    // Fetch publications by topic
    const { data: publications, isLoading, error } = useGetPublications(topicName);

    if (isLoading || topicsLoading) {
        return <div className="flex items-center justify-center bg-green-100 border lg:mx-80 border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">Loading publications...</div>;
    }

    if (error) {
        return <div className="flex items-center justify-center bg-red-100 border lg:mx-80 border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">Error loading publications</div>;
    }

    if (publications.length === 0) {
        return <div className="flex items-center justify-center text-center bg-green-100 border lg:mx-80 border-green-400 text-green-700 px-4 py-3 relative">No publications found for {topicName}</div>;
    }

    // Find the topic in the topics list that matches the URL's topicName
    const matchedTopic = topics.find(topic => topic.name === topicName);

    // Get Arabic translation for the topic name if available, otherwise fallback to English
    const arabicTopicName = matchedTopic?.translations?.find(translation => translation.language === 'ar')?.name || topicName;

    // Sort publications by date
    const sortedPublications = [...publications].sort((a, b) => new Date(b.date) - new Date(a.date));
    const recentPublication = sortedPublications[0];
    const otherPublications = sortedPublications.slice(1);

    // Find the icon for the topic
    const topicIcon = iconOptions.find(option => option.name === topicName)?.icon || null;

    // Handle translations for owner's profile
    const profileTranslations = Array.isArray(recentPublication.owner?.profile?.translations) ? recentPublication.owner.profile.translations : [];
    const profileTranslation = profileTranslations.find(t => t.language === i18n.language) || {};
    const arabicName = profileTranslation?.title || '';
    const EnglishName = `${recentPublication?.owner?.firstName || ''} ${recentPublication?.owner?.lastName || ''}`;

    return (
        <div className={`container mx-auto py-10 ${isArabic ? 'flex-col-reverse text-right' : ''}`}>
            <h2 className={`text-3xl font-bold text-teal-600 mb-6 ${isArabic ? 'text-right' : 'text-left '}`}>
                {t('publications.Latest Publications')} - {isArabic ? arabicTopicName : topicName}
            </h2>

            {/* Most Recent Publication */}
            <div className="mb-10">
                <h3 className="text-2xl font-lg mb-4">{t('publications.Featured Publications')}</h3>
                <div className="border shadow-sm p-6 flex flex-col md:flex-row space-x-10 sm:flex-row">
                    {recentPublication.image ? (
                        <img
                            src={recentPublication.image}
                            alt={recentPublication.title}
                            className="w-1/2 h-[240px] object-cover border-2 border-gray-600"
                            loading="lazy"
                        />
                    ) : (
                        <div className="xxl:w-1/2  ssm:w-full md:w-full h-64 flex items-center justify-center bg-white border-t-8 border-b-8 border-teal-700 rounded-none p-4">
                            <div className="flex-shrink-1 text-teal-600 text-9xl md:text-9xl mr-6 border-gray-200">
                                {topicIcon ? (
                                    <div className="mb-2">{topicIcon}</div>
                                ) : (
                                    <div className="text-6xl text-gray-300">{t('No Icon')}</div>
                                )}
                            </div>
                            <h3 className="text-2xl font-bold text-gray-700 text-center whitespace-normal break-words">
                                {isArabic ? arabicTopicName : topicName}
                            </h3>
                        </div>
                    )}
                    <div className={` py-3 ${isArabic ? 'text-right items-end' : 'text-left'}`}>
                        <h4 className="py-3 text-xl font-bold">{isArabic ? recentPublication.translations[0].title : recentPublication.title}</h4>
                        <Link
                            to={`/profileDisplay/${recentPublication.owner.profile?.id}`}
                            className="text-gray-600 mb-2 capitalize font-bold hover:text-teal-600 py-5"
                        >
                            {t('By')} : <span className="text-orange-600 hover:underline hover:text-teal-600"> {isArabic ? `${arabicName}` : `${EnglishName}`}</span>
                        </Link>
                        <p className="mt-4 text-gray-700">{recentPublication.summary}</p>
                        <Link to={`/publications/${recentPublication.id}`} className="text-white hover:bg-sky-950 mt-2 inline-block text-lg border bg-teal-600 px-4 py-1">
                            {t('publications.Read Full Publication')}
                        </Link>
                    </div>
                </div>
            </div>

            {/* Other Publications */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {Array.isArray(otherPublications) && otherPublications.length > 0 ? (
                    otherPublications.map((publication) => (
                        <div key={publication.id || Math.random()} className="border shadow-base p-4">
                            <div className="flex flex-col md:flex-row items-start md:items-center space-x-6 mb-6">
                                {publication.image ? (
                                    <img
                                        src={publication.image}
                                        alt={publication.title}
                                        className="w-full h-[240px] object-cover border-b border-gray-300 rounded-none"
                                        loading="lazy"
                                    />
                                ) : (
                                    <div className="w-full h-64 flex items-center justify-center bg-gray-100 border-t-8 border-b-8 border-teal-700 rounded-none p-4">
                                        <div className="flex-shrink-1 text-teal-600 text-9xl md:text-9xl mr-6 border-gray-200">
                                            {topicIcon ? (
                                                <div className="mb-2">{publication.topic.topicIcon}</div>
                                            ) : (
                                                <div className="text-6xl text-gray-300">{t('No Icon')}</div>
                                            )}
                                        </div>
                                        <h3 className="text-2xl font-thin text-gray-700 text-center whitespace-normal break-words ">
                                            {isArabic ? publication.topic.translations[0].name : publication.topic.name}
                                        </h3>
                                    </div>
                                )}
                            </div>
                            <h4 className="text-xl font-thin py-2 text-gray-700">{isArabic ? publication.translations[0].title : publication.title || 'Untitled'}</h4>
                            <p className="text-sm text-gray-500">
                                {t('By')}: <span className='text-orange-500'>{isArabic ? arabicName : EnglishName}</span>
                            </p>
                            <p className="text-sm text-gray-500 py-1"> {publication.createdAt ? new Date(publication.createdAt).toLocaleDateString() : 'Unknown Date'}</p>
                            <Link to={`/publications/${publication.id || ''}`} className="text-white hover:bg-sky-950 mt-2 inline-block text-lg border bg-teal-600 px-4 py-1">
                                {t('Read More')}
                            </Link>
                        </div>
                    ))
                ) : (
                    <p className="flex items-center justify-center bg-green-100 border lg:mx-80 border-yellow-400 text-yellow-700 px-4 py-3 rounded relative">No publications available at the moment.</p>
                )}
            </div>
        </div>
    );
};

export default TopicPublications;
