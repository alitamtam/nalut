import TopicsSlider from '../components/TopicsSlider';
import PublicationsSlider from '../components/PublicationsSlider';
import { Link } from 'react-router-dom';

const HomePage = () => {
    return (
        <>
            <div className=" lg:w-2/3 lg:mx-60 items-center justify-center">
                <div className="flex flex-col md:flex-row ">
                    {/* Left Side - Publications Slider */}
                    <div className="w-full ">
                        <PublicationsSlider />
                    </div>

                    {/* Right Side - About Us Text */}
                    <div className=" flex flex-col justify-center bg-teal-500 px-6 py-6">
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
            <div className="mt-8 w-full">
                <div className="flex flex-col items-center lg:flex-row lg:justify-between lg:mx-80">
                    <h2 className="text-3xl font-bold mb-4 text-center uppercase font-sans text-gray-800">
                        Our Topics Areas
                    </h2>
                    <button className="border-2 text-teal-500 border-teal-500 rounded-full hover:bg-teal-500 hover:text-white py-2 px-8 font-sans mb-4 lg:mb-0">
                        View All
                    </button>
                </div>

                <TopicsSlider />
            </div>

        </>
    );
}

export default HomePage;
