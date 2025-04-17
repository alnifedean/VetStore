import styles from './Home.module.css'
import Image2 from '../UI/images/pictures/escritorioCachorro.png'
import Image3 from '../UI/images/pictures/claseGente.png'

const Home =() => {
  return(
    <div className={styles.home}>
      <div className={styles.homeHero}>
        <div className={styles.homeInfoImg}><img className={styles.homeInfoImage} src={Image2} alt="Perro leyendo en la computadora" /></div>
        <div className={styles.homeInfoTxt}>Adiestrar a tu perro no es solo enseñarle trucos, es darle atención, cariño y mejorar su vida. Un perro educado es más feliz, se porta mejor y te entiende. ¡Adiestrar a tu mascota es amor!</div>
      </div>

      <div className={styles.homeInfo}>
        <div className={styles.homeInfoTxt}>Socializar a tu perro lo ayuda a ser más tranquilo, seguro y amigable. Pasar tiempo con tu mascota fortalece el lazo entre ustedes y hace que su día a día sea mucho más divertido.</div>
        <div className={styles.homeInfoImg}><img className={styles.homeInfoImage} src={Image3} alt="Clase con varios perros" /></div>
      </div>
    </div>
  )
}

export default Home;