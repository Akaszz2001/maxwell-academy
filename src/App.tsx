// import { BrowserRouter, Route, Routes } from 'react-router-dom'
// import './index.css'

// import LandingPage from './pages/LandingPage'
// import Login from './pages/auth/Login'
// import RequireAuth from './components/RequireAuth'

// import StudentSignup from './pages/auth/StudentSignup'
// import CreateFacultyPage from './pages/admin/CreateFaculty'
// import Unauthorized from './components/Unauthorzed'
// import StudentDashboard from './pages/student/StudentDashboard'
// import AdminDashboard from './pages/admin/AdminDashboard'
// import FacultyDashboard from './pages/faculty/FacultyDashboard'
// import CreateExam from './pages/faculty/CreateExam'
// import AddQuestions from './pages/faculty/AddQuestions'
// import ExamWindow from './pages/student/ExamWindow'
// import ExamList from './pages/student/ExamList'
// import FacultyExams from './pages/faculty/FacultyExans'
// import EditQuestions from './pages/faculty/EditQuestions'
// import ExamResults from './pages/student/ExamResults'
// import ExamReview from './pages/student/ExamReview'
// import StudentResults from './pages/faculty/StudentResults'
// import AttendedStudentsList from './pages/faculty/AttendedStudentsList'
// import StudentExamResults from './pages/faculty/StudentExamResults'
// function App() {

//   return (
//  <div className="pt-20">
//     <Routes>
//       <Route path='/' element={<LandingPage />} />
//       <Route path="/unauthorized" element={<Unauthorized />} />
//       <Route path='/login' element={<Login />} />
//       <Route path='/signup' element={<StudentSignup />} />

//   //student routes
//       <Route path='/student/dashboard' element={<RequireAuth role='student'><StudentDashboard /></RequireAuth>} />
//       <Route path='/student/dashboard/allExams' element={<RequireAuth role='student'><ExamList/></RequireAuth>} />
//       <Route path='/student/dashboard/allExams/:examId' element={<RequireAuth role='student'><ExamWindow/></RequireAuth>} />
//       <Route path='/student/dashboard/attendedExams' element={<RequireAuth role='student'><ExamResults/></RequireAuth>} />
//       <Route path='/student/dashboard/attendedExams/:examId' element={<RequireAuth role='student'><ExamReview/></RequireAuth>} />

//   //admin routes
//       <Route path="/admin/dashboard" element={<RequireAuth role='admin'><AdminDashboard /></RequireAuth>} />
//       <Route path='/admin/createFaculty' element={<RequireAuth role='admin'><CreateFacultyPage /></RequireAuth>} />

//   //faculty routes
//       <Route path="/faculty/dashboard" element={<RequireAuth role='faculty'><FacultyDashboard /></RequireAuth>} />
//       <Route path="/faculty/dashboard/createExam" element={<RequireAuth role='faculty'><CreateExam /></RequireAuth>} />
//       <Route path="/faculty/dashboard/myExams" element={<RequireAuth role='faculty'><FacultyExams /></RequireAuth>} />

//       <Route path="/faculty/dashboard/exams/:examId/questions/add" element={<RequireAuth role="faculty"><AddQuestions/></RequireAuth>}/>
//        <Route path="/faculty/dashboard/exams/:examId/edit" element={<RequireAuth role='faculty'><CreateExam /></RequireAuth>} />
//            <Route path="/faculty/dashboard/exams/:examId/questions" element={<RequireAuth><EditQuestions /></RequireAuth>} />
//            <Route path="/faculty/dashboard/studentResults" element={<RequireAuth><StudentResults/></RequireAuth>} />
//            <Route path="/faculty/dashboard/studentResults/:examId/studentList" element={<RequireAuth><AttendedStudentsList/></RequireAuth>} />
//            <Route path="/faculty/dashboard/studentResults/:examId/studentList/:studentId" element={<RequireAuth><StudentExamResults/></RequireAuth>} />

//     </Routes>
//     </div>
//   )
// }

// export default App
import { Route, Routes, useLocation } from "react-router-dom";
import "./index.css";

import LandingPage from "./pages/LandingPage";
import Login from "./pages/auth/Login";
import RequireAuth from "./components/RequireAuth";

