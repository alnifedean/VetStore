import { Route, Routes } from 'react-router-dom'
import styles from './HomeContainer.module.css'
import Home from './components/Home';
import Navigation from './header/Navigation';
import Services from './components/Services';
import Gallery from './components/Gallery';
import Contact from './components/Contact';
import Dashboard from './dashboard/Dashboard';
import Training from './components/services/Training';
import Equipment from './components/services/Equipment';
import Vet from './components/services/Vet';
import Hotel from './components/services/Hotel'
import Food from './components/Services/Food'
import DayCare from './components/Services/DayCare'
import Classes from './components/Services/Classes'


const HomeContainer = () =>{
  return(
    <div className={styles.mainContainer}>
      <Navigation />
      <div className={styles.routesContainer}>
        <Routes>
          <Route path='/home' element={<Home />} />
          <Route path='/' element={<Home />} />
          <Route path='/gallery' element={<Gallery />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path="/services" element={<Services />} />

          <Route path='/equipment' element={<Equipment />} />
          <Route path='/training' element={<Training />} />
          <Route path='/vet' element={<Vet />} />
          <Route path='/hotel' element={<Hotel />} />
          <Route path='/food' element={<Food />} />
          <Route path='/dayCare' element={<DayCare />} />
          <Route path='/classes' element={<Classes />} />
        </Routes>
      </div>
    </div>
  )
}

export default HomeContainer;