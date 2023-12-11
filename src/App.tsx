import React from 'react';
import { BrowserRouter as Router, Route, Routes, RouteProps } from 'react-router-dom';

import './App.css';
import { LandingPage, ProductPage } from './Components';

function App() {
  return (
    <Router>
      <div className="title"><span className="title-text">SVLVMV</span></div>
      <Routes>
        <Route path="/:productId" Component={ProductPage} />
        <Route path="/" Component={LandingPage}>
          {/* Add your home page content */}
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
