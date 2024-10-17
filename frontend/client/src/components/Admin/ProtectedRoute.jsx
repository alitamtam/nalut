import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom'; // Re-import Navigate
import { useSettingsStore } from '../../store/useSettingsStore';

const ProtectedRoute = ({ children, roles }) => {
    const { user } = useSettingsStore();  // Access user from the store
    const role = user?.role || '';  // Default to empty string if undefined



    // Check if the user is logged in and if their role is authorized
    if (!user || !role || !roles.includes(role)) {
        console.log('User not authorized. Redirecting...');
        return <Navigate to="/login" replace />; // Redirect if not authorized
    }

    // If authorized, render the children components
    return children;
};

// Define PropTypes for your component
ProtectedRoute.propTypes = {
    children: PropTypes.node.isRequired,
    roles: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default ProtectedRoute;
