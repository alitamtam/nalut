// client/src/router.jsx
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from "./pages/HomePage";
import AboutUsPage from './components/About/AboutUsPage';
import NotFound from './pages/NotFound';
import EditProfile from './components/Admin/EditProfile'; // Import the EditProfile component
import MemberDetails from './components/About/MemberDetails'; // Import the MemberDetails component

const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            { index: true, element: <HomePage /> },
            { path: 'about', element: <AboutUsPage /> },
            { path: 'profile/edit', element: <EditProfile /> }, // Add route for editing profile
            { path: 'member/:id', element: <MemberDetails /> }, // Add route for member details
            { path: '*', element: <NotFound /> },
        ],
    },
]);

const AppRouter = () => {
    return (
        <RouterProvider router={router} />
    );
};

export default AppRouter;
