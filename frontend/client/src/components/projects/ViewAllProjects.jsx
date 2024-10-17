import { useGetProjects } from "../Admin/Dashboard/hooks/projectsHooks/useGetProjects";
import { Link } from "react-router-dom";
import { useTranslation } from 'react-i18next'; // Import useTranslation

const ViewAllProjects = () => {
    const { data: projects, isPending, error } = useGetProjects();
    const { t, i18n } = useTranslation('navbar'); // Use i18n for translations
    const isArabic = i18n.language === 'ar'; // Check if the current language is Arabic

    if (isPending) {
        return <div className="text-center">{t('loading')}...</div>;
    }

    if (error) {
        return (
            <div className="flex items-center justify-center bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                Error: {error.message}
            </div>
        );
    }

    // Ensure projects is not undefined before mapping
    if (!projects || projects.length === 0) {
        return <div className="text-center">{t('noProjectsAvailable')}</div>;
    }

    return (
        <div className="xxl:mx-80 lg:mx-20 xl:mx-20 items-center p-4">
            <h2 className={`text-3xl font-bold text-center text-gray-800 mb-4 ${isArabic ? 'lg:text-2xl lg:font-arabic' : ''}`}>
                {t('projects.description')}
            </h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {projects.map((project) => {
                    const translation = project.translations[0]; // Assuming only one translation per language

                    return (
                        <div key={project.id} className="border bg-neutral-100 border-gray-200 p-6 shadow-lg transition-transform duration-300 transform hover:scale-105">
                            <h3 className="text-xl font-semibold capitalize">
                                {translation?.title || project.title} {/* Use translation if available */}
                            </h3>
                            <p className="text-gray-600">
                                {translation?.content1 || project.content1} {/* Use translated content if available */}
                            </p>
                            {project.projectImage && (
                                <img
                                    src={project.projectImage}
                                    alt={translation?.title || project.title}
                                    className="w-full h-40 object-cover mt-4"
                                    loading="lazy"

                                />
                            )}
                            <div className="mt-4 text-center py-5">
                                <Link to={`/projects/${project.id}`} className="bg-teal-600 text-white font-sans py-4 border-teal-600 text-base rounded-full hover:bg-sky-950 hover:text-white px-8 transition-colors duration-300">
                                    {t('viewDetails.title')}
                                </Link>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default ViewAllProjects;
