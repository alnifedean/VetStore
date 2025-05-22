import { Link } from 'react-router-dom';
import styles from './Navigation.module.css'
import LogoEdit from '../UI/images/otroLogoModificado.png'
import Logo from '../UI/images/otroLogo.png'
import icon from '../UI/images/imagen2.png'
import HamburgerMenu from './HamburgerMenu';

const Navigation = () => {
  // Retrieve authentication token from localStorage to check login status
  const logged = localStorage.getItem('token');
  // Logout function to clear user session from localStorage
  const logoutHandler = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

  return(
    <div className={styles.Navigation}>
      {/* Logo section with navigation link to Home */}
      <div className={styles.logoContainer}>
        <Link className={styles.logoContainerLink} to='/home'>
          <img className={styles.logoContainerImg} src={LogoEdit} alt="Logo" />
          <h1 className={styles.logoContainerH1}>PROTECAN</h1>
          <img className={styles.logoContainerImgSmall} src={Logo} alt="Logo" />
        </Link>
      </div>

      {/* Menu container with navigation links */}
      <div className={styles.menuContainer}>
        <div className={styles.links}>
          <Link className={styles.link} to={'/home'}>Home</Link>
          <Link className={styles.link} to={'/services'}>Services</Link>
          <Link className={styles.link} to={'/gallery'} >Gallery</Link>
          <Link className={styles.link} to={'/contact'} >Contact</Link>
        </div>
        
        {/* User authentication actions */}
        {logged != null ? 
        <div className={styles.userAction} >
          {/* Dashboard navigation for logged-in users */}
          <Link className={styles.userActionLinkLogin} to={'/dashboard'} >
            <img className={styles.userActionLinkHouse} src={icon} alt="house" />
          </Link>
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
      {/* Hamburger menu for mobile navigation */}
      <HamburgerMenu />
    </div>
  )
}

export default Navigation;