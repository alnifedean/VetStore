import React from "react";
import axios from "axios";
import styles from './Dashboard.module.css'
import settIcon from '../UI/images/ajuste.png'
import userSetting from '../UI/images/userSetting.png'
import Modal from '../UI/ModalPet.jsx';
import ModalSettings from '../UI/ModalSettings.jsx';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  // State for managing user authentication and pets list
  const [isLoading, setIsLoading] = useState(true);
  const [pets, setPets] = useState([]);
  const [newPet, setNewPet] = useState(null);
  const [noPet, setNoPet] = useState(null);
  const [settingPet, setSettingPet] = useState(null);
  // Retrieve stored user details from localStorage
  const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
  const navigate = useNavigate();
  const signed = localStorage.getItem("token");
  const userId = storedUser?.id;

  // Check user authentication and fetch pets on component mount
  useEffect(() => {
    if (!signed || !userId || signed === "null" || userId === "undefined") {
      navigate('/login');
      setTimeout(() => {}, 0);
      return;
    } else {
      fetchPets();
    }
  }, [signed, userId]);

  // Fetch pets from the backend API
  const fetchPets = async () => {
    if (!signed || !userId || userId === "undefined") {return;}  

    try {
      const response = await axios.get(
        'http://localhost:8080/system/api/v1/pet',
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem("token")
          },
          validateStatus: () => true // <- Permite manejar manualmente el status
        }
      );

      if (response.status === 204) {
        setNoPet(true);
        return;
      } else if (response.status >= 400) {
        throw new Error("response not ok!!");
      } else {
        setNoPet(false);
        setPets(response.data);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error connecting to the server');
    } finally {
      setIsLoading(false);
    }
  };

  // Open modal to add a new pet
  const modalHandler = () =>{
    setNewPet(true)
  };

  // Close modal and refresh pet list if changes were made
  const closeModal = () =>{
    setNewPet(null)
    setSettingPet(null)
    setIsLoading(false);
    if(pets.length==0){
      setNoPet(true)
    } else{
      setNoPet(null)
    }
  };

  // Scroll to the top on component mount and refresh pets if modals are closed
  useEffect(() => {
    window.scrollTo(0, 0);
    if (!newPet || !settingPet) {
      fetchPets();
    }
  }, [newPet, settingPet]);
  
  return(
    <>
      {/* User settings button */}
      <div className={styles.userSettings} onClick={()=>navigate('/settings')}>
        <p className={styles.userSettingsText}>User</p>
        <img className={styles.userSettingsImg} src={userSetting} alt="User settings" />
      </div>
      {/* Display loading state or pets list */}
      {isLoading ? <div>Loading...</div> : 
      <div className={styles.petsContainer}>
        <h2 className={styles.petsTitle}>My Pets!</h2>
        {/* Pets list header */}
        <div className={styles.petRowTitle}>
          <div>NAME</div>
          <div>BREED</div>
          <div className={styles.petRowTxt}>AGE</div>
          <div>DELETE</div>
        </div>
        
        {/* Display message if no pets are registered */}
        { noPet ?
        (<div>NO PETS</div>):
        pets.map((element) => (
          <div key={element.id} className={styles.petRow}>
            <div>{element.name}</div>
            <div>{element.breed}</div>
            <div className={styles.petRowTxt}>{element.ageYears}</div>
            <div>
              {/* Button to open settings for a specific pet */}
              <img src={settIcon} alt="Delete" className={styles.iconEdit} onClick={()=>setSettingPet(element)} />
            </div>
          </div>)
        )}

        {/* Button to add a new pet */}
        <div className={styles.petsAddBtn}>
          <div className={styles.petsAddText} >- Add new dog...</div>
          <div className={styles.petsAddPlus} onClick={()=>modalHandler()}>+</div>
        </div>
      </div>
      }
      {/* Modals for adding or editing pet details */}
      {newPet && <Modal onConfirm={closeModal} />}
      {settingPet && <ModalSettings onConfirm={closeModal} data={settingPet} />}
    </>
  )
}

export default Dashboard;