import React, { useContext, useState, useEffect } from 'react';
import './Navbar.css';
import cart_icon from '../Assets/cart_icon.webp';
import sell_icon from '../Assets/sell_icon.png';
import message_icon from '../Assets/message_icon.png';
import { RxHamburgerMenu } from "react-icons/rx";
import { FaRegUserCircle } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
// import { ShopContext } from '../../Context/ShopContext';
// import { useAuthState } from 'react-firebase-hooks/auth';
// import { auth } from '../../firebase';

const Navbar = () => {
    const { getTotalCartItems, unreadMessageCount, isRental, setIsRental } = useContext(ShopContext);
    const [user] = useAuthState(auth);
    const navigate = useNavigate();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [transitionText, setTransitionText] = useState('');

    const handleLogout = async () => {
        try {
            await auth.signOut();
            navigate('/');
            alert("Logged out!");
        } catch (error) {
            console.error('Error signing out:', error);
        }
    };

    const toggleRental = (newMode) => {
        if ((newMode === 'rental' && isRental) || (newMode === 'buy-sell' && !isRental)) {
            return;
        }

        setIsTransitioning(true);
        setTransitionText(newMode === 'rental' ? 'Switching to Rentals' : 'Switching to Buy/Sell');
        
        setTimeout(() => {
            setIsRental(newMode === 'rental');
            navigate('/');
            
            // Scroll to the top of the page
            window.scrollTo(0, 0);
            
            setTimeout(() => {
                setIsTransitioning(false);
            }, 500); // Delay to allow fade-out animation
        }, 500); // Duration of the transition overlay
    };

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    useEffect(() => {
        const closeMenu = () => {
            if (isMobileMenuOpen) {
                setIsMobileMenuOpen(false);
            }
        };

        window.addEventListener('click', closeMenu);
        window.addEventListener('scroll', closeMenu);

        return () => {
            window.removeEventListener('click', closeMenu);
            window.removeEventListener('scroll', closeMenu);
        };
    }, [isMobileMenuOpen]);

    const handleHamburgerClick = (e) => {
        e.stopPropagation();
        toggleMobileMenu();
    };

    return (
        <>
            <nav className='navbar'>
                <div className="nav-left">
                    <div className="hamburger-menu" onClick={handleHamburgerClick}>
                        <RxHamburgerMenu size={24} />
                    </div>
                    <div className='nav-logo'>
                        <Link to="/" className="logo-link">
                            <h2>UB&US</h2>
                        </Link>
                    </div>
                </div>
                {isMobileMenuOpen && (
                    <div className="mobile-menu">
                        <Link to="/user-profile">Profile</Link>
                        <Link to="/cart">Wishlist</Link>

                        {user ? (
                            <button onClick={handleLogout}>Logout</button>
                        ) : (
                            <Link to='/GoogleSignIn'>
                                <button>Login</button>
                            </Link>
                        )}
                    </div>
                )}
                <div className="nav-elements">
                    <div className="toggle-container">
                        <button 
                            className={`toggle-btn ${!isRental ? 'active' : ''}`} 
                            onClick={() => toggleRental('buy-sell')}
                        >
                            Buy/Sell
                        </button>
                        <button 
                            className={`toggle-btn ${isRental ? 'active' : ''}`} 
                            onClick={() => toggleRental('rental')}
                        >
                            Rentals
                        </button>
                    </div>

                    <div className="nav-icons">
                        <Link to={isRental ? '/rent' : '/sell'} className="icon-wrapper" title="Sell">
                            <img src={sell_icon} alt="Sell" />
                        </Link>
                        <Link to="/messages" className="icon-wrapper" title="Messages">
                            <img src={message_icon} alt="Messages" />
                            {unreadMessageCount > 0 && (
                                <span className="icon-badge">{unreadMessageCount}</span>
                            )}
                        </Link>


                        <Link to="/cart" className="icon-wrapper desktop-only" title="Wishlist">
                            <img src={cart_icon} alt="Cart" />
                            {getTotalCartItems() > 0 && (
                                <span className="icon-badge">{getTotalCartItems()}</span>
                            )}
                        </Link>





                        <Link to="/user-profile" className="icon-wrapper desktop-only" title="User Profile">
                            <FaRegUserCircle className="user-icon" />
                        </Link>
                    </div>

                    <div className="desktop-auth">
                        {user ? (
                            <button onClick={handleLogout}>Logout</button>
                        ) : (
                            <Link to='/GoogleSignIn'>
                                <button>Login</button>
                            </Link>
                        )}
                    </div>
                </div>
            </nav>
            
            {isTransitioning && (
                <div className="transition-overlay">
                    <div className="loading-ring"></div>
                    <p>{transitionText}</p>
                </div>
            )}
        </>
    );
}

export default Navbar;