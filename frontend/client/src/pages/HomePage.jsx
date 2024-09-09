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
                        <Link to="/about" className="bg-teal-500 rounded-e-3xl border-2 border-white text-white py-2 px-6 hover:bg-blue-700 transition-colors">
                            Read More
                        </Link>
                    </div>
                </div>
            </div>

            {/* Topics Section */}
            <div className="mt-8 items-center w-full">
                <h2 className="text-3xl font-bold mb-4 text-center uppercase">Topics</h2>
                <TopicsSlider />
            </div>
        </>
    );
}

export default HomePage;
