import styles from './Register.module.css'
import icon from '../../UI/images/imagen2.png'
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

const Register = () => {
  // State for managing user input fields
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const signed = localStorage.getItem("token");

  // Redirect to dashboard if the user is already logged in
  useEffect(() => {
    if (signed !== null) {
      navigate('/dashboard');
    }
  }, []);

  // Handle input changes and update state
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission and register user
  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      // Send registration request to backend API
      const response = await fetch('http://localhost:8080/system/api/v1/user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        alert("User added, please log in!! :D")
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
      {/* Home button with image leading back to homepage */}
      <div className={styles.homeBtn}><img className={styles.homeBtnImg} src={icon} alt="home" onClick={()=>navigate('/home')} /></div>
      {/* Display registration form when not loading */}
      {!isLoading && 
        <>
          <form className={styles.mainContainer} onSubmit={handleSubmit}>
            <div className={styles.titleContainer}>
              <h2 className={styles.titleContainerH2}>Register</h2>
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
            <button className={styles.mainContainerButton} type="submit">Submit</button>
          </form>
          {/* Redirect link for existing users */}
          <p>Have an account? <Link className={styles.mainContanierA} to={'/login'}>Login!</Link></p>
        </>
      }
      {/* Show loading message while processing registration */}
      {isLoading && <div>Loading...</div>}
    </>
  );
};

export default Register;
