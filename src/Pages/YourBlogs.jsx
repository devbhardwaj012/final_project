import React, { useState, useEffect } from 'react';
import { collection, getDocs, deleteDoc, doc, query, where } from 'firebase/firestore';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { db } from '../firebase';
import './css/YourBlogs.css';

const YourBlogs = () => {
  const [userBlogs, setUserBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  
  const fetchUserBlogs = async (currentUser) => {
    try {
      const blogsCollection = collection(db, 'blogs');
      const userQuery = query(blogsCollection, where('uid', '==', currentUser.uid));
      const blogSnapshot = await getDocs(userQuery);
      const userBlogList = blogSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setUserBlogs(userBlogList);
    } catch (error) {
      console.error('Error fetching user blogs:', error);
    }
  };

  
  const handleDeleteBlog = async (blogId) => {
    try {
      const blogDoc = doc(db, 'blogs', blogId);
      await deleteDoc(blogDoc);
      if (user) {
        fetchUserBlogs(user); 
      }
    } catch (error) {
      console.error('Error deleting blog:', error);
    }
  };

 
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) {
        navigate('/googlesignin'); 
      } else {
        setUser(currentUser);
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  
  useEffect(() => {
    if (user) {
      fetchUserBlogs(user);
    }
  }, [user]);

  return (
    <div className="your-blogs-container">
      <h1 className="your-blogs-title">Your Blogs</h1>

      <button
        onClick={() => navigate('/')}
        className="back-home-button"
      >
        Back to Home
      </button>

     
      <div className="blogs-list">
        {userBlogs.map((blog) => (
          <div key={blog.id} className="blog-card">
            <h2 className="blog-title">{blog.title}</h2>
            <p className="blog-author">By {blog.author}</p>
            <p className="blog-content">{blog.content}</p>
            <button
              onClick={() => handleDeleteBlog(blog.id)}
              className="delete-button"
            >
              Delete
            </button>
          </div>
        ))}
      </div>

     
      {userBlogs.length === 0 && (
        <p className="no-blogs-message">You have not created any blogs.</p>
      )}
    </div>
  );
};

export default YourBlogs;