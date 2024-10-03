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
            <section className=" lg:mx-80  items-center justify-center lg:h-auto lg:w-auto" >
                <div className="flex flex-row md:flex-row ssm:flex-col ">
                    {/* Left Side - Publications Slider */}
                    <div className=" ">
                        <PublicationsSlider />
                    </div>

                    {/* Right Side - About Us Text */}
                    <div className={` flex  justify-center flex-col bg-teal-600  pb-6 font-arabic mb-12 px-5 text-white break-before-auto text-pretty  ${isArabic ? ' lg:text-lg ssm:text-lg ssm:font-normal text-right font-medium' : ''}  text-lg pt-0`}>
                        <h2 className={`lg:text-3xl ssm:text-2xl lg:font-arabic ssm:font-arabic md:font-arabic px-6 font-bold mb-2 ${isArabic ? ' lg:text-3x1  ssm:text-4xl ssm:font-arabic text-right' : ''} text-white ssm:pt-4 font-arabic ssm:text-sky-950 ssm:text-4xl`}>{t('about.title')}</h2>
                        <p className='py-2'>{t('about.welcomeMessage')}</p>
                        <p className='py-2'>{t('about.welcomeMessage2')}</p>
                        <p className='py-2'>{t('about.welcomeMessage3')}</p>
                        <div className='py-6 px-10'>

                            <Link to="/about" className={`border-2 ${isArabic ? '  lg:text-lg  ssm:text-base  lg:font-extralight' : ''} text-white border-white rounded-full hover:bg-sky-950 hover:text-white py-3 px-8 font-sans hover:border-none uppercase`}>
                                {t('Read More')}
                            </Link></div>
                    </div>
                </div>
            </section>

            {/* Topics Section */}
            <section className="lg:mt-16 w-full  lg:mx-auto lg:p-4 max-w-full overflow-x-hidden">



                <TopicsSlider2 />
            </section>
            <section className="lg:mt-16 w-full  mx-auto p-4 max-w-full overflow-x-hidden">
                <PublicationsArea />
            </section>
            <section>
                <ProjectsList />
            </section>
            <section >
                <UpcomingEvent />

            </section>
            <div>
                <BackToTop />
            </div>
        </>
    );
}

export default HomePage;
