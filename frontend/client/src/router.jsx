import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from "./pages/HomePage";
import AboutUsPage from './pages/About';
import NotFound from './pages/NotFound';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            { index: true, element: <HomePage /> },
            { path: 'about-us', element: <AboutUsPage /> },
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
