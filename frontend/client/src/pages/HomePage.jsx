import PublicationsSlider from '../components/PublicationsSlider';
import { Link } from 'react-router-dom';

const HomePage = () => {
    return (
        <div className="container mx-auto flex flex-wrap">
            {/* Left Side - Publications Slider */}
            <PublicationsSlider />

            {/* Right Side - About Us Text */}
            <div className="w-full md:w-1/2 p-4 flex flex-col justify-center">
                <h2 className="text-3xl font-bold mb-4">About Us</h2>
                <p className="mb-6">
                    Welcome to EduLibya, where education and innovation meet. We aim to provide students, teachers, and educators with the best tools and resources for learning and growth. Our mission is to foster an environment of creativity, engagement, and critical thinking.
                </p>
                <Link to="/about" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors">
                    Read More
                </Link>
            </div>
        </div>
    );
};

export default HomePage;
