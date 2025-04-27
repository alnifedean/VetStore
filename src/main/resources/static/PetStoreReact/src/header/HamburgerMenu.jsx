import styles from './HamburgerMenu.module.css'
import icon from '../UI/images/menu.png'
import iconHome from '../UI/images/imagen2.png'
import { useState } from 'react'
import { Link } from 'react-router-dom';

const HamburgerMenu = () => {

  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  const logged = localStorage.getItem('token');

  const logoutHandler = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

  return(
    <>
    {!isOpen ? <img src={icon} alt="Hamburger menu icon" onClick={toggleMenu} className={styles.hamburgerMenuIcon} />:
      <>
        <div className={styles.close} onClick={toggleMenu}>X</div>
        <div className={styles.links}>
          <div className={styles.userActionLinks}>
            {logged != null ? 
              <div className={styles.userAction} >
                <Link className={styles.userActionLinkLogin} onClick={toggleMenu} to={'/dashboard'} >Dashboard</Link>
                <Link className={styles.userActionLinkSingOut} onClick={logoutHandler} to={'/login'} >Logout</Link>
              </div> :
              <div className={styles.userAction}>
                <Link className={styles.userActionLinkSingIn} to={'/register'}  >Sign up</Link>
                <Link className={styles.userActionLinkLogin} to={'/login'} >Login</Link>
              </div>
            }
          </div>
        
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