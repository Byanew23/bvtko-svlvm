import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import './App.css';
import { LandingPage, ProductPage, AdminPage, Header, Footer } from './Components';



function App() {

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/:productId" Component={ProductPage} />
        <Route path="/admin" Component={AdminPage} />
        <Route path="/" Component={LandingPage} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
