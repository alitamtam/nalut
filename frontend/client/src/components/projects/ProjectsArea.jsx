import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useGetProjects } from "../Admin/Dashboard/hooks/projectsHooks/useGetProjects";
import { Link } from "react-router-dom";
import { useTranslation } from 'react-i18next';

const ProjectsArea = () => {
    const { data: projects, isPending, error } = useGetProjects();
    const { t, i18n } = useTranslation('navbar');
    const isArabic = i18n.language === 'ar'; // Check if the current language is Arabic

    if (isPending) return <div>{t('loading')}...</div>;
    if (error) return <div className="flex items-center justify-center bg-red-100 border lg:mx-80 border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">Error: {error.message}</div>;

    if (!projects || projects.length === 0) {
        return <div className="flex items-center justify-center text-gray-500">{t('noProjectsAvailable')}</div>;
    }

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                }
            }
        ]
    };

    const lastThreeProjects = (projects || []).slice(-9);

    return (
        <div className="p-4">
            <div className={`flex flex-col items-center ${isArabic ? 'lg:text-base lg:font-arabic ssm:font-arabic md:font-arabic ssm:text-2xl ssm:font-bold lg:flex-row-reverse' : ''} lg:flex-row lg:justify-between xxl:mx-80 xl:mx-20 lg:mx-20 py-4`}>
                <h2 className={`text-3xl font-bold mb-4 text-center capitalize ${isArabic ? 'lg:text-2xl lg:font-arabic ssm:font-arabic md:font-arabic ssm:text-2xl ssm:font-bold' : ''} font-sans text-sky-950`}>
                    {t('projects.title')}
                </h2>
                <Link to='/projects/ViewAllProjects' className={`border-2 text-teal-600 font-arabic ${isArabic ? 'lg:text-base lg:font-arabic ssm:font-arabic md:font-arabic ssm:text-sm ' : ''} border-teal-600 rounded-full hover:bg-teal-600 hover:text-white py-2 px-8 mb-4 lg:mb-0 hidden lg:block`}>
                    {t('view_all')}
                </Link>
            </div>

            <div className=" text-gray-800 xxl:h-4/5 border-b border-teal-600 xxl:pb-12 xxl:mb-12 w-full max-w-full overflow-x-hidden">
                <div className="xxl:mx-80 lg:mx-20 xl:mx-20 w-auto">
                    {lastThreeProjects.length === 0 ? (
                        <div className="flex items-center justify-center text-gray-500">{t('No Projects Available')}</div>
                    ) : (
                        <Slider {...settings}>
                            {lastThreeProjects.map((project) => {
                                const translation = project.translations[0]; // Assuming only one translation per language
                                const projectTitle = translation ? translation.title : project.title; // Fallback to default if no translation
                                const profileTranslation = project.creator.profile.translations.find(t => t.language === i18n.language) || {};
                                const arabicName = profileTranslation.title || '';
                                const EnglishName = `${project.creator.firstName} ${project.creator.lastName}`;
                                return (
                                    <div key={project.id} className="xxl:py-12 px-1 ">
                                        <div className={`bg-[#e2dfd8] p-4 ${isArabic ? 'text-right' : ''}`}>
                                            <div>
                                                <Link to={`/projects/${project.id}`} className="lg:text-ssm font-semibold capitalize hover:text-teal-600 xxl:py-6">
                                                    <p className="h-12 mb-6">{projectTitle}</p>
                                                </Link>
                                            </div>
                                            {project.projectImage && (
                                                <Link to={`/projects/${project.id}`}>
                                                    <div>
                                                        <img
                                                            src={project.projectImage}
                                                            alt={projectTitle}
                                                            className="w-[480px] lg:h-60 object-cover mt-2 my-4"
                                                        />
                                                    </div>
                                                </Link>
                                            )}
                                            <Link to={`/profileDisplay/${project.creator.profile?.id}`} className={`text-sm mt-1 font-bold capitalize text-orange-400 hover:text-teal-600 ${isArabic ? 'text-right ' : ''}`}>
                                                <span className="text-gray-500 font-thin">{t('By')} :</span>
                                                <span className="text-orange-600 hover:underline hover:text-teal-600"> {isArabic ? `${arabicName}` : `${EnglishName}`}</span>
                                            </Link>
                                        </div>
                                    </div>
                                );
                            })}
                        </Slider>
                    )}
                </div>

                <div className="pt-10 flex justify-center">
                    <Link to='/projects/ViewAllProjects' className="border-2 text-teal-600 font-arabic border-teal-600 rounded-full  hover:bg-teal-600 hover:text-white py-2 px-14 mb-4 lg:mb-0 lg:hidden md:block ssm:block">
                        {t('view_all')}
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ProjectsArea;
