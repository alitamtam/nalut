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
// import EditProfile from './components/Admin/EditProfile';
import MemberDetails from './components/About/MemberDetails';
import NotFound from './pages/NotFound';
import RegisterUser from './components/Admin/RegisterUser';
import TopicPublications from './components/publications/TopicPublications';
import PublicationDetails from './components/Publications/PublicationsDetails';
import Publications from './components/Publications/Publications';
import PublicationsCards from './components/Publications/PublicationsCards';
import ProfileDetails from './components/Profiles/ProfileDetails';
import ProfileDisplay from './components/About/ProfileDisplay';
const AppRouter = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            { index: true, element: <HomePage /> },
            { path: 'about', element: <AboutUsPage /> },
            // { path: 'profile/edit', element: <EditProfile /> },
            { path: 'member/:id', element: <MemberDetails /> },
            { path: 'profile/:id', element: <ProfileDetails /> },
            { path: 'profile/:id', element: <ProfileDetails /> },
            { path: 'profileDisplay/:id', element: <ProfileDisplay /> },

            { path: 'topics/:topicName', element: <TopicPublications /> },
            { path: 'publications', element: <Publications /> },
            { path: 'publicationsCard/:id', element: <PublicationsCards /> },
            { path: 'publications/:id', element: <PublicationDetails /> },
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
