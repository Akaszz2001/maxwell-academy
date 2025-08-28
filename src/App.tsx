import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './index.css'

import LandingPage from './pages/LandingPage'
import Login from './pages/auth/Login'
import RequireAuth from './components/RequireAuth'

import StudentSignup from './pages/auth/StudentSignup'
import CreateFacultyPage from './pages/admin/CreateFaculty'
import Unauthorized from './components/Unauthorzed'
import StudentDashboard from './pages/student/StudentDashboard'
import AdminDashboard from './pages/admin/AdminDashboard'
import FacultyDashboard from './pages/faculty/FacultyDashboard'
import CreateExam from './pages/faculty/CreateExam'
import AddQuestions from './pages/faculty/AddQuestions'
import ExamWindow from './pages/student/ExamWindow'
import ExamList from './pages/student/ExamList'

function App() {

  return (
 
    <Routes>
      <Route path='/' element={<LandingPage />} />
      <Route path="/unauthorized" element={<Unauthorized />} />
      <Route path='/login' element={<Login />} />
      <Route path='/signup' element={<StudentSignup />} />


  //student routes
      <Route path='/student/dashboard' element={<RequireAuth role='student'><StudentDashboard /></RequireAuth>} />
      <Route path='/student/dashboard/allExams' element={<RequireAuth role='student'><ExamList/></RequireAuth>} />
      <Route path='/student/dashboard/allExams/:examId' element={<RequireAuth role='student'><ExamWindow/></RequireAuth>} />


  //admin routes
      <Route path="/admin/dashboard" element={<RequireAuth role='admin'><AdminDashboard /></RequireAuth>} />
      <Route path='/admin/createFaculty' element={<RequireAuth role='admin'><CreateFacultyPage /></RequireAuth>} />


  //faculty routes
      <Route path="/faculty/dashboard" element={<RequireAuth role='faculty'><FacultyDashboard /></RequireAuth>} />
      <Route path="/faculty/dashboard/createExam" element={<RequireAuth role='faculty'><CreateExam /></RequireAuth>} />
      <Route path="/faculty/dashboard/exams/:examId/questions/add" element={<RequireAuth role="faculty"><AddQuestions/></RequireAuth>}/>

    </Routes>
  )
}

export default App
