import styles from './ModalSettings.module.css'
import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import image from './images/pictures/vet.png'
import iconTrash from './images/borrar.png'

const ModalSettings = ({ onConfirm, data }) => {
  return (
    <>
      {createPortal(<ModalOverlay onConfirm={onConfirm} data={data} />,
      document.getElementById('second-modal-root'))}

      {createPortal(<Backdrop onConfirm={onConfirm} />,
      document.getElementById('backdrop-root'))}
    </>
  );
};

const Backdrop = ({ onConfirm }) =>{
  return<div className={styles.backdrop} onClick={onConfirm}></div>;
};






const ModalOverlay = ({ data, onConfirm }) =>{

  const [petData, setPetData] = useState({
    name: '',
    ageYears: 0,
    breed: '',
  });
  
  useEffect(() => {
    setPetData(data);
  }, [data]);
  
  const handleChange = (event) => {
    const { name, value } = event.target;
    setPetData({ ...petData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(`http://localhost:8080/system/api/v1/pet`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(petData)
      });
      alert('Pet updated :D')
      onConfirm();
    } catch (error) {
      console.error('Error:', error);
      alert('Error connecting with server :(');
    }
  };


  const deleteDog = async () => {

    const confirmDelete = window.confirm("Are you sure you want to delete this pet?");
  
    if (!confirmDelete) {return;}
    
    try {
      const response = await fetch(`http://localhost:8080/system/api/v1/pet/${data.id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json', 'Authorization':localStorage.getItem("token") }
      });

      if (!response.ok) {
        throw new Error("Failed to delete pet");
      }
      

    } catch (error) {
      console.error('Error:', error);
      alert('Error connecting to the server');
    } finally {
      setPetData({
        name: '',
        ageYears: 0,
        breed: '',
      });
      onConfirm();
    }
  };
  
  return(
    <div className={styles.modalContainer}>
      <form className={styles.formContainer} onSubmit={handleSubmit}>
        <div className={styles.inputsContainer}>
          <div className={styles.inputsTitle}>
            <h2 className={styles.inputsH2} >EDIT PET</h2>
            <img src={iconTrash} alt="Delete pet" className={styles.deleteIcon} onClick={deleteDog}/>
          </div>
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
          <div className={styles.imageInputDiv}><img src={image} alt="Pet image" className={styles.image} /></div>
          <button className={styles.imageBtn} type='submit' >Submit</button>
        </div>
      </form>
    </div>
  )

}

export default ModalSettings;