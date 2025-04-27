import styles from './Dashboard.module.css'
import deleteIcon from '../UI/images/borrar.png'
import Modal from '../UI/ModalPet.jsx';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {

  const [isLoading, setIsLoading] = useState(true);
  const [pets, setPets] = useState([]);
  const [newPet, setNewPet] = useState(null);
  const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
  const navigate = useNavigate();
  const signed = localStorage.getItem("token");
  const userId = storedUser?.id;

  useEffect(() => {
    if (!signed || !userId || signed === "null" || userId === "undefined") {
      navigate('/login');
      setTimeout(() => {}, 0);
      return;
    } else {
      fetchPets();
    }
  }, [signed, userId]);


  const fetchPets = async () => {

    if (!signed || !userId || userId === "undefined") {
      return;
    }  


    try {
      const response = await fetch(
        `http://localhost:8080/system/api/v1/pet/all/${userId}`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' }
        });
        if (!response.ok) {
          throw new Error("response not ok!!");
        }

        const petsData = await response.json();
        setPets(petsData);
    } catch (error) {
      console.error('Error:', error);
      alert('Error connecting to the server');
    } finally {
      setIsLoading(false);
    }
  };

  const deleteDog = async (petId) => {

    const confirmDelete = window.confirm("Are you sure you want to delete this pet?");
  
    if (!confirmDelete) {return;}
    
    setIsLoading(true);
    try {
      const response = await fetch(`http://localhost:8080/system/api/v1/pet/${petId}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      });

      if (!response.ok) {
        throw new Error("Failed to delete pet");
      }
      setPets(prevPets => prevPets.filter(pet => pet.id !== petId));


    } catch (error) {
      console.error('Error:', error);
      alert('Error connecting to the server');
    } finally {
      setIsLoading(false);
    }
  };

  const modalHandler = () =>{
    setNewPet(true)
  };

  const closeModal = () =>{
    setNewPet(null)
  };

  useEffect(() => {

    window.scrollTo(0, 0);
    if (!newPet) {
      fetchPets();
    }
  }, [newPet]);
  
  return(
    <>
      
      {isLoading ? <div>Loading...</div> : 
      <div className={styles.petsContainer}>
      <h2 className={styles.petsTitle}>My Pets!</h2>
      <div className={styles.petRowTitle}>
        <div>NAME</div>
        <div>BREED</div>
        <div className={styles.petRowTxt}>AGE</div>
        <div>DELETE</div>
      </div>
      {pets.map((element) => (
        <div key={element.id} className={styles.petRow}>
          <div>{element.name}</div>
          <div>{element.breed}</div>
          <div className={styles.petRowTxt}>{element.ageYears}</div>
          <div>
            <img src={deleteIcon} alt="Delete" className={styles.iconTrash} onClick={()=>deleteDog(element.id)} />
          </div>
        </div>
      ))}
      <div className={styles.petsAddBtn}>
        <div className={styles.petsAddText} >- Add new dog...</div>
        <div className={styles.petsAddPlus} onClick={()=>modalHandler()}>+</div>
      </div>
    </div>
      }
      {newPet && <Modal onConfirm={closeModal} />}
    </>
  )
}

export default Dashboard;