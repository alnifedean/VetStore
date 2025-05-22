import styles from './Equipment.module.css'
import { Link } from 'react-router-dom';
import { useEffect } from 'react';

const Equipment = () =>{
  // Scroll to the top when the component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return(
    <div className={styles.equipmentContainer}>
      {/* Information section about the classes */}
      <div className={styles.infoContainer}>
        <h2 className={styles.infoContainerH2}>Equipment</h2>
        <p className={styles.infoContainerP}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias nihil similique ducimus illum aspernatur sapiente voluptas adipisci commodi dolor! Aliquid obcaecati nostrum repellendus. Saepe, deserunt quasi quo dolorem possimus molestiae porro sint repellendus odio laudantium itaque dolorum molestias est. Maxime similique, nesciunt iure consequuntur voluptate repellat excepturi placeat nulla sunt aliquam cumque saepe animi porro quo est reiciendis? Quisquam maxime asperiores eum illo ut sequi voluptatum, dolorum sapiente itaque exercitationem odit laudantium, quia, sunt nostrum repudiandae possimus labore laboriosam? Inventore in eveniet nobis quo nisi labore similique, veniam maxime et illum exercitationem itaque ipsam deserunt aliquid cupiditate voluptates assumenda reprehenderit?</p>
        {/* Contact button linking to the Contact page */}
        <Link className={styles.buttonContact} to={'/contact'} >Contact</Link>
      </div>

      {/* Image gallery for class-related visuals */}
      <div className={styles.imagesContainer}>
        <div className={styles.imagesBox}></div>
        <div className={styles.buttonsBox}>
          {/* Navigation buttons for browsing images */}
          <button className={styles.buttonImage}>Last</button>
          <button className={styles.buttonImage}>Next</button>
        </div>
      </div>
    </div>
  )
}

export default Equipment;