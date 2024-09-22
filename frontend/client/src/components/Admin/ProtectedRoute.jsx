import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';
import { useSettingsStore } from '../../store/useSettingsStore';

const ProtectedRoute = ({ children, roles }) => {
    const { user } = useSettingsStore();
    const role = user?.role; // Directly access the role as a string

    console.log('User state:', user); // Check the entire user object
    console.log('User role:', role); // Now this should correctly log the user's role
    console.log('Expected roles:', roles);

    // Check if user role is defined and if it includes the required roles
    if (!user || !role || !roles.includes(role)) {
        console.log('Redirecting to login or not authorized');
        return <Navigate to="/login" replace />; // Use replace to prevent going back to the protected route
    }

    return children; // Render the children if authorized
};

// Define PropTypes for your component
ProtectedRoute.propTypes = {
    children: PropTypes.node.isRequired,
    roles: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default ProtectedRoute;
