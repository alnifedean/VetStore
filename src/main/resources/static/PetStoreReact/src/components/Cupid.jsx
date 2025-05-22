import styles from './Cupid.module.css'
import icon from '../UI/images/imagen2.png'
import image1 from '../UI/images/pictures/vet.png'
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import ModalLove from '../UI/ModalLove'

const Cupid = () => {

  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState();

  // List of available pets for matchmaking
  const petsList = [
    {'id':1,'name': 'Pelos', 'age': 5, 'breed': 'Mix', 'boyGirl': 'boy', 'text': 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores eos perspiciatis aliquid dolor est laudantium veritatis suscipit! Mollitia porro enim obcaecati suscipit, iste optio vel, assumenda odit, eos aperiam possimus!'},
    {'id':2,'name': 'Burbuja', 'age': 3, 'breed': 'dutch shepherd', 'boyGirl': 'girl', 'text': 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores eos perspiciatis aliquid dolor est laudantium veritatis suscipit! Mollitia porro enim obcaecati suscipit, iste optio vel, assumenda odit, eos aperiam possimus!'},
    {'id':3,'name': 'Maximus', 'age': 6, 'breed': 'rottweilers', 'boyGirl': 'boy', 'text': 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores eos perspiciatis aliquid dolor est laudantium veritatis suscipit! Mollitia porro enim obcaecati suscipit, iste optio vel, assumenda odit, eos aperiam possimus!'},
    {'id':4,'name': 'Cow', 'age': 4, 'breed': 'Mix', 'boyGirl': 'girl', 'text': 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores eos perspiciatis aliquid dolor est laudantium veritatis suscipit! Mollitia porro enim obcaecati suscipit, iste optio vel, assumenda odit, eos aperiam possimus!'},
    {'id':5,'name': 'Pelusa', 'age': 1, 'breed': 'Bull', 'boyGirl': 'boy', 'text': 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores eos perspiciatis aliquid dolor est laudantium veritatis suscipit! Mollitia porro enim obcaecati suscipit, iste optio vel, assumenda odit, eos aperiam possimus!'},
    {'id':6,'name': 'Patas', 'age': 7, 'breed': 'French Bulldog', 'boyGirl': 'girl', 'text': 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores eos perspiciatis aliquid dolor est laudantium veritatis suscipit! Mollitia porro enim obcaecati suscipit, iste optio vel, assumenda odit, eos aperiam possimus!'},
    {'id':7,'name': 'Solovino', 'age': 2, 'breed': 'Mix', 'boyGirl': 'boy', 'text': 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores eos perspiciatis aliquid dolor est laudantium veritatis suscipit! Mollitia porro enim obcaecati suscipit, iste optio vel, assumenda odit, eos aperiam possimus!'},
    {'id':8,'name': 'Rana', 'age': 12, 'breed': 'Cane Corso', 'boyGirl': 'girl', 'text': 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores eos perspiciatis aliquid dolor est laudantium veritatis suscipit! Mollitia porro enim obcaecati suscipit, iste optio vel, assumenda odit, eos aperiam possimus!'},
    {'id':9,'name': 'Rocky', 'age': 9, 'breed': 'Tosa Inu', 'boyGirl': 'boy', 'text': 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores eos perspiciatis aliquid dolor est laudantium veritatis suscipit! Mollitia porro enim obcaecati suscipit, iste optio vel, assumenda odit, eos aperiam possimus!'},
    {'id':10,'name': 'Tamal', 'age': 10, 'breed': 'Mix', 'boyGirl': 'girl', 'text': 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores eos perspiciatis aliquid dolor est laudantium veritatis suscipit! Mollitia porro enim obcaecati suscipit, iste optio vel, assumenda odit, eos aperiam possimus!'},
    {'id':11,'name': 'Kira', 'age': 8, 'breed': 'Husky', 'boyGirl': 'boy', 'text': 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores eos perspiciatis aliquid dolor est laudantium veritatis suscipit! Mollitia porro enim obcaecati suscipit, iste optio vel, assumenda odit, eos aperiam possimus!'},
    {'id':12,'name': 'Toby', 'age': 11, 'breed': 'puddle', 'boyGirl': 'girl', 'text': 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores eos perspiciatis aliquid dolor est laudantium veritatis suscipit! Mollitia porro enim obcaecati suscipit, iste optio vel, assumenda odit, eos aperiam possimus!'},
  ];

  // Open modal and pass selected pet data
  const openModal = (element) => {
    setIsOpen(true)
    setData(element)
  }
  // Close modal
  const closeModal = () => {
    setIsOpen(false);
  }

  // Scroll to top when the component mounts
  useEffect(() => {
      window.scrollTo(0, 0);
  }, []);

  return(
    <>
      {/* Home button leading back to homepage */}
      <div className={styles.homeBtn}><img className={styles.homeBtnImg} src={icon} alt="home" onClick={()=>navigate('/home')} /></div>
      <div className={styles.mainContainer}>
        <h2 className={styles.title}>Is your pup searching for a soulmate? </h2>
        <div className={styles.box}>

          {/* Display available pets */}
          {petsList.map((element) => (
            <div key={element.id} className={styles.imageContainer} onClick={()=>openModal(element)}>
              <img src={image1} alt="pet image" className={styles.image} />
              <p className={styles.imageTxt}>{element.name}</p>
            </div>
          ))}

        </div>
      </div>
      {/* Modal for pet matchmaking details */}
      {isOpen && <ModalLove onConfirm={closeModal} onData={data} />}
    </>
  )
}

export default Cupid;