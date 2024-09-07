// src/App.jsx

import React from 'react';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import AppRouter from './router';
import BackToTop from './components/BackToTop';
import './index.css';

function App() {
  return (
    <div className="App">
      <Header />
      <AppRouter />
      <BackToTop />
      <Footer />
    </div>
  );
}

export default App;
