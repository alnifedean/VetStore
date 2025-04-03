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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Previene el comportamiento predeterminado del formulario

    try {
      const response = await fetch('http://localhost:8080/system/api/v1/user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Usuario registrado:', data);
        alert('Usuario registrado con éxito');
      } else {
        console.error('Error al registrar usuario');
        alert('Hubo un error al registrar el usuario');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error al conectar con el servidor');
    }
  };


  return (
    <form className={styles.mainContainer} onSubmit={handleSubmit}>
      <div className={styles.titleContainer}>
        <h2>Register</h2>
      </div>
      <div className={styles.formContainer}>
        <label>Name</label>
        <input type="text" name="firstName" placeholder="Jane..." value={formData.firstName} onChange={handleChange} />

        <label>Last name</label>
        <input type="text" name="lastName" placeholder="Doe..." value={formData.lastName} onChange={handleChange} />

        <label>Email</label>
        <input type="email" name="email" placeholder="email@email.com..." value={formData.email} onChange={handleChange} />

        <label>Phone</label>
        <input type="number" name="phone" placeholder="987-654-3210..." value={formData.phone} onChange={handleChange} />

        <label>Password</label>
        <input type="password" name="password" placeholder="Password..." value={formData.password} onChange={handleChange} />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default Register;
