import { Outlet } from 'react-router-dom';
import PropTypes from 'prop-types';
import Sidebar from './Sidebar';
import Header from './Header';
import Footer from '../../Footer/Footer';

export const AdminDashboard = () => {
    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <div className="flex flex-1">
                <Sidebar />
                <main className="flex-1 p-4">
                    <Outlet /> {/* Render child routes */}
                </main>
            </div>
            <Footer />
        </div>
    );
};

AdminDashboard.propTypes = {
    children: PropTypes.node,
};

export default AdminDashboard;
