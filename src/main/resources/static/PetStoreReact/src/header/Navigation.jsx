import { Link } from 'react-router-dom';
import styles from './Navigation.module.css'
import Logo from '../UI/images/otroLogoModificado.png'

const Navigation = () => {
  return(
    <div className={styles.Navigation}>
      <div className={styles.logoContainer}>
        <Link className={styles.logoContainerLink} to='/home'><img className={styles.logoContainerImg} src={Logo} alt="Logo" /><h1 className={styles.logoContainerH1}>PROTECAN</h1></Link>
      </div>

      <div className={styles.menuContainer}>
        <div className={styles.links}>
          <Link className={styles.link} to={'/home'}>Home</Link>
          <Link className={styles.link} to={'/services'}>Services</Link>
          <Link className={styles.link} to={'/gallery'} >Gallery</Link>
          <Link className={styles.link} to={'/contact'} >Contact</Link>
        </div>
        
        <div className={styles.userAction}>
          <Link className={styles.userActionLinkSingIn} to={'/register'}  >Sign in</Link>
          <Link className={styles.userActionLinkLogin} to={'/login'} >Login</Link>
        </div>
      </div>

  </div>
  )
}

export default Navigation;