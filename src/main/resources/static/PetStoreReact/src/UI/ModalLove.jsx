import styles from './ModalLove.module.css'
import image from './images/pictures/vet.png'
import { createPortal } from 'react-dom'
import { Link } from 'react-router-dom'


// ModalLove component for displaying pet matchmaking details
const ModalLove = ({ onConfirm, onData }) => {
  return(
    <>
      {/* Render modal content inside designated modal-root in the DOM */}
      {createPortal(<ModalOverlay onConfirm={onConfirm} onData={onData} />,
      document.getElementById('third-modal-root'))}

      {/* Render backdrop outside the modal for closing functionality */}
      {createPortal(<Backdrop onConfirm={onConfirm} />,
      document.getElementById('backdrop-root'))}
    </>
  )
}

// Backdrop component to allow closing the modal by clicking outside
const Backdrop = ({ onConfirm }) => {
  return<div className={styles.backdrop} onClick={onConfirm}></div>;
}

// ModalOverlay component for displaying pet details
const ModalOverlay = ({ onConfirm, onData }) => {
  return(
    <>
      <div className={styles.mainContainer}>
        {/* Left section with pet image and name */}
        <div className={styles.leftContainer}>
          <h2 className={styles.name}>{onData.name}</h2>
          <img src={image} alt="Doggy" className={styles.image} />
        </div>

        {/* Right section with pet information */}
        <div className={styles.rightContainer}>
          <div className={styles.titleContainer}>
            <h3 className={styles.info}>Information</h3>
            {/* Close button to exit the modal */}
            <div className={styles.close} onClick={onConfirm}>X</div>
          </div>
          {/* Display pet details */}
          <p className={styles.infoP}>{onData.breed}</p>
          <p className={styles.infoP}>{onData.age} years</p>
          <p className={styles.infoP}>{onData.boyGirl}</p>
          <p className={styles.infoTxt}>{onData.text}</p>
          {/* Contact button linking to the Contact page */}
          <Link className={styles.linkContact} to={'/contact'}>Contact</Link>
        </div>
      </div>
    </>
  )
}

export default ModalLove;