// import TopicsSlider from '../components/TopicsSlider';
import PublicationsSlider from '../components/PublicationsSlider';
import { Link } from 'react-router-dom';
import TopicsSlider2 from '../components/TopicSlick';
import UpcomingEvent from '../components/Events/UpcomingEvent'
import PublicationsArea from '../components/Publications/PublicationsArea';
import ProjectsList from '../components/projects/ProjectsArea';
import BackToTop from '../components/BackToTop';
import { useTranslation } from 'react-i18next'; // Import the hook

const HomePage = () => {
    const { t, i18n } = useTranslation('navbar'); // Use the hook to get the translation function
    const isArabic = i18n.language === 'ar'; // Check if the current language is Arabic

    return (
        <>
            {/* SEO for HomePage */}
            <title>EduLibya - Education Network</title>
            <meta name="description" content="EduLibya is a network for improving the educational sector across Libya. Join our community for conversations on education reform." />
            <meta name="keywords" content="Libya, education, EduLibya, education reform, community" />

            {/* Open Graph Meta Tags */}
            <meta property="og:title" content="EduLibya - Education Network in Libya" />
            <meta property="og:description" content="EduLibya is a community-driven network focused on education reform in Libya." />
            <meta property="og:image" content="/path-to-og-image.jpg" />
            <meta property="og:type" content="website" />
            <meta property="og:url" content="https://www.edulibya.ly" />

            {/* Twitter Card Meta Tags */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content="EduLibya - Education Network" />
            <meta name="twitter:description" content="Join EduLibya in conversations about education reform." />
            <meta name="twitter:image" content="/path-to-twitter-image.jpg" />
            {/* Section 1: Publications and About Us */}
            <section className="lg:mx-20 xxl:mx-80 xl:mx-20 md:mx-0  items-center justify-center">
                <div className="flex flex-col lg:flex-row md:flex-row ssm:flex-col justify-center ">
                    {/* Left Side - Publications Slider */}
                    <div className="lg:w-2/3 md:w-full xxl:w-full  xl:w-full sm:w-full ssm:w-full">
                        <PublicationsSlider />
                    </div>

                    {/* Right Side - About Us Text */}
                    <div className={`bg-teal-600 xxl:h-[550px] md:h-[550px] lg:w-[25rem] xxl:w-[40rem] xl:w-[35rem] md:w-[25rem] sm:w-full ssm:w-full pb-6 px-5 py-5 text-white xxl:text-base lg:text-sm md:text-sm lg:leading-relaxed ${isArabic ? 'text-right sm:leading-loose md:leading-loose  lg:leading-loose' : ''} flex-col`}>
                        <h2 className={`lg:text-xl sm:text-2xl ssm:text-xl font-arabic mb-1 ${isArabic ? 'text-right' : ''}`}>
                            {t('about.title')}
                        </h2>
                        <div dir={isArabic ? "rtl" : "ltr"}>
                            <li className={`p-1`}>{t('about.welcomeMessage')} </li>
                            <li className={`p-1 `}>{t('about.welcomeMessage2')}</li>
                            <li className={`p-1 `}>{t('about.welcomeMessage3')}</li>
                        </div>
                        <div className="py-6 px-0 xxl:px-10">
                            <Link
                                to="/about"
                                className={`border-2 text-white border-white rounded-full hover:bg-sky-950 hover:text-white hover:border-none  py-3 px-8 ${isArabic ? 'text-right' : ''} uppercase`}
                            >
                                {t('Read More')}
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Section 2: Topics Slider */}
            <section className="lg:mt-16 w-full lg:p-4 md:p-4 sm:p-2 ssm:p-2 max-w-full overflow-x-hidden">
                <TopicsSlider2 />
            </section>

            {/* Section 3: Publications Area */}
            <section className="lg:mt-16 w-full lg:p-4 md:p-4 sm:p-2 ssm:p-2 max-w-full overflow-x-hidden">
                <PublicationsArea />
            </section>

            {/* Section 4: Projects List */}
            <section className="lg:mt-16 w-full lg:p-4 md:p-4 sm:p-2 ssm:p-2 max-w-full overflow-x-hidden">
                <ProjectsList />
            </section>

            {/* Section 5: Upcoming Events */}
            <section className="lg:mt-16 w-full lg:p-4 md:p-4 sm:p-2 ssm:p-2 max-w-full overflow-x-hidden">
                <UpcomingEvent />
            </section>

            {/* Back To Top Button */}
            <div className="lg:mt-16">
                <BackToTop />
            </div>
        </>
    );
};

export default HomePage;