import StudentSignup from "./pages/auth/StudentSignup";
import CreateFacultyPage from "./pages/admin/CreateFaculty";
import Unauthorized from "./components/Unauthorzed";

import CreateExam from "./pages/faculty/CreateExam";
import AddQuestions from "./pages/faculty/AddQuestions";
import ExamWindow from "./pages/student/ExamWindow";
import ExamList from "./pages/student/ExamList";
import FacultyExams from "./pages/faculty/FacultyExans";
import EditQuestions from "./pages/faculty/EditQuestions";
import ExamResults from "./pages/student/ExamResults";
import ExamReview from "./pages/student/ExamReview";
import StudentResults from "./pages/faculty/StudentResults";
import AttendedStudentsList from "./pages/faculty/AttendedStudentsList";
import StudentExamResults from "./pages/faculty/StudentExamResults";

import Navbar from "./assets/Navbar";
import StudentLayout from "./pages/student/StudentLayout";
import FacultyLayout from "./pages/faculty/FacultyLayout";
import Questions from "./pages/admin/Questions";
import AdminLayout from "./pages/admin/AdminLayout";
import CredentialShowing from "./pages/admin/CredentialShowing";
import AnnouncementForm from "./pages/admin/Announcements";
import AnnouncementList from "./pages/AnnouncementList";
import AnnouncementDetail from "./pages/AnnouncementDetail";
import AboutUs from "./pages/ContactUs";
import EventForm from "./pages/admin/EventForm";
import EventsGallery from "./pages/admin/EventList";
import FacultyGallery from "./pages/admin/FaculltyGallery";
import FacultyGalleryList from "./pages/admin/FacultyGalleryList";
import PerformerForm from "./pages/admin/Performance";
import PerformersList from "./pages/admin/PerformersList";
import TopPerformers from "./pages/TopTopPerformers";
import UserAttemptedExams from "./pages/admin/UserAttemptedExams";
const noNavbarPatterns: RegExp[] = [
  /^\/student\/dashboard\/?$/, 
  
    /^\/admin\/dashboard\/createAnnouncement\/?$/,// student dashboard exact

  /^\/admin\/dashboard\/?$/, // student dashboard exact
   /^\/admin\/dashboard\/addEvent\/?$/, // student dashboard exact
   /^\/admin\/dashboard\/eventList\/?$/, // student dashboard exact
   /^\/admin\/dashboard\/eventList\/w+$/, 
   /^\/student\/dashboard\/announcements\/\w+$/, 
   /^\/faculty\/dashboard\/announcements\/\w+$/, 
   
   // student dashboard exact
    // student dashboard exact
  /^\/student\/dashboard\/allExams\/?$/, // allExams list
  /^\/admin\/dashboard\/showcredential\/?$/, // allExams list
  /^\/admin\/dashboard\/editAnnouncement\/\w+$/, // allExams list
  /^\/admin\/dashboard\/editPerformer\/\w+$/, // allExams list
  /^\/admin\/dashboard\/createFacultyGallery\/\w+$/, // allExams list
  // allExams list
  /^\/admin\/dashboard\/showCredential\/?$/, // allExams list
  /^\/admin\/dashboard\/addQuestions\/?$/,

  /^\/admin\/dashboard\/addEvent\/\w+$/,
  /^\/admin\/dashboard\/userExams\/\w+$/,
  /^\/admin\/dashboard\/userExams\/\w+\/answers\/\w+$/,
  /^\/admin\/dashboard\/exams\/\w+\/edit$/,
  /^\/admin\/dashboard\/exams\/\w+\/questions$/,
 /^\/admin\/dashboard\/exams\/\w+\/questions\/add$/,





  /^\/student\/dashboard\/allExams\/\w+$/, // exam window (dynamic examId)
  /^\/student\/dashboard\/attendedExams\/\w+$/, // exam window (dynamic examId)
  /^\/faculty\/dashboard\/?$/,
  /^\/faculty\/dashboard\/exams\/\w+\/edit$/,
  /^\/faculty\/dashboard\/exams\/\w+\/questions\/add$/,
  /^\/faculty\/dashboard\/studentResults\/\w+\/studentList$/,
  /^\/faculty\/dashboard\/exams\/\w+\/questions$/,

  /^\/faculty\/dashboard\/studentResults\/\w+\/studentList\/\w+$/,
  // exam window (dynamic examId)
  // Add more patterns as needed
];

