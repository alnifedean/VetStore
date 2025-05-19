import adi from '../UI/images/pictures/adiestramiento.png'
import guard from '../UI/images/pictures/escritorioCachorro.png'
import clas from '../UI/images/pictures/claseGente.png'
import hotel from '../UI/images/pictures/hotel.png'
import cupi from '../UI/images/pictures/cupido.png'
import food from '../UI/images/pictures/alimento.png'
import equi from '../UI/images/pictures/articulos.png'
import vet from '../UI/images/pictures/vet.png'
import styles from './Modal.module.css';
import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router-dom';

const Modal = ({ onConfirm, service }) => {
  return (
    <>
      {createPortal(<ModalOverlay onConfirm={onConfirm} service={service} />,
      document.getElementById('modal-root'))}

      {createPortal(<Backdrop onConfirm={onConfirm} />,
      document.getElementById('backdrop-root'))}
    </>
    
  );
};

const Backdrop = ({ onConfirm }) =>{
  return<div className={styles.backdrop} onClick={onConfirm}></div>;
};

const ModalOverlay = ({ onConfirm, service }) =>{
  const navigate = useNavigate();
  
    return(
      <div className={styles.serviceRows} style={{backgroundColor: service.color}}>
        <div className={styles.serviceRowImg}><img className={styles.serviceRowImgInt} src={service.image} alt="service image" /></div>
        <div className={styles.serviceRowTxt}>
          <h2 className={styles.serviceRowTxtH2}>{service.title}</h2>
          <p className={styles.serviceRowTxtP}>{service.text}</p>
          <div className={styles.serviceRowBtns}>
            <button onClick={onConfirm}>Close</button>
            <button onClick={()=> navigate(service.nav)}>See more!</button>
          </div>
        </div>
      </div>
    )
}


export default Modal;