// path: client/src/components/layout/Layout.jsx
import Header from './Header/Header';
import Footer from './Footer/Footer';
import { Outlet } from 'react-router-dom';
import Nav from './Navbar/Navbar';
const Layout = () => {
    return (
        <>
            <Header />
            <Nav />
            <main>
                <Outlet /> {/* This is where nested routes will be rendered */}
            </main>

            <Footer />
        </>
    );
};

export default Layout;
