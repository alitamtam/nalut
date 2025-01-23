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
            <title>Nalut Together - Connecting Communities</title>
            <meta name="description" content="Nalut Together is a platform that connects citizens, organizations, and the municipality of Nalut to collaborate and build a better future for the city." />
            <meta name="keywords" content="Nalut, Libya, community, collaboration, culture, future, Nalut Together" />

            {/* Open Graph Meta Tags */}
            <meta property="og:title" content="Nalut Together - Connecting Communities in Nalut" />
            <meta property="og:description" content="Nalut Together is a community-driven platform for fostering collaboration, cultural heritage, and initiatives to improve Nalut." />
            <meta property="og:image" content="/path-to-og-image.jpg" />
            <meta property="og:type" content="website" />
            <meta property="og:url" content="https://www.nalut.ly" />

            {/* Twitter Card Meta Tags */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content="Nalut Together - Connecting Communities" />
            <meta name="twitter:description" content="Join Nalut Together to collaborate and build a brighter future for the city of Nalut." />
            <meta name="twitter:image" content="/path-to-twitter-image.jpg" />

            {/* Section 1: Publications and About Us */}
            <section className="lg:mx-20 xxl:mx-80 xl:mx-20 md:mx-0  items-center justify-center">
                <div className="flex flex-col lg:flex-row md:flex-row ssm:flex-col justify-center ">
                    {/* Left Side - Publications Slider */}
                    <div className="lg:w-2/3 md:w-full xxl:w-full  xl:w-full sm:w-full ssm:w-full">
                        <PublicationsSlider />
                    </div>

                    {/* Right Side - About Us Text */}
                    <div className={`bg-gray-800 xxl:h-[550px] md:h-[550px] lg:w-[25rem] xxl:w-[40rem] xl:w-[35rem] md:w-[30rem] sm:w-full ssm:w-full pb-6 px-5 py-5 text-white xxl:text-sm lg:text-sm md:text-sm lg:leading-relaxed ${isArabic ? 'text-right sm:leading-loose md:leading-relaxed  lg:leading-loose' : ''} flex-col`}>
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
                                className={`border-2 text-white border-primary rounded-full hover:bg-primary hover:text-gray-800 hover:border-none  py-3 px-8 ${isArabic ? 'text-right' : ''} uppercase`}
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
