import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './Header';
import Home from './Home'
import About from './About';
import Browse from './Browse';
import Songify from './Songify';
import Footer from './Footer';

function App() {
  
  return (
    <Router>
      <Header />
      <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/Browse" element={<Browse />} />
          <Route exact path="/about" element={<About />} />
          <Route exact path="/songify" Component={Songify} />
      </Routes>
      <Footer />
    </Router>
    
  );
}

export default App;