// Utility to check if current pathname matches a pattern

function App() {
  const location = useLocation();

  // Check if current path should hide Navbar
  const hideNavbar = noNavbarPatterns.some((pattern) =>
    pattern.test(location.pathname)
  );

  return (
    <div>
      {!hideNavbar && <Navbar />}
      <div className={!hideNavbar ? "pt-1" : ""}>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/aboutUs" element={<AboutUs />} />
          <Route path="/unauthorized" element={<Unauthorized />} />
          <Route path="/login" element={<Login />} />
          <Route path="/gallery" element={<EventsGallery />} />
          <Route path="/faculties" element={<FacultyGalleryList />} />
          <Route path="/topperformers" element={<TopPerformers />} />
          <Route path="/signup" element={<StudentSignup />} />
          <Route path="/signup/showcredential" element={<CredentialShowing/>} />

          {/* student routes */}
          <Route
            path="/student/dashboard"
            element={
              <RequireAuth roles={["student"]}>
                <StudentLayout />
              </RequireAuth>
            }
          />
          <Route
            path="/student/dashboard/allExams"
            element={
              <RequireAuth roles={["student"]}>
                <ExamList />
              </RequireAuth>
            }
          />
          <Route
            path="/student/dashboard/allExams/:examId"
            element={
              <RequireAuth roles={["student"]}>
                <ExamWindow />
              </RequireAuth>
            }
          />
          <Route
            path="/student/dashboard/attendedExams"
            element={
              <RequireAuth roles={["student"]}>
                <ExamResults />
              </RequireAuth>
            }
          />
          <Route
            path="/student/dashboard/attendedExams/:examId"
            element={
              <RequireAuth roles={["student"]}>
                <ExamReview />
              </RequireAuth>
            }
            />
      <Route
            path="/student/dashboard/announcements"
            element={
              <RequireAuth roles={["student"]}>
                <AnnouncementList />
              </RequireAuth>
            }
          />
          <Route
            path="/student/dashboard/announcements/:announceID"
            element={
              <RequireAuth roles={["student"]}>
                <AnnouncementDetail />
              </RequireAuth>
            }
          />


          {/* admin routes */}
          <Route
            path="/admin/dashboard"
            element={
              <RequireAuth roles={["admin"]}>
                <AdminLayout />
              </RequireAuth>
            }
          />
          <Route
            path="/admin/dashboard/createFaculty"
            element={
              <RequireAuth roles={["admin"]}>
                <CreateFacultyPage />
              </RequireAuth>
            }
          />
          <Route
          path="/admin/dashboard/addQuestions"
            element={
              <RequireAuth roles={["admin"]}>
                <Questions />
              </RequireAuth>
            }
          />

          <Route
            path="/admin/dashboard/createStudent"
            element={
              <RequireAuth roles={["admin"]}>
                <StudentSignup />
              </RequireAuth>
            }
          />
          <Route
            path="/admin/dashboard/showCredential"
            element={
              <RequireAuth roles={["admin"]}>
                <CredentialShowing />
              </RequireAuth>
            }
          />
          <Route
            path="/admin/dashboard/createAnnouncement"
            element={
              <RequireAuth roles={["admin"]}>
                <AnnouncementForm />
              </RequireAuth>
            }
          />
          <Route
            path="/admin/dashboard/editAnnouncement/:announceId"
            element={
              <RequireAuth roles={["admin"]}>
                <AnnouncementForm />
              </RequireAuth>
            }
          />


          <Route
            path="/admin/dashboard/addEvent/"
            element={
              <RequireAuth roles={["admin"]}>
                <EventForm />
              </RequireAuth>
            }
          />
          <Route
            path="/admin/dashboard/addEvent/:id"
            element={
              <RequireAuth roles={["admin"]}>
                <EventForm />
              </RequireAuth>
            }
          />
          <Route
            path="/admin/dashboard/eventList/"
            element={
              <RequireAuth roles={["admin"]}>
                <EventsGallery />
              </RequireAuth>
            }
          />

          <Route
            path="/admin/dashboard/createFacultyGallery/"
            element={
              <RequireAuth roles={["admin"]}>
                <FacultyGallery />
              </RequireAuth>
            }
          />
          <Route
            path="/admin/dashboard/createFacultyGallery/:id"
            element={
              <RequireAuth roles={["admin"]}>
                <FacultyGallery />
              </RequireAuth>
            }
          />
          <Route
            path="/admin/dashboard/facultyGalleryList/"
            element={
              <RequireAuth roles={["admin"]}>
                <FacultyGalleryList />
              </RequireAuth>
            }
          />
          <Route
            path="/admin/dashboard/createPerformer/"
            element={
              <RequireAuth roles={["admin"]}>
                <PerformerForm />
              </RequireAuth>
            }
          />
          <Route
            path="/admin/dashboard/editPerformer/:id"
            element={
              <RequireAuth roles={["admin"]}>
                <PerformerForm />
              </RequireAuth>
            }
          />
          <Route
            path="/admin/dashboard/listPerformer/"
            element={
              <RequireAuth roles={["admin"]}>
                <PerformersList />
              </RequireAuth>
            }
          />

          <Route
            path="/admin/dashboard/userExams/:studentId"
            element={
              <RequireAuth roles={["admin"]}>
               <UserAttemptedExams/>
              </RequireAuth>
            }
          />
        
          <Route
            path="/admin/dashboard/userExams/:studentId/answers/:examId"
            element={
              <RequireAuth roles={["admin"]}>
                <StudentExamResults />
              </RequireAuth>
            }
          />
         <Route
            path="/admin/dashboard/exams/:examId/edit"
            element={
              <RequireAuth roles={["admin"]}>
                <CreateExam />
              </RequireAuth>
            }
          />
        <Route
            path="/admin/dashboard/exams/:examId/questions"
            element={
              <RequireAuth roles={['admin']}>
                <EditQuestions />
              </RequireAuth>
            }
          />

     <Route
            path="/admin/dashboard/exams/:examId/questions/add"
            element={
              <RequireAuth roles={["admin"]}>
                <AddQuestions />
              </RequireAuth>
            }
          />






          {/* faculty routes */}
          <Route
            path="/faculty/dashboard"
            element={
              <RequireAuth roles={["faculty"]}>
                <FacultyLayout />
              </RequireAuth>
            }
          />

          <Route
            path="/faculty/dashboard/createExam"
            element={
              <RequireAuth roles={["faculty","admin"]}>
                <CreateExam />
              </RequireAuth>
            }
          />
          <Route
            path="/faculty/dashboard/myExams"
            element={
              <RequireAuth roles={["faculty"]}>
                <FacultyExams />
              </RequireAuth>
            }
          />
          <Route
            path="/faculty/dashboard/exams/:examId/questions/add"
            element={
              <RequireAuth roles={["faculty","admin"]}>
                <AddQuestions />
              </RequireAuth>
            }
          />
          <Route
            path="/faculty/dashboard/exams/:examId/edit"
            element={
              <RequireAuth roles={["faculty","admin"]}>
                <CreateExam />
              </RequireAuth>
            }
          />
          <Route
            path="/faculty/dashboard/exams/:examId/questions"
            element={
              <RequireAuth roles={["faculty",'admin']}>
                <EditQuestions />
              </RequireAuth>
            }
          />
          <Route
            path="/faculty/dashboard/studentResults"
            element={
              <RequireAuth roles={["faculty"]}>
                <StudentResults />
              </RequireAuth>
            }
          />
          <Route
          path="/faculty/dashboard/studentResults/:examId/studentList"
            element={
              <RequireAuth roles={["faculty"]}>
                <AttendedStudentsList />
              </RequireAuth>
            }
          />
          <Route
            path="/faculty/dashboard/studentResults/:examId/studentList/:studentId"
            element={
              <RequireAuth roles={["faculty"]}>
                <StudentExamResults />
              </RequireAuth>
            }
          />
          <Route
            path="/faculty/dashboard/announcements"
            element={
              <RequireAuth roles={["faculty"]}>
                <AnnouncementList />
              </RequireAuth>
            }
          />
          <Route
            path="/faculty/dashboard/announcements/:announceID"
            element={
              <RequireAuth roles={["faculty"]}>
                <AnnouncementDetail />
              </RequireAuth>
            }
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;
