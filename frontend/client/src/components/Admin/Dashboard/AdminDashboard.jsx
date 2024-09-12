import PropTypes from 'prop-types';
import Sidebar from './Sidebar';
import Header from './Header'; // Import Header
import Footer from '../../Footer/Footer'; // Import Footer

const AdminDashboard = ({ children }) => {
    return (
        <div className="flex flex-col min-h-screen">
            <Header /> {/* Add Header component */}
            <div className="flex flex-1">
                <Sidebar /> {/* Render the Sidebar component */}
                <main className="flex-1 p-4">
                    {children} {/* Render children components */}
                </main>
            </div>
            <Footer /> {/* Add Footer component */}
        </div>
    );
};

AdminDashboard.propTypes = {
    children: PropTypes.node,
};

export default AdminDashboard;
