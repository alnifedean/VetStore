import { Route, Routes } from 'react-router-dom'
import styles from './HomeContainer.module.css'
import Home from './components/Home';
import Navigation from './header/Navigation';
import Services from './components/Services';
import Gallery from './components/Gallery';
import Contact from './components/Contact';


const HomeContainer = () =>{
  return(
    <div className={styles.mainContainer}>
      <Navigation />
      <div className={styles.routesContainer}>
        <Routes>
          <Route path='/home' element={<Home />}/>
          <Route path='/' element={<Home />}/>
          <Route path='/services' element={<Services />}/>
          <Route path='/gallery' element={<Gallery />}/>
          <Route path='/contact' element={<Contact />}/>
        </Routes>
      </div>
    </div>
  )
}

export default HomeContainer;