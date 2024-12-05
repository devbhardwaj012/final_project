import React, { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db, auth } from '../firebase';
import { useNavigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import './css/AddBlog.css';

const AddBlog = () => {
  const [newBlog, setNewBlog] = useState({
    title: '',
    content: '',
    author: '',
  });
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  
  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) {
        navigate('/googlesignin');
      } else {
        setUser(currentUser);
        setNewBlog({ ...newBlog, author: currentUser.displayName || 'Anonymous' });
      }
    });
    return unsubscribe;
  }, []);

 
  const handleAddBlog = async (e) => {
    e.preventDefault();
    try {
      const blogsCollection = collection(db, 'blogs');
      await addDoc(blogsCollection, {
        ...newBlog,
        uid: user.uid, 
        createdAt: new Date(),
      });

      alert('Blog added successfully!');
      navigate('/');
    } catch (error) {
      console.error('Error adding blog:', error);
    }
  };

  return (
    <div className="add-blog-container">
      <h1 className="add-blog-title">Add a New Blog</h1>
      <form onSubmit={handleAddBlog} className="add-blog-form">
        <div className="form-group">
          <input
            type="text"
            placeholder="Blog Title"
            value={newBlog.title}
            onChange={(e) => setNewBlog({ ...newBlog, title: e.target.value })}
            className="form-input"
            required
          />
        </div>
        <div className="form-group">
          <textarea
            placeholder="Blog Content"
            value={newBlog.content}
            onChange={(e) => setNewBlog({ ...newBlog, content: e.target.value })}
            className="form-textarea"
            rows="4"
            required
          />
        </div>
        <button type="submit" className="form-submit-button">
          Submit Blog
        </button>
      </form>
    </div>
  );
};

export default AddBlog;
