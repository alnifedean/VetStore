import { Route, Routes } from 'react-router-dom'
import './App.css'
import Login from './auth/login/Login'
import Register from './auth/register/Register'
import HomeContainer from './HomeContainer'
import Cupid from './components/Cupid'
import SettingsUser from './auth/userSettings/SettingsUser'

// Main application component that defines the routing structure
function App() {
  return (
    <div>
      <Routes>
        {/* Default route, redirects all unmatched paths to HomeContainer */}
        <Route path='*' element={<HomeContainer />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/love' element={<Cupid />} />
        <Route path='/settings' element={<SettingsUser />} />
      </Routes>
    </div>
  )
}

export default App
