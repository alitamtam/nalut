import { Link } from 'react-router-dom';
import { useGetPublications } from '../Admin/Dashboard/hooks/useGetPublications';
import { useIconOptions } from '../Admin/Dashboard/hooks/useIconOptions';
import { useTranslation } from 'react-i18next';

const PublicationsArea = () => {
    const { data: publications, isLoading, error } = useGetPublications();
    const iconOptions = useIconOptions();
    const { t } = useTranslation('navbar');

    if (isLoading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error.message}</p>;
    }

    if (!publications || publications.length === 0) {
        return <p>No publications found.</p>;
    }

    const lastThreePublications = publications.slice(-3);
    return (
        <div>
            <div className="flex flex-col items-center lg:flex-row lg:justify-between lg:mx-80 pb-4">
                <h2 className="text-3xl font-bold lg:mb-4 text-center capitalize font-body text-gray-800">
                    {t('publication area')}
                </h2>
                <Link to='/publications/view-all' className="border-2 text-teal-600 font-body border-teal-600 rounded-full hover:bg-teal-600 hover:text-white py-2 px-8 mb-4 lg:mb-0 hidden lg:block">
                    {t('view_all')}
                </Link>
            </div>

            <div className="flex flex-col lg:items-center lg:p-12 bg-white text-gray-800 lg:h-4/5 border-b border-teal-600 pb-12 mb-12 w-full max-w-full overflow-x-hidden">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 lg:px-80 lg:gap-14 ssm:gap-3 justify-center mx-auto">
                    {lastThreePublications.map((publication) => {
                        const topicName = publication.topic?.name || "Unknown Topic";
                        const topicIcon = iconOptions.find(option => option.name === topicName)?.icon || null;
                        const translation = publication.translations[0]; // Assuming only one translation per language

                        return (
                            <div
                                key={publication.id}
                                className="rounded-none overflow-hidden shadow-md bg-gray-100 hover:shadow-lg transition-shadow duration-300 w-96"
                            >
                                <div className="w-full h-56">
                                    {publication.image ? (
                                        <img
                                            src={publication.image}
                                            alt={translation?.title || publication.title}
                                            className="w-full  h-64 object-cover "
                                        />
                                    ) : (
                                        <div className="w-full  h-64 flex items-center justify-center bg-gray-100 border-t-8 border-b-8 border-teal-600 rounded-none p-6">
                                            <div className="flex-shrink-1 text-teal-600 text-9xl md:text-9xl mr-6">
                                                {topicIcon ? (
                                                    <div className="mb-2">{topicIcon}</div>
                                                ) : (
                                                    <div className="text-6xl text-gray-300">No Icon</div>
                                                )}
                                            </div>
                                            <h3 className="text-2xl font-bold text-gray-700 text-center whitespace-normal break-words">
                                                {topicName}
                                            </h3>
                                        </div>
                                    )}
                                </div>
                                <div className="pt-12 pb-6 px-6">
                                    <p className="text-gray-400 pb-2 text-sm capitalize font-semibold">
                                        {new Date(publication.createdAt).toLocaleDateString("en-UK", { day: 'numeric', month: 'long', year: 'numeric' })}
                                    </p>
                                    <div className='pb-8'>
                                        <Link to={`/publications/${publication.id}`} className="text-lg font-normal  mb-2 text-gray-800 capitalize hover:text-teal-600">
                                            {translation?.title || publication.title}
                                        </Link>
                                    </div>

                                    {translation?.description && (
                                        <p className="text-gray-700 text-sm mb-3 line-clamp-2">
                                            {translation.description}
                                        </p>
                                    )}
                                    <div>
                                        <p className="text-sm capitalize font-bold">
                                            <span className="text-gray-600">{t('By')}</span>
                                            <Link to={`/profileDisplay/${publication.owner.profile?.id}`} className="text-orange-600 hover:underline">
                                                {publication.owner.firstName} {publication.owner.lastName}
                                            </Link>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
                <div className='pt-10 m-auto'>
                    <Link to='/publications/view-all' className="border-2 text-teal-600 font-body border-teal-600 rounded-full hover:bg-teal-600 hover:text-white py-2 px-14 mb-4 lg:mb-0 lg:hidden md:block ssm:block">
                        {t('view_all')}
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default PublicationsArea;
