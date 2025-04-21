import { Link } from 'react-router-dom';
import styles from './Equipment.module.css'

const Equipment = () =>{
  return(
    <div className={styles.equipmentContainer}>
      <div className={styles.infoContainer}>
        <h2>Equipo</h2>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias nihil similique ducimus illum aspernatur sapiente voluptas adipisci commodi dolor! Aliquid obcaecati nostrum repellendus. Saepe, deserunt quasi quo dolorem possimus molestiae porro sint repellendus odio laudantium itaque dolorum molestias est. Maxime similique, nesciunt iure consequuntur voluptate repellat excepturi placeat nulla sunt aliquam cumque saepe animi porro quo est reiciendis? Quisquam maxime asperiores eum illo ut sequi voluptatum, dolorum sapiente itaque exercitationem odit laudantium, quia, sunt nostrum repudiandae possimus labore laboriosam? Inventore in eveniet nobis quo nisi labore similique, veniam maxime et illum exercitationem itaque ipsam deserunt aliquid cupiditate voluptates assumenda reprehenderit?</p>
        <Link className={styles.buttonContact} to={'/contact'} >Contacto</Link>
      </div>

      <div className={styles.imagesContainer}>
        <div className={styles.imagesBox}></div>
        <div className={styles.buttonsBox}>
          <button className={styles.buttonImage}>Anterior</button>
          <button className={styles.buttonImage}>Siguiente</button>
        </div>
      </div>
    </div>
  )
}

export default Equipment;