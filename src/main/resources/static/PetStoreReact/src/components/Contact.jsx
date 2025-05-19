import styles from './Contact.module.css'
import { useEffect, useState } from 'react';

const Contact = () => {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });

  useEffect(() => {
    setFormData({name: "", email: "", phone: "", message: ""})
    window.scrollTo(0, 0);
  }, []);

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  return(
    <div className={styles.mainContainer}>

      <div className={styles.informationContainer}>
        <h2 className={styles.informationH2}>Questions?</h2>
        <p className={styles.informationMess}>Send us a message, call us, or visit us!!</p>
        <p className={styles.informationP}>email@email.com</p>
        <p className={styles.informationP}>987-654-3210</p>
        <p className={styles.informationP}>Ramon Larrainzar #123, San Ramon, San Cristobal de las Casas</p>
      </div>

      <form className={styles.formContainer} action="https://formspree.io/f/xwpoyzjg" method="POST">
        <div className={styles.formInputs}>
          <label className={styles.labelInfo} htmlFor="name">Name</label>
          <input className={styles.inputInfo} value={formData.name} onChange={handleChange} type="text" name="name" id="name" placeholder="Juan Perez" required />
        </div>
        <div className={styles.formInputs}>
          <label className={styles.labelInfo} htmlFor="email">Email</label>
          <input className={styles.inputInfo} value={formData.email} onChange={handleChange} type="email" name="email" id="email" placeholder="email@email.com" required />
        </div>
        <div className={styles.formInputs}>
          <label className={styles.labelInfo} htmlFor="phone">Phone</label>
          <input className={styles.inputInfo} value={formData.phone} onChange={handleChange} type="number" name="phone" id="phone" placeholder="987-654-3210" required />
        </div>
        <div className={styles.formInputsMsg}>
          <label className={styles.labelInfo} htmlFor="message">Message</label>
          <textarea className={styles.inputInfoMsg} value={formData.message} onChange={handleChange} name="message" id="message" placeholder="Message..." required></textarea>
        </div>
        <button type="submit" className={styles.inputButton}>Send</button>
      </form>

      <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d955.182358412129!2d-92.65326656626922!3d16.74034667524846!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85ed450f36494fbf%3A0x2abe378ec81cb1ee!2sPROTECAN!5e0!3m2!1sen!2smx!4v1745047947376!5m2!1sen!2smx" className={styles.mapContainer} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
    </div>
  )
}

export default Contact;