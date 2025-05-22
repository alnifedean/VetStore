import styles from './Modal.module.css';
import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router-dom';

// Modal component for displaying service details
const Modal = ({ onConfirm, service }) => {
  return (
    <>
      {/* Render modal content inside designated modal-root in the DOM */}
      {createPortal(<ModalOverlay onConfirm={onConfirm} service={service} />,
      document.getElementById('modal-root'))}

      {/* Render backdrop outside the modal for closing functionality */}
      {createPortal(<Backdrop onConfirm={onConfirm} />,
      document.getElementById('backdrop-root'))}
    </>
  );
};
// Backdrop component to allow closing the modal by clicking outside
const Backdrop = ({ onConfirm }) =>{
  return<div className={styles.backdrop} onClick={onConfirm}></div>;
};
// ModalOverlay component for displaying service details
const ModalOverlay = ({ onConfirm, service }) =>{
  const navigate = useNavigate();
  
    return(
      <div className={styles.serviceRows} style={{backgroundColor: service.color}}>
        {/* Service image */}
        <div className={styles.serviceRowImg}><img className={styles.serviceRowImgInt} src={service.image} alt="service image" /></div>
        {/* Service details */}
        <div className={styles.serviceRowTxt}>
          <h2 className={styles.serviceRowTxtH2}>{service.title}</h2>
          <p className={styles.serviceRowTxtP}>{service.text}</p>
          {/* Buttons for closing the modal or navigating to service details */}
          <div className={styles.serviceRowBtns}>
            <button onClick={onConfirm}>Close</button>
            <button onClick={()=> navigate(service.nav)}>See more!</button>
          </div>
        </div>
      </div>
    )
}


export default Modal;