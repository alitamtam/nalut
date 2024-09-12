import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ children, roles }) => {
    const { role } = useSelector((state) => state.auth.user); // Assuming you store user role in auth state

    if (!role || !roles.includes(role)) {
        return <Navigate to="/login" />;
    }

    return children;
};

// Define PropTypes for your component
ProtectedRoute.propTypes = {
    children: PropTypes.node.isRequired, // children can be any renderable React node
    roles: PropTypes.arrayOf(PropTypes.string).isRequired, // roles should be an array of strings
};

export default ProtectedRoute;
