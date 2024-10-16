import { Link, useParams } from 'react-router-dom';
import { useGetProjectById } from '../Admin/Dashboard/hooks/projectsHooks/useGetProjectById';
import { useTranslation } from 'react-i18next'; // Import useTranslation

const ProjectDetails = () => {
    const { id } = useParams();
    const { data: project, isLoading, error } = useGetProjectById(id);
    const { t, i18n } = useTranslation('navbar'); // Use i18n for translations
    const isArabic = i18n.language === 'ar'; // Check if the current language is Arabic

    if (isLoading) {
        return (
            <div className="flex items-center justify-center bg-green-100 border lg:mx-80 border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
                {t('loading')}...
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex items-center justify-center bg-red-100 border lg:mx-80 border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                {t('error')} {error.message}
            </div>
        );
    }

    // Ensure project exists before rendering details
    if (!project) {
        return <div className="text-center">{t('No Project Found')}</div>;
    }

    // Use translations for the project content if available
    const translation = project.translations[0]; // Assuming the project has translation support
    const profileTranslation = project.creator.profile.translations.find(t => t.language === i18n.language) || {};
    const arabicName = profileTranslation.title || '';
    const EnglishName = `${project.creator.firstName} ${project.creator.lastName}`;
    return (
        <div className={`xxl:mx-80 xl:mx-20 lg:mx-20  p-6 ${isArabic ? 'font-arabic text-right xxl:flex-col-reverse justify-end' : ''}`}>

            <h1 className={`text-3xl font-bold mb-4 ${isArabic ? 'text-right' : ''}`}>
                {translation?.title || project.title}
            </h1>
            <div className={`w-full  flex flex-col  ${isArabic ? 'text-right flex-col-reverse right' : 'items-start justify-center'}`}>


                {/* Author details on the right */}
                <Link to={`/profileDisplay/${project.creator.profile?.id}`}>
                    <span className="text-gray-500 font-thin">{t('By')} :</span>

                    <span className="text-orange-600 hover:underline hover:text-teal-600"> {isArabic ? `${arabicName}` : `${EnglishName}`}</span>


                </Link>
            </div>
            {/* Flex container for image and author details */}
            <div className={`flex flex-col md:flex-row  md:items-center justify-between mb-6 ${isArabic ? 'items-end' : ' items-start'}`}>

                {/* Image on the left */}
                <img
                    src={project.projectImage}
                    alt={translation?.title || project.title}
                    className={`w-full md:w-1/2 h-64 object-cover ${isArabic ? 'order-2' : ''}`}
                />

                {/* Separator line */}
                <div className="hidden md:block w-px bg-gray-300 mx-6"></div>


            </div>
            <span className="text-gray-500 mb-2 capitalize font-normal px-4">
                {new Date(project.createdAt).toLocaleDateString({ day: 'numeric', month: 'numeric', year: 'numeric' })}
            </span>
            {/* Thin line divider */}
            <hr className="border-t border-gray-300 my-6" />

            {/* Project content */}
            <section className="mt-6 p-6">
                <p className="text-gray-700 mb-4 flex-grow">
                    {translation?.content1 || project.content1}
                </p>
            </section>
            <section>
                <p className="text-gray-700 mb-4 flex-grow">
                    {translation?.content2 || project.content2}
                </p>
            </section>
            <section>
                <p className="text-gray-700 mb-4 flex-grow">
                    {translation?.content3 || project.content3}
                </p>
            </section>
        </div>
    );
};

export default ProjectDetails;
