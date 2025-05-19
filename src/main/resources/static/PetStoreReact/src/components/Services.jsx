import styles from './Services.module.css'
import adi from '../UI/images/pictures/adiestramiento.png'
import guard from '../UI/images/pictures/escritorioCachorro.png'
import clas from '../UI/images/pictures/claseGente.png'
import hotel from '../UI/images/pictures/hotel.png'
import cupi from '../UI/images/pictures/cupido.png'
import food from '../UI/images/pictures/alimento.png'
import equi from '../UI/images/pictures/articulos.png'
import vet from '../UI/images/pictures/vet.png'
import Modal from '../UI/Modal'
import { useState, useEffect } from 'react';


const Services = () => {
  const servicesList = [
    {"id":1, "title":"Training", "image":adi, "color":'#7fb3d5', "nav":'/training', "text": "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ducimus nesciunt explicabo officiis fuga magnam, enim corrupti ut amet magni maiores fugit? Cumque optio minima alias eos earum officia enim aspernatur." },
    {"id":2, "title":"DayCare", "image":guard, "color":'#f1948a', "nav":'/dayCare',"text": "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ducimus nesciunt explicabo officiis fuga magnam, enim corrupti ut amet magni maiores fugit? Cumque optio minima alias eos earum officia enim aspernatur." },
    {"id":3, "title":"Classes", "image":clas, "color":'#f9e79f', "nav":'/classes',"text": "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ducimus nesciunt explicabo officiis fuga magnam, enim corrupti ut amet magni maiores fugit? Cumque optio minima alias eos earum officia enim aspernatur." },
    {"id":4, "title":"Hotel", "image":hotel, "color":'#82e0aa', "nav":'/hotel',"text": "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ducimus nesciunt explicabo officiis fuga magnam, enim corrupti ut amet magni maiores fugit? Cumque optio minima alias eos earum officia enim aspernatur." },
    {"id":5, "title":"Cupid", "image":cupi, "color":'#c39bd3', "nav":'/love',"text": "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ducimus nesciunt explicabo officiis fuga magnam, enim corrupti ut amet magni maiores fugit? Cumque optio minima alias eos earum officia enim aspernatur." },
    {"id":6, "title":"Food", "image":food, "color":'#eb984e', "nav":'/food',"text": "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ducimus nesciunt explicabo officiis fuga magnam, enim corrupti ut amet magni maiores fugit? Cumque optio minima alias eos earum officia enim aspernatur." },
    {"id":7, "title":"Equipment", "image":equi, "color":'#85c1e9', "nav":'/equipment',"text": "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ducimus nesciunt explicabo officiis fuga magnam, enim corrupti ut amet magni maiores fugit? Cumque optio minima alias eos earum officia enim aspernatur." },
    {"id":8, "title":"Veterinary", "image":vet, "color":'#48c9b0', "nav":'/vet',"text": "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ducimus nesciunt explicabo officiis fuga magnam, enim corrupti ut amet magni maiores fugit? Cumque optio minima alias eos earum officia enim aspernatur." },
  ];
  const [openService, setOpenService] = useState(null);
  const [service, setService] = useState(null);

  const modalHandler = (element) =>{
    setOpenService('onConfirm')
    setService(element);
  };

  const closeModal = () =>{
    setOpenService(null)
  };

  useEffect(() => {
      window.scrollTo(0, 0);
  }, []);

  return(
    <>
      <div className={styles.servicesContainer}>
        {servicesList.map((element)=>(
          <div className={styles.serviceRows} style={{backgroundColor: element.color}} onClick={() => modalHandler(element)} >
            <div className={styles.serviceRowImg}><img className={styles.serviceRowImgInt} src={element.image} alt="service image" /></div>
            <div className={styles.serviceRowTxt}>
              <h2>{element.title}</h2>
              <p className={styles.serviceTxtP}>{element.text}</p>
            </div>
          </div>
        ))}

      </div>

      {openService && <Modal onConfirm={closeModal} service={service} />}
    </>
  )
}

export default Services;