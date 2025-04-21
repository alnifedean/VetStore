import { Link, useNavigate } from 'react-router-dom';
import styles from './Login.module.css'
import { useState } from 'react';

const Login = () => {

  const [data, setData] = useState({
    email: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setData({...data, [name]: value});
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch(
        'http://localhost:8080/system/api/v1/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        });

        if (response.ok) {
          const responseData = await response.json();

          localStorage.setItem('token', responseData.token);
          localStorage.setItem('user', JSON.stringify(responseData.user));

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
      {!isLoading &&
      <div className={styles.mainContainer}>
        <div className={styles.subContainer}>
          <h2 className={styles.subContainerH2}> Sign In</h2>
          <form onSubmit={handleSubmit}>
            <div className={styles.inputs}>
              <label>Email</label>
              <input type="text" className={styles.inputsInput} name="email" value={data.email} placeholder='email@email.com...' onChange={handleChange} />

              <label>Password</label>
              <input type="password" className={styles.inputsInput} name="password" value={data.password} placeholder='password...' onChange={handleChange} />
            </div>
            <button className={styles.subContainerButton}>Log in!</button>
          </form>
        </div>
        <p>New here? <Link to={'/register'} className={styles.mainContanierA}>Create account!</Link></p>
      </div>
      }
      {isLoading && <div>Loading...</div>}
    </>
  );
};

export default Login;