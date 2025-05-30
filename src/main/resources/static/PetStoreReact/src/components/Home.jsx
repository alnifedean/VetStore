import styles from './Home.module.css'
import Image2 from '../UI/images/pictures/escritorioCachorro.png'
import Image3 from '../UI/images/pictures/claseGente.png'
import { useEffect } from 'react'

const Home =() => {

  // Scroll to the top when the component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return(
    <div className={styles.home}>
      {/* Hero section with an image and introductory text */}
      <div className={styles.homeHero}>
        <div className={styles.homeInfoImg}><img className={styles.homeInfoImage} src={Image2} alt="Doggy with trainer" /></div>
        <div className={styles.homeInfoTxt}>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Iste eius libero minus dolores? Quod odio inventore quam aspernatur perspiciatis delectus rem, atque sed magnam quasi voluptas harum. Delectus, omnis est!</div>
      </div>

      {/* Information section with text and an additional image */}
      <div className={styles.homeInfo}>
        <div className={styles.homeInfoTxt}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae quibusdam fugit labore officiis nobis rerum voluptates sunt debitis error deleniti soluta quos ea accusantium reiciendis itaque, architecto enim, iusto fuga..</div>
        <div className={styles.homeInfoImg}><img className={styles.homeInfoImage} src={Image3} alt="Training class" /></div>
      </div>
    </div>
  )
}

export default Home;