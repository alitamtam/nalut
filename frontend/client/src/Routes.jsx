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
import SearchResultPage from './pages/SearchResultPage';
import ProjectDetails from './components/projects/ProjectDetails';
import ProjectsArea from './components/projects/ProjectsArea';
import ProjectForm from './components/Admin/Dashboard/ProjectForm';
import ErrorPage from './pages/ErrorPage';


const AppRouter = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        errorElement: <ErrorPage />,  // Set errorElement for the main layout

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
            { path: 'projects', element: <ProjectsArea /> },  // <-- New route for Projects
            { path: 'projects/:id', element: <ProjectDetails /> },  // <-- New route for Projects

            { path: "/search-results", element: <SearchResultPage /> },
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
            { path: 'projects', element: <ProjectForm /> },  // Admin-specific route for Projects if needed
            { path: 'register', element: <RegisterUser /> },
            { path: 'users', element: <DeleteUsers /> },
            { path: 'editProfile', element: <EditProfile /> },
            { path: '*', element: <NotFound /> },
        ],
    },
    { path: '*', element: <NotFound /> },
]);

export default AppRouter;

