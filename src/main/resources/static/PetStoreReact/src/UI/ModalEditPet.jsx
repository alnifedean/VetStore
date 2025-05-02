import { useState } from 'react';
import styles from './ModalEditPet.module.css'
import { createPortal } from 'react-dom';

const Modal = ({ onConfirm }) => {
  return (
    <>
      {createPortal(<ModalOverlay onConfirm={onConfirm} />,
      document.getElementById('second-modal-root'))}

      {createPortal(<Backdrop onConfirm={onConfirm} />,
      document.getElementById('backdrop-root'))}
    </>
  );
};

const Backdrop = ({ onConfirm }) =>{
  return<div className={styles.backdrop} onClick={onConfirm}></div>;
};

const ModalOverlay = ({ onConfirm }) =>{

  const storedUser = JSON.parse(localStorage.getItem("user"));
  const userId = storedUser?.id;
  const [petData, setPetData] = useState({
    name: '',
    ageYears: 0,
    breed: '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setPetData({ ...petData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(`http://localhost:8080/system/api/v1/pet/${userId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(petData)
      });
      alert('Pet added :D')
      onConfirm();
    } catch (error) {
      console.error('Error:', error);
      alert('Error connecting with server');
    }
  };
  
  return(
    <div className={styles.modalContainer}>
      <form className={styles.formContainer} onSubmit={handleSubmit}>
        <div className={styles.inputsContainer}>
          <h2 className={styles.inputsH2}>ADD PET</h2>
          <div className={styles.inputs}>
            <label className={styles.labels}>Name</label>
            <input type="text" placeholder='Name...' className={styles.inputsEach} name='name' value={petData.name} onChange={handleChange} />

            <label className={styles.labels}>Breed</label>
            <input type="text" placeholder='Breed' className={styles.inputsEach} name='breed' value={petData.breed} onChange={handleChange} />

            <label className={styles.labels}>Age</label>
            <input type="number" className={styles.inputsEach} name='ageYears' value={petData.ageYears} onChange={handleChange} />
          </div>
        </div>
        <div className={styles.imageContainer}>
          <div className={styles.imageInputDiv}><input type="file" className={styles.imageInput} /></div>
          <button className={styles.imageBtn} type='submit' >Submit</button>
        </div>
      </form>
    </div>
  )

}

export default Modal;