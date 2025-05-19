import styles from './SettingsUser.module.css'
import icon from '../../UI/images/imagen2.png'
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import iconTrash from '../../UI/images/borrar.png'

const SettingsUser = () => {
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  // Check if user is logged in, otherwise redirect to login page
  useEffect(() => {
    if (token == null) {
      navigate('/login');
    } else {
      // Retrieve stored user information from localStorage
      const userInfo = JSON.parse(localStorage.getItem("user") || "{}");
      setFormData({
        firstName: userInfo.firstName,
        lastName: userInfo.lastName,
        email: userInfo.email,
        phone: userInfo.phone,
        password: '',
      });
    }
  }, []);

  // Handle input changes and update state
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle user update request
  const submitChange = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      const confirmDelete = window.confirm("Are you sure you want to edit this user?");
      if(!confirmDelete){return;}
      // Send update request to backend API
      const response = await fetch('http://localhost:8080/system/api/v1/user', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json','Authorization':localStorage.getItem("token") },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate('/login');
      } else {
        alert('Error registrating user');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error connecting with server');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle user deletion request
  const submitDelete = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      const confirmDelete = window.confirm("Are you sure you want to delete this user?");
      if(!confirmDelete){return;}
      // Send delete request to backend API
      const response = await fetch('http://localhost:8080/system/api/v1/user', {
        method: "DELETE",
        headers: {'Content-Type': 'application/json','Authorization':localStorage.getItem("token")}
    });

    if (response.ok) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      navigate('/register');
    }
    } catch (error) {
      console.error('Error:', error);
      alert('Error connecting with server');
    } finally {
      setIsLoading(false);
    }
  }


  return (
    <>
      {/* Home button leading back to dashboard */}
      <div className={styles.homeBtn}><img className={styles.homeBtnImg} src={icon} alt="home" onClick={()=>navigate('/dashboard')} /></div>
      {/* Display user settings form when not loading */}
      {!isLoading && 
        <>
          <form className={styles.mainContainer} onSubmit={submitChange}>
            <div className={styles.titleContainer}>
              <h2 className={styles.titleContainerH2}>Edit user</h2>
            </div>
            <div className={styles.formContainer}>
              {/* First name input field */}
              <label className={styles.formContainerLabel} htmlFor='firstName'>Name</label>
              <input className={styles.formContainerInput} type="text" id='firstName' name="firstName" placeholder="Jane..." value={formData.firstName} onChange={handleChange} />

              {/* Last name input field */}
              <label className={styles.formContainerLabel} htmlFor='lastName'>Last name</label>
              <input className={styles.formContainerInput} type="text" id='lastName' name="lastName" placeholder="Doe..." value={formData.lastName} onChange={handleChange} />

              {/* Email input field */}
              <label className={styles.formContainerLabel} htmlFor='email'>Email</label>
              <input className={styles.formContainerInput} type="email" id='email' name="email" placeholder="email@email.com..." value={formData.email} onChange={handleChange} />

              {/* Phone input field */}
              <label className={styles.formContainerLabel} htmlFor='phone'>Phone</label>
              <input className={styles.formContainerInput} type="number" id='phone' name="phone" placeholder="987-654-3210..." value={formData.phone} onChange={handleChange} />

              {/* Password input field */}
              <label className={styles.formContainerLabel} htmlFor='password'>Password</label>
              <input className={styles.formContainerInput} type="password" id='password' name="password" placeholder="Password..." value={formData.password} onChange={handleChange} />
            </div>
            
            <div className={styles.mainContainerButton}>
              {/* Submit button for updating user settings */}
              <button className={styles.submitBtn}  type="submit">Submit</button>
              {/* Delete button for removing the user account */}
              <img className={styles.deleteBtn} src={iconTrash} alt="delete user" onClick={(event) => submitDelete(event)} />
            </div>
          </form>
        </>
      }
      {/* Show loading message while processing user actions */}
      {isLoading && <div>Loading...</div>}
    </>
  );
};


export default SettingsUser;