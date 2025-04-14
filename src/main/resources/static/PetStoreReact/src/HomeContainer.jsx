import { Route, Routes } from 'react-router-dom'
import Home from './components/Home';
import Navigation from './header/Navigation';

const HomeContainer = () =>{
  return(
    <div>
      <Navigation />
      <Routes>
        <Route path='home' element={<Home />}/>
      </Routes>
    </div>
  )
}

export default HomeContainer;