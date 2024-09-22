import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';
import { useSettingsStore } from '../../store/useSettingsStore';

const ProtectedRoute = ({ children, roles }) => {
    const { user } = useSettingsStore();
    const role = user?.role; // Optional chaining to safely access role

    console.log('User state:', role); // Check the user's role

    // Check if user role is defined and if it includes the required roles
    if (!role || !roles.includes(role)) {
        console.log('Redirecting to login or not authorized');
        return <Navigate to="/login" replace />; // Use replace to prevent going back to the protected route
    }

    return children; // Render the children if authorized
};

// Define PropTypes for your component
ProtectedRoute.propTypes = {
    children: PropTypes.node.isRequired, // children can be any renderable React node
    roles: PropTypes.arrayOf(PropTypes.string).isRequired, // roles should be an array of strings
};

export default ProtectedRoute;
