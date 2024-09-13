import { createBrowserRouter } from 'react-router-dom';
import AdminDashboard from './components/Admin/Dashboard/AdminDashboard';
import ArticlesList from './components/Admin/Dashboard/ArticlesList';
import EventsList from './components/Admin/Dashboard/EventsList';
import ProfilesList from './components/Admin/Dashboard/ProfilesList';
import PublicationsList from './components/Admin/Dashboard/PublicationsList';
import ProtectedRoute from './components/Admin/ProtectedRoute';
import Login from './components/Admin/Login';
import HomePage from './pages/HomePage';
import Layout from './components/Layout';
import AboutUsPage from './components/About/AboutUsPage';
import EditProfile from './components/Admin/EditProfile';
import MemberDetails from './components/About/MemberDetails';
import NotFound from './pages/NotFound';
import RegisterUser from './components/Admin/RegisterUser';

const AppRouter = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            { index: true, element: <HomePage /> },
            { path: 'about', element: <AboutUsPage /> },
            { path: 'profile/edit', element: <EditProfile /> },
            { path: 'member/:id', element: <MemberDetails /> },
            { path: 'login', element: <Login /> },
            { path: '*', element: <NotFound /> },
        ],
    },
    {
        path: 'admin',
        element: (
            <ProtectedRoute roles={['admin', 'member']}>
                <AdminDashboard /> {/* AdminDashboard will render Sidebar and children */}
            </ProtectedRoute>
        ),
        children: [
            { path: 'profiles', element: <ProfilesList /> },
            { path: 'articles', element: <ArticlesList /> },
            { path: 'events', element: <EventsList /> },
            { path: 'publications', element: <PublicationsList /> },
            { path: 'register', element: <RegisterUser /> },
            { path: '*', element: <NotFound /> },

        ],
    },
    { path: '*', element: <NotFound /> },
]);

export default AppRouter;
