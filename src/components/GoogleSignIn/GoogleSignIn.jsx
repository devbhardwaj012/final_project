import React, { useState } from 'react';
import { auth, provider } from '../../firebase';
import { signInWithPopup, GoogleAuthProvider, setPersistence, browserLocalPersistence } from 'firebase/auth';
import './GoogleSignIn.css';
import { useNavigate } from 'react-router-dom';

const GoogleSignIn = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const signInWithGoogle = async () => {
    setLoading(true);
    setError(null);

    try {
      await setPersistence(auth, browserLocalPersistence);
      const result = await signInWithPopup(auth, provider);
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      const user = result.user;


      navigate('/');
      alert("Logged in!");
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      const email = error.customData.email;
      const credential = GoogleAuthProvider.credentialFromError(error);

      console.error(`Error ${errorCode}: ${errorMessage}, Email: ${email}, Credential: ${credential}`);
      setError("Failed to sign in. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="auth-container" role="main">
      <div className="card">
        <p className="sign-in-text">Sign In with Google to continue</p>
        <button
          className="google-sign-in-btn"
          onClick={signInWithGoogle}
          aria-label="Sign in with Google"
          disabled={loading}
        >
          {loading ? <div className="loading-spinner" role="status" aria-label="Loading"></div> : "Sign In With Google"}
        </button>
        {error && <p className="error-message">{error}</p>}
      </div>
    </div>
  );
}

export default GoogleSignIn;
