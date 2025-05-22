import styles from './HamburgerMenu.module.css'
import icon from '../UI/images/menu.png'
import iconHome from '../UI/images/imagen2.png'
import { useState } from 'react'
import { Link } from 'react-router-dom';

const HamburgerMenu = () => {

  const [isOpen, setIsOpen] = useState(false);

  // Toggle menu state when clicking the icon
  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  // Check if user is logged in by retrieving the authentication token from localStorage
  const logged = localStorage.getItem('token');

  // Logout function to clear user session from localStorage
  const logoutHandler = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

  return(
    <>
      {/* Render menu icon when menu is closed */}
      {!isOpen ? <img src={icon} alt="Hamburger menu icon" onClick={toggleMenu} className={styles.hamburgerMenuIcon} />:
      <>
        {/* Close button to hide the menu */}
        <div className={styles.close} onClick={toggleMenu}>X</div>
        {/* Navigation links container */}
        <div className={styles.links}>
          <div className={styles.userActionLinks}>
            {/* Show different links based on login status */}
            {logged != null ? 
              <div className={styles.userAction} >
                {/* Redirects logged-in users to dashboard */}
                <Link className={styles.userActionLinkLogin} onClick={toggleMenu} to={'/dashboard'} >Dashboard</Link>
                {/* Logout option */}
                <Link className={styles.userActionLinkSingOut} onClick={logoutHandler} to={'/login'} >Logout</Link>
              </div> :
              <div className={styles.userAction}>
                {/* Sign-up and login options for new users */}
                <Link className={styles.userActionLinkSingIn} to={'/register'}  >Sign up</Link>
                <Link className={styles.userActionLinkLogin} to={'/login'} >Login</Link>
              </div>
            }
          </div>
          {/* Main navigation links */}
          <Link className={styles.link} to={'/home'} onClick={toggleMenu} >Home</Link>
          <Link className={styles.link} to={'/services'} onClick={toggleMenu} >Services</Link>
          <Link className={styles.link} to={'/gallery'} onClick={toggleMenu} >Gallery</Link>
          <Link className={styles.link} to={'/contact'} onClick={toggleMenu} >Contact</Link>
        </div>
      </>
      }
    </>
  )
}

export default HamburgerMenu;