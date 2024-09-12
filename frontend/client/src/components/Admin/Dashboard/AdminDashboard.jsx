import PropTypes from 'prop-types';
import Sidebar from './Sidebar';

const AdminDashboard = ({ children }) => {
    return (
        <div className="flex">
            <Sidebar />
            <div className="flex-grow p-8">
                {children}
            </div>
        </div>
    );
};

AdminDashboard.propTypes = {
    children: PropTypes.node.isRequired,
};

export default AdminDashboard;
