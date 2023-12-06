import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home'
import About from './pages/About';
import Browse from './pages/Browse';
import Songify from './components/Songify';
import Footer from './components/Footer';

function App() {
  
  return (
    <Router>
      <Header />
      <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/browse-songs" element={<Browse />} />
          <Route exact path="/about" element={<About />} />
          <Route exact path="/songify" Component={Songify} />
      </Routes>
      <Footer />
    </Router>
    
  );
}

export default App;
