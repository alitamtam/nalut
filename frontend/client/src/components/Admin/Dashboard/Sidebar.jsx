// src/components/Admin/Dashboard/Sidebar.jsx
import { Link } from 'react-router-dom';

const Sidebar = () => {
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
            </ul>
        </nav>
    );
};

export default Sidebar;
