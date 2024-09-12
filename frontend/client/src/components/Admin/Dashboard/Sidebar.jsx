import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../../../store/authSlice'; // Import the logout action from your auth slice

const Sidebar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logout()); // Dispatch the logout action to clear user data and token
        navigate('/login'); // Navigate to the login page
    };

    return (
        <nav className="w-64 bg-gray-800 text-white h-screen p-4">
            <ul>
                <li>
                    <Link to="/admin/profiles" className="block py-2 px-4 hover:bg-gray-700">Profiles</Link>
                </li>
                <li>
                    <Link to="/admin/articles" className="block py-2 px-4 hover:bg-gray-700">Articles</Link>
                </li>
                <li>
                    <Link to="/admin/events" className="block py-2 px-4 hover:bg-gray-700">Events</Link>
                </li>
                <li>
                    <Link to="/admin/publications" className="block py-2 px-4 hover:bg-gray-700">Publications</Link>
                </li>
                <li>
                    {/* Logout link */}
                    <button
                        onClick={handleLogout}
                        className="block w-full text-left py-2 px-4 hover:bg-gray-700 mt-4"
                    >
                        Logout
                    </button>
                </li>
            </ul>
        </nav>
    );
};

export default Sidebar;
