import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import YourBlogs from './Pages/YourBlogs';
import AddBlog from './Pages/AddBlog';
import GoogleSignIn from '../src/components/GoogleSignIn/GoogleSignIn';

import Footer from '../src/components/Footer/Footer';
import Header from '../src/components/Header/Header';


const App = () => {
  return (
    <Router>
      <Header />
      <div className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/addBlog" element={<AddBlog />} />
          <Route path="/yourBlogs" element={<YourBlogs />} />
          <Route path="/googlesignin" element={<GoogleSignIn />} />

        </Routes>
      </div>
      <Footer />
    </Router>
  );
};

export default App;
