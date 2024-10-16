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
            {/* Section 1: Publications and About Us */}
            <section className="lg:mx-20 xxl:mx-80 xl:mx-20 md:mx-0  items-center justify-center">
                <div className="flex flex-col lg:flex-row md:flex-row ssm:flex-col justify-center ">
                    {/* Left Side - Publications Slider */}
                    <div className="lg:w-2/3 md:w-full xxl:w-full  xl:w-full sm:w-full ssm:w-full">
                        <PublicationsSlider />
                    </div>

                    {/* Right Side - About Us Text */}
                    <div className={`bg-teal-600 xxl:h-[550px] md:h-[550px] lg:w-[25rem] xxl:w-[40rem] xl:w-[35rem] md:w-[40rem] sm:w-full ssm:w-full pb-6 px-5 py-10 text-white xxl:text-lg lg:text-base md:text-base lg:leading-relaxed ${isArabic ? 'text-right sm:leading-loose md:leading-loose  lg:leading-loose' : ''} flex-col`}>
                        <h2 className={`lg:text-xl sm:text-2xl ssm:text-xl font-bold mb-1 ${isArabic ? 'text-right' : ''}`}>
                            {t('about.title')}
                        </h2>
                        <p className="py-1">{t('about.welcomeMessage')}</p>
                        <p className="py-1">{t('about.welcomeMessage2')}</p>
                        <p className="py-1">{t('about.welcomeMessage3')}</p>
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
