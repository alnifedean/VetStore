import styles from './SettingsUser.module.css'
import icon from '../../UI/images/imagen2.png'
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

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


  useEffect(() => {
    if (token == null) {
      navigate('/login');
    } else {
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


  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const submitChange = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    try {
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


  return (
    <>
    <div className={styles.homeBtn}><img className={styles.homeBtnImg} src={icon} alt="home" onClick={()=>navigate('/dashboard')} /></div>
    {!isLoading && 
      <>
        <form className={styles.mainContainer} onSubmit={submitChange}>
          <div className={styles.titleContainer}>
            <h2 className={styles.titleContainerH2}>Edit user</h2>
          </div>
          <div className={styles.formContainer}>
            <label className={styles.formContainerLabel}>Name</label>
            <input className={styles.formContainerInput} type="text" name="firstName" placeholder="Jane..." value={formData.firstName} onChange={handleChange} />

            <label className={styles.formContainerLabel}>Last name</label>
            <input className={styles.formContainerInput} type="text" name="lastName" placeholder="Doe..." value={formData.lastName} onChange={handleChange} />

            <label className={styles.formContainerLabel}>Email</label>
            <input className={styles.formContainerInput} type="email" name="email" placeholder="email@email.com..." value={formData.email} onChange={handleChange} />

            <label className={styles.formContainerLabel}>Phone</label>
            <input className={styles.formContainerInput} type="number" name="phone" placeholder="987-654-3210..." value={formData.phone} onChange={handleChange} />

            <label className={styles.formContainerLabel}>Password</label>
            <input className={styles.formContainerInput} type="password" name="password" placeholder="Password..." value={formData.password} onChange={handleChange} />
          </div>
          <button className={styles.mainContainerButton} type="submit">Submit</button>
        </form>
      </>
    }
    {isLoading && <div>Loading...</div>}
    </>
  );
};


export default SettingsUser;