// path client/src/App.jsx
import Footer from './components/Footer/Footer';
import AppRouter from './Routes';

import './index.css';

function App() {
  return (
    <div className="App lg:w-full items-center justify-center"> {/* Full width wrapper */}
      <AppRouter /> {/* Routes handle everything including the homepage */}
      <Footer />
    </div>
  );
}

export default App;
