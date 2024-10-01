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
            <div className=" lg:mx-80  items-center justify-center " >
                <div className="flex flex-row md:flex-row ssm:flex-col ">
                    {/* Left Side - Publications Slider */}
                    <div className=" ">
                        <PublicationsSlider />
                    </div>

                    {/* Right Side - About Us Text */}
                    <div className=" flex flex-col justify-center bg-teal-600 px-12 pb-6 ">
                        <h2 className={`lg:text-3xl ssm:text-2xl lg:font-arabic ssm:font-arabic md:font-arabic  font-bold mb-4 ${isArabic ? ' lg:text-3x1  ssm:text-4xl ssm:font-bold text-right' : ''} text-white ssm:pt-4 ssm:font-body`}>{t('about.title')}</h2>
                        <p className={`mb-12 px-2 text-white break-normal lg:font-arabic ssm:font-arabic md:font-arabic ${isArabic ? ' lg:text-lg lg:font-arabic ssm:font-arabic md:font-arabic ssm:text-lg ssm:font-normal text-right font-medium' : ''} font-serif text-lg pt-0`}>{t('about.welcomeMessage')}</p>
                        <div>
                            <Link to="/about" className={`border-2 ${isArabic ? ' lg:text-lg lg:font-arabic ssm:font-arabic md:font-arabic ssm:text-base ssm:font-bold lg:font-extralight' : ''} text-white border-white rounded-full hover:bg-sky-950 hover:text-white py-2 px-8 font-sans hover:border-none`}>
                                {t('Read More')}
                            </Link></div>
                    </div>
                </div>
            </div>

            {/* Topics Section */}
            <div className="lg:mt-16 w-full  lg:mx-auto lg:p-4 max-w-full overflow-x-hidden">



                <TopicsSlider2 />
            </div>
            <div className="lg:mt-16 w-full  mx-auto p-4 max-w-full overflow-x-hidden">
                <PublicationsArea />
            </div>
            <div>
                <ProjectsList />
            </div>
            <div className="lg:mt-0 w-full  mx-auto  max-w-full overflow-x-hidden">
                <UpcomingEvent />
                <BackToTop />

            </div>
        </>
    );
}

export default HomePage;
