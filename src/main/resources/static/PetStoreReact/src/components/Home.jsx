import styles from './Home.module.css'
import Image1 from '../UI/images/pictures/ranaMain.png'

const Home =() => {
  return(
    <div className={styles.home}>
      <div className={styles.homeHero}><img className={styles.homeHeroImg} src={Image1} alt="Imagen perro feliz" /></div>
      <div className={styles.homeInfo}>
        <div></div>
        <div></div>
      </div>
      <div className={styles.homeInfo}>
        <div></div>
        <div></div>
      </div>
    </div>
  )
}

export default Home;