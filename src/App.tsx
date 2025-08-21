import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './index.css'

import Admin from './pages/admin/Admin'
import LandingPage from './pages/LandingPage'
import Login from './pages/auth/Login'
import RequireAuth from './components/RequireAuth'
import Student from './pages/student/Student'
import StudentSignup from './pages/auth/StudentSignup'

function App() {
  
  return (
<Routes>
  <Route path='/' element={<RequireAuth><LandingPage/></RequireAuth>}/>
  <Route path='/login' element={<Login/>}/>
  <Route path='/signup' element={<StudentSignup/>}/>
  <Route path="/admin"  element={<RequireAuth><Admin/></RequireAuth>}  />
  <Route path='/student'  element={<RequireAuth><Student/></RequireAuth>}  />
</Routes>
  )
}

export default App
