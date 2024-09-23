import { createBrowserRouter } from 'react-router-dom';
import AdminDashboard from './components/Admin/Dashboard/AdminDashboard';
import ArticlesList from './components/Admin/Dashboard/ArticlesList';
import ManageEvents from './components/Admin/Dashboard/ManageEvents';
import ProfilesList from './components/Admin/Dashboard/ProfilesList';
import PublicationsList from './components/Admin/Dashboard/PublicationsList';
import ProtectedRoute from './components/Admin/ProtectedRoute';
import Login from './components/Admin/Login';
import HomePage from './pages/HomePage';
import Layout from './components/Layout';
import AboutUsPage from './components/About/AboutUsPage';
import MemberDetails from './components/About/MemberDetails';
import NotFound from './pages/NotFound';
import RegisterUser from './components/Admin/RegisterUser';
import EditProfile from './components/Admin/Dashboard/EditProfile';
import TopicPublications from './components/publications/TopicPublications';
import PublicationDetails from './components/Publications/PublicationsDetails';
import Publications from './components/Publications/Publications';
import PublicationsCards from './components/Publications/PublicationsCards';
import ProfileDetails from './components/Profiles/ProfileDetails';
import ProfileDisplay from './components/About/ProfileDisplay';
import DeleteUsers from './components/Admin/Dashboard/DeleteUser';
import ViewAllEvents from './components/Events/VIewAllEvents';
import EventDetails from './components/Events/EventDetails';
const AppRouter = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            { index: true, element: <HomePage /> },
            { path: 'about', element: <AboutUsPage /> },
            { path: 'member/:id', element: <MemberDetails /> },
            { path: 'profile/:id', element: <ProfileDetails /> },
            { path: 'profileDisplay/:id', element: <ProfileDisplay /> },
            { path: 'topics/:topicName', element: <TopicPublications /> },
            { path: 'publications', element: <Publications /> },
            { path: 'publicationsCard/:id', element: <PublicationsCards /> },
            { path: 'publications/:id', element: <PublicationDetails /> },
            { path: 'events/view-all', element: <ViewAllEvents /> },
            { path: 'events/:id', element: <EventDetails /> },
            { path: 'login', element: <Login /> },
            { path: '*', element: <NotFound /> },
        ],
    },
    {
        path: 'admin',
        element: (
            <ProtectedRoute roles={['admin']}>
                <AdminDashboard />
            </ProtectedRoute>
        ),
        children: [
            { path: 'profiles', element: <ProfilesList /> },
            { path: 'articles', element: <ArticlesList /> },
            { path: 'events', element: <ManageEvents /> },
            { path: 'publications', element: <PublicationsList /> },
            { path: 'register', element: <RegisterUser /> },
            { path: 'users', element: <DeleteUsers /> },
            { path: 'editProfile', element: <EditProfile /> },
            { path: '*', element: <NotFound /> },
        ],
    },
    {
        path: 'admin',
        element: (
            <ProtectedRoute roles={['member']}>
                <Layout /> {/* Layout for member-specific routes */}
            </ProtectedRoute>
        ),
        children: [
            { path: 'editProfile', element: <EditProfile /> },
            { path: 'createPublication', element: <PublicationsList /> }, // Adjust based on your component for creating publications
            { path: '*', element: <NotFound /> },
        ],
    },
    { path: '*', element: <NotFound /> },
]);

export default AppRouter;
