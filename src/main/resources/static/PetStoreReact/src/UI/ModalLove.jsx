import styles from './ModalLove.module.css'
import image from './images/pictures/vet.png'
import { createPortal } from 'react-dom'
import { Link } from 'react-router-dom'

const ModalLove = ({ onConfirm, onData }) => {
  return(
    <>
      {createPortal(<ModalOverlay onConfirm={onConfirm} onData={onData} />,
      document.getElementById('third-modal-root'))}
    
      {createPortal(<Backdrop onConfirm={onConfirm} />,
      document.getElementById('backdrop-root'))}
    </>
  )
}

const Backdrop = ({ onConfirm }) => {
  return<div className={styles.backdrop} onClick={onConfirm}></div>;
}

const ModalOverlay = ({ onConfirm, onData }) => {
  return(
    <>
      <div className={styles.close} onClick={onConfirm}>X</div>
      <div className={styles.mainContainer}>

        <div className={styles.leftContainer}>
          <h2 className={styles.name}>{onData.name}</h2>
          <img src={image} alt="Doggy" className={styles.image} />
        </div>

        <div className={styles.rightContainer}>
          <h3 className={styles.info}>Information</h3>
          <p className={styles.infoP}>{onData.breed}</p>
          <p className={styles.infoP}>{onData.age} years</p>
          <p className={styles.infoP}>{onData.boyGirl}</p>
          <p className={styles.infoTxt}>{onData.text}</p>
          <Link className={styles.linkContact} to={'/contact'}>Contact</Link>
        </div>
      </div>
    </>
  )
}

export default ModalLove;