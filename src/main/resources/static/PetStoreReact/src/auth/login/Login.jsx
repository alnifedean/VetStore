import { Link } from 'react-router-dom';
import styles from './Login.module.css'

const Login = () => {

  return(
    <div className={styles.mainContainer}>
      <div className={styles.subContainer}>
        <h2 className={styles.subContainerH2}> Sign In</h2>
        <div className={styles.inputs}>
          <label>Email</label>
          <input type="text" className={styles.inputsInput} placeholder='email@email.com...' />

          <label>Password</label>
          <input type="password" className={styles.inputsInput} placeholder='password...' />
        </div>
        <button className={styles.subContainerButton}>Log in!</button>
      </div>
      <p>New here? <Link to={'/register'} className={styles.mainContanierA}>Create account!</Link></p>
    </div>
  );
};

export default Login;