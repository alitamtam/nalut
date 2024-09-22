// // path: client/src/components/routing/AdminRoute.jsx
// import { Navigate } from "react-router-dom";
// import { useAuth } from "../../hooks/useAuth"; // Assuming you have an authentication hook
// import PropTypes from 'prop-types';

// const AdminRoute = ({ children }) => {
//     const { user } = useAuth(); // Get the current user from your auth hook/context

//     if (!user || user.role !== "admin") {
//         // If user is not logged in or not an admin, redirect to login or another page
//         return <Navigate to="/login" />;
//     }

//     // If user is an admin, render the children (protected page)
//     return children;
// };

// AdminRoute.propTypes = {
//     children: PropTypes.node.isRequired,
// };

// export default AdminRoute;
