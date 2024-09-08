import Footer from './components/Footer/Footer';
import AppRouter from './router';

import './index.css';

function App() {
  return (

    <div className='App'>
      <AppRouter /> {/* Routes handle everything including the homepage */}
      <Footer />

    </div>

  );
}

export default App;
