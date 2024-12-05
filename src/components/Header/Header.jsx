import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const navigate = useNavigate();

  return (
    <header className="header">
      <div className="container">
        <div className="brand-name" onClick={() => navigate('/')}>
          YourBlog
        </div>
        <nav className="nav-links">
          <button className="nav-button" onClick={() => navigate('/')}>Home</button>
          <button className="nav-button" onClick={() => navigate('/addBlog')}>Add Blog</button>
          <button className="nav-button" onClick={() => navigate('/yourBlogs')}>Your Blogs</button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
