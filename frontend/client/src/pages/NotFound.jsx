import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <div className="relative flex flex-col items-center justify-center min-h-screen bg-white p-6">
            <div className="absolute inset-0 flex items-center justify-center z-0">

            </div>

            <div className="relative z-10 text-center mt-16">
                <h1 className="text-5xl font-extrabold text-blue-600 mb-4">404</h1>
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                    Oops! Page Not Found
                </h2>
                <p className="text-lg text-gray-600 mb-6">
                    It seems like the page you&apos;re looking for doesn&apos;t exist or has been moved.
                </p>
            </div>
            <Link
                to="/"
                className="absolute top-10 bg-teal-500 text-white py-2 px-6 rounded-md hover:bg-teal-600 transition duration-300 z-10"
            >
                Go Back to Home
            </Link>
        </div>
    );
};

export default NotFound;
