import { Route, Routes } from 'react-router-dom'
import styles from './HomeContainer.module.css'
import Home from './components/Home';
import Navigation from './header/Navigation';
import Services from './components/Services';


const HomeContainer = () =>{
  return(
    <div className={styles.mainContainer}>
      <Navigation />
      <div className={styles.routesContainer}>
        <Routes>
          <Route path='home' element={<Home />}/>
          <Route path='services' element={<Services />}/>
        </Routes>
      </div>
    </div>
  )
}

export default HomeContainer;