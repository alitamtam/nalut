// ErrorPage.js
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Header = () => (
    <header className="bg-sky-950 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
            <Link to="/" className="text-2xl font-bold">EduLibya</Link>
            <nav className="space-x-4">
                <Link to="/" className="hover:text-blue-200">Home</Link>
            </nav>
        </div>
    </header>
);

const Footer = () => (
    <footer className="bg-gray-800 text-white p-4 mt-6">
        <div className="container mx-auto text-center">
            <p>&copy; 2024 EduLibya. All rights reserved.</p>
        </div>
    </footer>
);

const ErrorPage = ({ error }) => {
    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow flex items-center justify-center bg-slate-100">
                <div className="bg-white shadow-lg rounded-lg p-8 max-w-md text-center">
                    <h1 className="text-3xl font-bold text-red-600 mb-4">Oops! Something went wrong</h1>
                    <p className="text-gray-700 mb-4">
                        {error?.statusText || error?.message || "An unexpected error has occurred."}
                    </p>
                    <Link to="/" className="text-blue-600 hover:underline">Go back to Home</Link>
                </div>
            </main>
            <Footer />
        </div>
    );
};

ErrorPage.propTypes = {
    error: PropTypes.shape({
        statusText: PropTypes.string,
        message: PropTypes.string,
    }),
};

export default ErrorPage;
