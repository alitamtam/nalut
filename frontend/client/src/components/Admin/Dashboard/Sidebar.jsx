import { Link, useNavigate } from 'react-router-dom';

const Sidebar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        navigate('/login'); // Navigate to the login page
    };

    return (
        <nav className="w-64 bg-gray-800 text-white h-screen p-4">
            <p>Sidebar Loaded</p> {/* This will help you confirm if the Sidebar is being rendered */}

            <ul>
                <li>
                    <Link to="/admin/profiles" className="block py-2 px-4 hover:bg-gray-700">Profiles</Link>
                </li>
                <li>
                    <Link to="/admin/projects" className="block py-2 px-4 hover:bg-gray-700">Projects</Link>
                </li>
                <li>
                    <Link to="/admin/events" className="block py-2 px-4 hover:bg-gray-700">Events</Link>
                </li>
                <li>
                    <Link to="/admin/publications" className="block py-2 px-4 hover:bg-gray-700">Publications</Link>
                </li>
                <li>
                    <Link to="/admin/users" className="block py-2 px-4 hover:bg-gray-700">Users</Link>
                </li>
                <li>
                    <Link to="/admin/register" className="block py-2 px-4 hover:bg-gray-700">Register Member</Link>
                </li>
                <li>
                    <Link to="/admin/editProfile" className="block py-2 px-4 hover:bg-gray-700">Edit Profile</Link>
                    <li />


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
