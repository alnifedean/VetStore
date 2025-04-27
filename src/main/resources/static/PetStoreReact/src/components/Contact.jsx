import styles from './Contact.module.css'
import { useEffect } from 'react';

const Contact = () => {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return(
    <div className={styles.mainContainer}>

      <div className={styles.informationContainer}>
        <h2 className={styles.informationH2}>Questions?</h2>
        <p className={styles.informationMess}>Send us a message, call us, or visit us!!</p>
        <p className={styles.informationP}>email@email.com</p>
        <p className={styles.informationP}>987-654-3210</p>
        <p className={styles.informationP}>Ramon Larrainzar #123, San Ramon, San Cristobal de las Casas</p>
      </div>

      <form className={styles.formContainer}>
        <div className={styles.formImputs}>
          <label className={styles.labelInfo}>Name</label>
          <input className={styles.inputInfo} type="text" placeholder='Juan Perez' />
        </div>
        <div className={styles.formImputs}>
          <label className={styles.labelInfo}>Email</label>
          <input className={styles.inputInfo} type="text" placeholder='email@email.com' />
        </div>
        <div className={styles.formImputs}>
          <label className={styles.labelInfo}>Phone</label>
          <input className={styles.inputInfo} type="number" placeholder='987-654-3210' />
        </div>
        <div className={styles.formImputs}>
          <label className={styles.labelInfo}>Message</label>
          <textarea className={styles.inputInfoMsg} type="text" placeholder='Message...' />
        </div>
        <button type='submit' className={styles.inputButton}>Send</button>
      </form>

      <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d955.182358412129!2d-92.65326656626922!3d16.74034667524846!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85ed450f36494fbf%3A0x2abe378ec81cb1ee!2sPROTECAN!5e0!3m2!1sen!2smx!4v1745047947376!5m2!1sen!2smx" className={styles.mapContainer} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
    </div>
  )
}

export default Contact;