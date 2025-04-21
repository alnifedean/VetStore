import adi from '../UI/images/pictures/adiestramiento.png'
import guard from '../UI/images/pictures/escritorioCachorro.png'
import clas from '../UI/images/pictures/claseGente.png'
import hotel from '../UI/images/pictures/hotel.png'
import cupi from '../UI/images/pictures/cupido.png'
import food from '../UI/images/pictures/alimento.png'
import equi from '../UI/images/pictures/articulos.png'
import vet from '../UI/images/pictures/vet.png'
import styles from './Modal.module.css';
import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';

const Modal = ({ onConfirm, service }) => {
  return (
    <>
      {createPortal(<ModalOverlay onConfirm={onConfirm} service={service} />,
      document.getElementById('modal-root'))}

      {createPortal(<Backdrop onConfirm={onConfirm} />,
      document.getElementById('backdrop-root'))}
    </>
    
  );
};

const Backdrop = ({ onConfirm }) =>{
  return<div className={styles.backdrop} onClick={onConfirm}></div>;
};

const ModalOverlay = ({ onConfirm, service }) =>{

  if (service==='Adiestramiento') {
    return(
      <div className={styles.serviceRows} style={{backgroundColor: '#7fb3d5'}}>
        <div className={styles.serviceRowImg}><img className={styles.serviceRowImgInt} src={adi} alt="Perrito siendo adiestrado" /></div>
        <div className={styles.serviceRowTxt}>
          <h2>Adiestramiento</h2>
          <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ducimus nesciunt explicabo officiis fuga magnam, enim corrupti ut amet magni maiores fugit? Cumque optio minima alias eos earum officia enim aspernatur.</p>
          <div className={styles.serviceRowBtns}>
            <button onClick={onConfirm}>Cerrar</button>
            <button>Ver mas!</button>
          </div>
        </div>
      </div>
    )
  } else if (service==='Guarderia'){
    return(
      <div className={styles.serviceRows} style={{backgroundColor: '#f1948a'}}>
        <div className={styles.serviceRowImg}><img className={styles.serviceRowImgInt} src={guard} alt="Perrito en guarderia" /></div>
        <div className={styles.serviceRowTxt}>
          <h2>Guarderia</h2>
          <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ducimus nesciunt explicabo officiis fuga magnam, enim corrupti ut amet magni maiores fugit? Cumque optio minima alias eos earum officia enim aspernatur.</p>
          <div className={styles.serviceRowBtns}>
            <button onClick={onConfirm}>Cerrar</button>
            <button>Ver mas!</button>
          </div>
        </div>
      </div>
    )
  } else if (service==='Clases'){
    return(
      <div className={styles.serviceRows} style={{backgroundColor: '#f9e79f'}}>
        <div className={styles.serviceRowImg}><img className={styles.serviceRowImgInt} src={clas} alt="imagen con perritos en clase" /></div>
        <div className={styles.serviceRowTxt}>
          <h2>Clases</h2>
          <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ducimus nesciunt explicabo officiis fuga magnam, enim corrupti ut amet magni maiores fugit? Cumque optio minima alias eos earum officia enim aspernatur.</p>
          <div className={styles.serviceRowBtns}>
            <button onClick={onConfirm}>Cerrar</button>
            <button>Ver mas!</button>
          </div>
        </div>
      </div>
    )
  } else if (service==='Hotel'){
    return(
      <div className={styles.serviceRows} style={{backgroundColor: '#82e0aa'}}>
        <div className={styles.serviceRowImg}><img className={styles.serviceRowImgInt} src={hotel} alt="Perrito durmiendo en hotel perruno" /></div>
        <div className={styles.serviceRowTxt}>
          <h2>Hotel perruno</h2>
          <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ducimus nesciunt explicabo officiis fuga magnam, enim corrupti ut amet magni maiores fugit? Cumque optio minima alias eos earum officia enim aspernatur.</p>
          <div className={styles.serviceRowBtns}>
            <button onClick={onConfirm}>Cerrar</button>
            <button>Ver mas!</button>
          </div>
        </div>
      </div>
    )
  } else if (service==='Cupido'){
    return(
      <div className={styles.serviceRows} style={{backgroundColor: '#c39bd3'}}>
        <div className={styles.serviceRowImg}><img className={styles.serviceRowImgInt} src={cupi} alt="Imagen de dos perritos que se aman" /></div>
        <div className={styles.serviceRowTxt}>
          <h2>Cupido</h2>
          <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ducimus nesciunt explicabo officiis fuga magnam, enim corrupti ut amet magni maiores fugit? Cumque optio minima alias eos earum officia enim aspernatur.</p>
          <div className={styles.serviceRowBtns}>
            <button onClick={onConfirm}>Cerrar</button>
            <button>Ver mas!</button>
          </div>
        </div>
      </div>
    )
  } else if (service==='Alimento'){
    return(
      <div className={styles.serviceRows} style={{backgroundColor: '#eb984e'}}>
        <div className={styles.serviceRowImg}><img className={styles.serviceRowImgInt} src={food} alt="comida organica barf" /></div>
        <div className={styles.serviceRowTxt}>
          <h2>Alimento</h2>
          <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ducimus nesciunt explicabo officiis fuga magnam, enim corrupti ut amet magni maiores fugit? Cumque optio minima alias eos earum officia enim aspernatur.</p>
          <div className={styles.serviceRowBtns}>
            <button onClick={onConfirm}>Cerrar</button>
            <button>Ver mas!</button>
          </div>
        </div>
      </div>
    )
  } else if (service==='Equipo'){
    return(
      <div className={styles.serviceRows} style={{backgroundColor: '#85c1e9'}}>
        <div className={styles.serviceRowImg}><img className={styles.serviceRowImgInt} src={equi} alt="Equipo de entrenamiento" /></div>
        <div className={styles.serviceRowTxt}>
          <h2>Equipo</h2>
          <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ducimus nesciunt explicabo officiis fuga magnam, enim corrupti ut amet magni maiores fugit? Cumque optio minima alias eos earum officia enim aspernatur.</p>
          <div className={styles.serviceRowBtns}>
            <button onClick={onConfirm}>Cerrar</button>
            <Link className={styles.buttonSeeMore} to={'/equipment'}>Ver mas!</Link>
          </div>
        </div>
      </div>
    )
  } else if (service==='Vet'){
    return(
      <div className={styles.serviceRows} style={{backgroundColor: '#48c9b0'}}>
        <div className={styles.serviceRowImg}><img className={styles.serviceRowImgInt} src={vet} alt="Perrito feliz en veterinaria" /></div>
        <div className={styles.serviceRowTxt}>
          <h2>Veterinario</h2>
          <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ducimus nesciunt explicabo officiis fuga magnam, enim corrupti ut amet magni maiores fugit? Cumque optio minima alias eos earum officia enim aspernatur.</p>
          <div className={styles.serviceRowBtns}>
            <button onClick={onConfirm}>Cerrar</button>
            <button>Ver mas!</button>
          </div>
        </div>
      </div>
    )
  }

}




export default Modal;