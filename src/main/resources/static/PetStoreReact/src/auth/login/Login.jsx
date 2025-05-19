import { Link, useNavigate } from 'react-router-dom';
import styles from './Login.module.css'
import { useState, useEffect } from 'react';
import icon from '../../UI/images/imagen2.png'


const Login = () => {
  // State for managing user input (email & password)
  const [data, setData] = useState({
    email: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const signed = localStorage.getItem("token");
  const navigate = useNavigate();

  // Redirect to dashboard if the user is already logged in
  useEffect(() => {
    if (signed !== null) {
      navigate('/dashboard');
    }
  }, []);

  // Handle input changes and update state
  const handleChange = (event) => {
    const { name, value } = event.target;
    setData({...data, [name]: value});
  }

  // Handle form submission and authenticate user
  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      // Send login request to backend API
      const response = await fetch(
        'http://localhost:8080/system/api/v1/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        });

        const token = response.headers.get('Authorization');
        
        if (token) {
          const responseData = await response.json();

          localStorage.setItem('token', token);
          localStorage.setItem('user', JSON.stringify(responseData));
          navigate('/dashboard');
        } else {
          alert('Login unsuccessful...');
        }
    } catch (error) {
      console.error('Error:', error);
      alert('Error connecting to the server');
    } finally {
      setIsLoading(false);
    }
  }

  return(
    <>
      {/* Home button with image leading back to homepage */}
      <div className={styles.homeBtn}><img className={styles.homeBtnImg} src={icon} alt="home" onClick={()=>navigate('/home')} /></div>
      {/* Display login form when not loading */}
      {!isLoading &&
      <div className={styles.mainContainer}>
        <div className={styles.subContainer}>
          <h2 className={styles.subContainerH2}> Login!!</h2>
          <form onSubmit={handleSubmit} className={styles.subContainerForm}>
            <div className={styles.inputs}>
              {/* Email input field */}
              <label className={styles.inputsLabel} htmlFor='email' >Email</label>
              <input type="text" className={styles.inputsInput} id='email' name="email" value={data.email} placeholder='email@email.com...' onChange={handleChange} />

              {/* Password input field */}
              <label className={styles.inputsLabel} htmlFor='password' >Password</label>
              <input type="password" className={styles.inputsInput} id='password' name="password" value={data.password} placeholder='password...' onChange={handleChange} />
            </div>
            <button className={styles.subContainerButton}>Sign in!</button>
          </form>
        </div>
        {/* Redirect link for new users */}
        <p className={styles.linkContainer}>New here? <Link to={'/register'} className={styles.linkLogin}>Create account!</Link></p>
      </div>
      }
      {/* Show loading message while processing login */}
      {isLoading && <div>Loading...</div>}
    </>
  );
};

export default Login;