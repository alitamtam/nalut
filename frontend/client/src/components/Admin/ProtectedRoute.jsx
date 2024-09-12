import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectUserRole } from '../../selectors/userSelectors'; // Adjust the path

const ProtectedRoute = ({ children, roles }) => {
    const role = useSelector(selectUserRole);
    console.log('User state:', role); // Add this line to check state

    if (!role || !roles.includes(role)) {
        console.log('Redirecting to login');
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
