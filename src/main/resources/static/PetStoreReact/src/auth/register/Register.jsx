import { Link, useNavigate } from 'react-router-dom';
import styles from './Register.module.css'
import { useState } from 'react';

const Register = () => {

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:8080/system/api/v1/user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        const data = await response.json();
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
    {!isLoading && 
      <>
        <form className={styles.mainContainer} onSubmit={handleSubmit}>
          <div className={styles.titleContainer}>
            <h2 className={styles.titleContainerH2}>Register</h2>
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
        <p>Have an account? <Link className={styles.mainContanierA} to={'/login'}>Sign in!</Link></p>
      </>
    }
    {isLoading && <div>Loading...</div>}
    </>
  );
};

export default Register;
