import { Link } from 'react-router-dom';

const Sidebar = () => {
    return (
        <div className="bg-gray-200 w-64 h-full p-6">
            <ul>
                <li className="mb-4">
                    <Link to="/admin/profiles">Manage Profiles</Link>
                </li>
                <li className="mb-4">
                    <Link to="/admin/articles">Manage Articles</Link>
                </li>
                <li className="mb-4">
                    <Link to="/admin/events">Manage Events</Link>
                </li>
                <li className="mb-4">
                    <Link to="/admin/publications">Manage Publications</Link>
                </li>
            </ul>
        </div>
    );
};

export default Sidebar;
