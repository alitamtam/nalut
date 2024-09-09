import Footer from './components/Footer/Footer';
import AppRouter from './router';

import './index.css';

function App() {
  return (

    <div className='App md:w-1/2'>
      <AppRouter /> {/* Routes handle everything including the homepage */}
      <Footer />

    </div>

  );
}

export default App;
