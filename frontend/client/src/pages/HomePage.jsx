// import TopicsSlider from '../components/TopicsSlider';
import PublicationsSlider from '../components/PublicationsSlider';
import { Link } from 'react-router-dom';
import TopicsSlider2 from '../components/TopicSlick';
import FutureEvents from '../components/Events/FutureEvents';
const HomePage = () => {
    return (
        <>
            <div className=" lg:mx-80  items-center justify-center" >
                <div className="flex flex-col md:flex-row  ">
                    {/* Left Side - Publications Slider */}
                    <div className="w-full ">
                        <PublicationsSlider />
                    </div>

                    {/* Right Side - About Us Text */}
                    <div className=" flex flex-col justify-center bg-teal-600 px-6 py-6">
                        <h2 className="text-3xl font-bold mb-4 text-white">About Us</h2>
                        <p className="mb-6 px-2 text-white">
                            Welcome to EduLibya, where education and innovation meet. We aim to provide students, teachers, and educators with the best tools and resources for learning and growth. Our mission is to foster an environment of creativity, engagement, and critical thinking.
                        </p>
                        <div>
                            <Link to="/about" className="border-2 text-white border-white rounded-full hover:bg-blue-950 hover:text-white py-2 px-8 font-sans hover:border-none">
                                Read More
                            </Link></div>
                    </div>
                </div>
            </div>

            {/* Topics Section */}
            <div className="mt-16 w-full">



                <TopicsSlider2 />
            </div>
            <div>


                <FutureEvents />
            </div>
        </>
    );
}

export default HomePage;
