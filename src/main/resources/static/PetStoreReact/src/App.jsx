import { Route, Routes } from 'react-router-dom'
import './App.css'
import Login from './auth/login/Login'
import Register from './auth/register/Register'
import HomeContainer from './HomeContainer'

function App() {
  return (
    <div>
      <Routes>
        <Route path='*' element={<HomeContainer />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
      </Routes>
    </div>
  )
}

export default App
