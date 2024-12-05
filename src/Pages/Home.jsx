import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { db } from '../firebase';
import './css/Home.css'; 

const Home = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  
  const fetchBlogs = async () => {
    try {
      const blogsCollection = collection(db, 'blogs');
      const blogSnapshot = await getDocs(blogsCollection);
      const blogList = blogSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setBlogs(blogList);
    } catch (error) {
      console.error('Error fetching blogs:', error);
    }
  };


  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      alert('Logged out successfully!');
      navigate('/googlesignin');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

 
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return unsubscribe;
  }, []);

  
  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <div className="home-container">
      <div className="home-header">
        <h1 className="home-title">All Blogs</h1>

        {user && (
          <button
            onClick={handleLogout}
            className="btn btn-logout"
          >
            Log Out
          </button>
        )}
      </div>

      <div className="home-actions">
        {user && (
          <>
            <button
              onClick={() => navigate('/addBlog')}
              className="btn btn-add-blog"
            >
              Add New Blog
            </button>
            <button
              onClick={() => navigate('/yourBlogs')}
              className="btn btn-your-blogs"
            >
              Your Blogs
            </button>
          </>
        )}
      </div>

    
      <div className="blog-grid">
        {blogs.map((blog) => (
          <div key={blog.id} className="blog-card">
            <h2 className="blog-card-title">{blog.title}</h2>
            <p className="blog-card-author">By {blog.author}</p>
            <p className="blog-card-content">{blog.content}</p>
          </div>
        ))}
      </div>

      
      {blogs.length === 0 && (
        <p className="no-blogs-message">No blogs found. Add a new blog!</p>
      )}
    </div>
  );
};

export default Home;