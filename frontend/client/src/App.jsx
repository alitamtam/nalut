// path client/src/App.jsx
import Footer from './components/Footer/Footer';
import AppRouter from './Routes';
import './index.css';
import BackToTop from './components/BackToTop';

function App() {
  return (
    <div className="App lg:w-full xxl:w-full xl:w-full items-center justify-center"> {/* Full width wrapper */}
      <AppRouter /> {/* Routes handle everything including the homepage */}
      <BackToTop />
      <Footer />
    </div>
  );
}

export default App;
