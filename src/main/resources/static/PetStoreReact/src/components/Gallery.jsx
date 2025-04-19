import styles from './Gallery.module.css'
import { useState } from 'react';
import guard from '../UI/images/pictures/escritorioCachorro.png'
import adi from '../UI/images/pictures/adiestramiento.png'
import clas from '../UI/images/pictures/claseGente.png'
import hotel from '../UI/images/pictures/hotel.png'
import cupi from '../UI/images/pictures/cupido.png'
import food from '../UI/images/pictures/alimento.png'
import equi from '../UI/images/pictures/articulos.png'
import vet from '../UI/images/pictures/vet.png'

const Gallery = () => {

  const [data, setData] = useState('');

  const handleImageClick = (event) => {
    const src = event.target.src;
    setData(src);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return(
    data===''? (<div className={styles.mainContainer} >
      <div className={styles.row}>
        <div className={styles.imageContainer}><img className={styles.image} src={guard} onClick={handleImageClick} /></div>
        <div className={styles.imageContainer}><img className={styles.image} src={adi} onClick={handleImageClick} /></div>
        <div className={styles.imageContainer}><img className={styles.image} src={clas} onClick={handleImageClick} /></div>
      </div>

      <div className={styles.row}>
        <div className={styles.imageContainer}><img className={styles.image} src={hotel} onClick={handleImageClick} /></div>
        <div className={styles.imageContainer}><img className={styles.image} src={cupi} onClick={handleImageClick} /></div>
        <div className={styles.imageContainer}><img className={styles.image} src={food} onClick={handleImageClick} /></div>
      </div>

      <div className={styles.row}>
        <div className={styles.imageContainer}><img className={styles.image} src={equi} onClick={handleImageClick} /></div>
        <div className={styles.imageContainer}><img className={styles.image} src={vet} onClick={handleImageClick} /></div>
        <div className={styles.imageContainer}><img className={styles.image} src={guard} onClick={handleImageClick} /></div>
      </div>

      <div className={styles.row}>
        <div className={styles.imageContainer}><img className={styles.image} src={adi} onClick={handleImageClick} /></div>
        <div className={styles.imageContainer}><img className={styles.image} src={clas} onClick={handleImageClick} /></div>
        <div className={styles.imageContainer}><img className={styles.image} src={hotel} onClick={handleImageClick} /></div>
      </div>
      
    </div>):(
      <div className={styles.singleImageContainer}>
      <button className={styles.buttonClose} onClick={()=>{setData(''), window.scrollTo({ top: 0, behavior: 'smooth' });}}>X</button>
      <img className={styles.singleImage} src={data} alt="Imagen seleccionada" />
    </div>
    )
  )
};
export default Gallery;