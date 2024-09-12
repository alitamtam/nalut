// src/components/Admin/Dashboard/AdminDashboard.jsx
import PropTypes from 'prop-types';
import Sidebar from './Sidebar'; // Import Sidebar component

const AdminDashboard = ({ children }) => {
    return (
        <div className="flex">
            <Sidebar /> {/* Render the Sidebar component */}
            <main className="flex-1 p-4">
                {children} {/* Render children components */}
            </main>
        </div>
    );
};

AdminDashboard.propTypes = {
    children: PropTypes.node,
};

export default AdminDashboard;
