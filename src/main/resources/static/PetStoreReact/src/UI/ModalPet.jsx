import { useState } from 'react';
import styles from './ModalPet.module.css'
import { createPortal } from 'react-dom';

// Modal component for adding a new pet
const Modal = ({ onConfirm }) => {
  return (
    <>
      {/* Render modal content inside designated second-modal-root in the DOM */}
      {createPortal(<ModalOverlay onConfirm={onConfirm} />,
      document.getElementById('second-modal-root'))}

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

// ModalOverlay component for adding a new pet
const ModalOverlay = ({ onConfirm }) =>{

  // State for managing pet input fields
  const [petData, setPetData] = useState({
    name: '',
    ageYears: 0,
    breed: '',
  });
  
  // Handle input changes and update state
  const handleChange = (event) => {
    const { name, value } = event.target;
    setPetData({ ...petData, [name]: value });
  };

  // Function to add a new pet
  const addPet = async (event) => {
    event.preventDefault();

    try {
      // Send pet registration request to backend API
      const response = await fetch(`http://localhost:8080/system/api/v1/pet`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization':localStorage.getItem("token") },
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
      <form className={styles.formContainer} onSubmit={addPet}>
        {/* Input fields for pet information */}
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
        {/* Image upload and submission button */}
        <div className={styles.imageContainer}>
          <div className={styles.imageInputDiv}><input type="file" className={styles.imageInput} /></div>
          <button className={styles.imageBtn} type='submit' >Submit</button>
        </div>
      </form>
    </div>
  )

}

export default Modal;