import React from "react";
import styles from './Dashboard.module.css'
import settIcon from '../UI/images/ajuste.png'
import userSetting from '../UI/images/userSetting.png'
import Modal from '../UI/ModalPet.jsx';
import ModalSettings from '../UI/ModalSettings.jsx';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {

  const [isLoading, setIsLoading] = useState(true);
  const [pets, setPets] = useState([]);
  const [newPet, setNewPet] = useState(null);
  const [noPet, setNoPet] = useState(null);
  const [settingPet, setSettingPet] = useState(null);
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
        `http://localhost:8080/system/api/v1/pet`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json', 'Authorization':localStorage.getItem("token") }
        });
        
        if (response.status === 204) { 
          setNoPet(true);
          return;
        } else if (!response.ok){
          throw new Error("response not ok!!");
        } else {
          setNoPet(false);
          const petsData = await response.json();
          setPets(petsData);
        }
        
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
    setSettingPet(null)
    setIsLoading(false);
    if(pets.length==0){
      setNoPet(true)
    } else{
      setNoPet(null)
    }
  };

  useEffect(() => {

    window.scrollTo(0, 0);
    if (!newPet || !settingPet) {
      fetchPets();
    }
  }, [newPet, settingPet]);
  
  return(
    <>
    <div className={styles.userSettings} onClick={()=>navigate('/settings')}>
      <p className={styles.userSettingsText}>User</p>
      <img className={styles.userSettingsImg} src={userSetting} alt="User settings" />
    </div>
      {isLoading ? <div>Loading...</div> : 
      <div className={styles.petsContainer}>
      <h2 className={styles.petsTitle}>My Pets!</h2>
      <div className={styles.petRowTitle}>
        <div>NAME</div>
        <div>BREED</div>
        <div className={styles.petRowTxt}>AGE</div>
        <div>DELETE</div>
      </div>

      { noPet ?
      (<div>NO PETS</div>):
      pets.map((element) => (
        <div key={element.id} className={styles.petRow}>
          <div>{element.name}</div>
          <div>{element.breed}</div>
          <div className={styles.petRowTxt}>{element.ageYears}</div>
          <div>
            <img src={settIcon} alt="Delete" className={styles.iconEdit} onClick={()=>setSettingPet(element)} />
          </div>
        </div>)
      )}

      <div className={styles.petsAddBtn}>
        <div className={styles.petsAddText} >- Add new dog...</div>
        <div className={styles.petsAddPlus} onClick={()=>modalHandler()}>+</div>
      </div>
    </div>
      }
      {newPet && <Modal onConfirm={closeModal} />}
      {settingPet && <ModalSettings onConfirm={closeModal} data={settingPet} />}
    </>
  )
}

export default Dashboard;