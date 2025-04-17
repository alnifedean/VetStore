import { Route, Routes } from 'react-router-dom'
import styles from './HomeContainer.module.css'
import Home from './components/Home';
import Navigation from './header/Navigation';


const HomeContainer = () =>{
  return(
    <div className={styles.mainContainer}>
      <Navigation />
      <div className={styles.routesContainer}>
        <Routes>
          <Route path='home' element={<Home />}/>
        </Routes>
      </div>
    </div>
  )
}

export default HomeContainer;