import Footer from './components/Footer/Footer';
import AppRouter from './Routes';
import './index.css';
import BackToTop from './components/BackToTop';
// import { Toaster } from 'react-hot-toast';
import 'react-toastify/dist/ReactToastify.css';  // Import toastify CSS

function App() {
  return (
    <div className="App lg:w-full xxl:w-full xl:w-full items-center justify-center">
      <AppRouter />
      <BackToTop />
      <Footer />


    </div>
  );
}

export default App;
