// import TopicsSlider from '../components/TopicsSlider';
import PublicationsSlider from '../components/PublicationsSlider';
import { Link } from 'react-router-dom';
import TopicsSlider2 from '../components/TopicSlick';
import UpcomingEvent from '../components/Events/UpcomingEvent'
import PublicationsArea from '../components/Publications/PublicationsArea';
import BackToTop from '../components/BackToTop';
const HomePage = () => {
    return (
        <>
            <div className=" lg:mx-80  items-center justify-center " >
                <div className="flex flex-col md:flex-row  ">
                    {/* Left Side - Publications Slider */}
                    <div className=" ">
                        <PublicationsSlider />
                    </div>

                    {/* Right Side - About Us Text */}
                    <div className=" flex flex-col justify-center bg-teal-600 px-6 pb-6 ">
                        <h2 className="lg:text-3xl ssm:text-2xl font-bold mb-4 text-white ssm:pt-4 ssm:font-body">About us</h2>
                        <p className="mb-12 px-2 text-white font-serif text-lg pt-0">
                            Welcome to EduLibya, where education and innovation meet. We aim to provide students, teachers, and educators with the best tools and resources for learning and growth. Our mission is to foster an environment of creativity, engagement, and critical thinking.
                        </p>
                        <div>
                            <Link to="/about" className="border-2  text-white border-white rounded-full hover:bg-sky-950 hover:text-white py-4 px-8 font-sans hover:border-none">
                                Read More
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

            <div className="lg:mt-0 w-full  mx-auto  max-w-full overflow-x-hidden">
                <UpcomingEvent />
                <BackToTop />

            </div>
        </>
    );
}

export default HomePage;
