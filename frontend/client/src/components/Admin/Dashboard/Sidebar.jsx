import { Link, useNavigate } from 'react-router-dom';
import { FaUser, FaProjectDiagram, FaCalendarAlt, FaBook, FaUsers, FaUserPlus, FaEdit, FaUserCog, FaSignOutAlt } from 'react-icons/fa'; // Import icons

const Sidebar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        navigate('/login'); // Navigate to the login page
    };

    return (
        <nav className="w-64 bg-gray-800 text-white h-screen p-4">
            <title>Sidebar</title>

            <ul className="text-center capitalize font-arabic space-y-2">
                <li className="flex items-center">
                    <FaUser className="mr-2" /> {/* Icon for Profiles */}
                    <Link to="/admin/profiles" className="block py-2 px-4 hover:bg-gray-50 hover:text-gray-700">
                        Profiles
                    </Link>
                </li>
                <li className="flex items-center">
                    <FaProjectDiagram className="mr-2" /> {/* Icon for Projects */}
                    <Link to="/admin/projects" className="block py-2 px-4 hover:bg-gray-50 hover:text-gray-700">
                        Projects
                    </Link>
                </li>
                <li className="flex items-center">
                    <FaCalendarAlt className="mr-2" /> {/* Icon for Events */}
                    <Link to="/admin/events" className="block py-2 px-4 hover:bg-gray-50 hover:text-gray-700">
                        Events
                    </Link>
                </li>
                <li className="flex items-center">
                    <FaBook className="mr-2" /> {/* Icon for Publications */}
                    <Link to="/admin/publications" className="block py-2 px-4 hover:bg-gray-50 hover:text-gray-700">
                        Publications
                    </Link>
                </li>
                <li className="flex items-center">
                    <FaUsers className="mr-2" /> {/* Icon for Manage Members */}
                    <Link to="/admin/users" className="block py-2 px-4 hover:bg-gray-50 hover:text-gray-700">
                        Manage Members
                    </Link>
                </li>
                <li className="flex items-center">
                    <FaUserPlus className="mr-2" /> {/* Icon for Register Member */}
                    <Link to="/admin/register" className="block py-2 px-4 hover:bg-gray-50 hover:text-gray-700">
                        Register Member
                    </Link>
                </li>
                <li className="flex items-center">
                    <FaEdit className="mr-2" /> {/* Icon for Edit Profile */}
                    <Link to="/admin/editProfile" className="block py-2 px-4 hover:bg-gray-50 hover:text-gray-700">
                        Edit My Profile
                    </Link>
                </li>
                <li className="flex items-center">
                    <FaUserCog className="mr-2" /> {/* Icon for Update Account */}
                    <Link to="/admin/update-account" className="block py-2 px-4 hover:bg-gray-50 hover:text-gray-700">
                        Update Account
                    </Link>
                </li>

                {/* Logout button with icon */}
                <li className="mt-4">
                    <button
                        onClick={handleLogout}
                        className="block w-full py-2 px-4 bg-red-500 rounded-sm text-center hover:bg-gray-700 flex items-center justify-center"
                    >
                        <FaSignOutAlt className="mr-2" /> {/* Icon for Logout */}
                        Logout
                    </button>
                </li>
            </ul>
        </nav>
    );
};

export default Sidebar;
