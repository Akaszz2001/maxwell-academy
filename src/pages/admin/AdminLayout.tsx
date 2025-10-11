import { useState } from "react";


import { Menu } from "lucide-react";

import AdminSidebar from "@/components/AdminSidebar";
import AdminDashboard from "./AdminDashboard";
import CreateFacultyPage from "./CreateFaculty";

import StudentSignup from "../auth/StudentSignup";
import AddQuestions from "../faculty/AddQuestions";
import Questions from "./Questions";
import AllExams from "./AllExams";
import AllQuestions from "./AllQuestions";
import StudentList from "./StudentsList";
import QuestionBank from "./QuestionBank";
import AnnouncementForm from "./Announcements";
import ListAnnouncements from "./ListAnnouncements";
import CreateExam from "../faculty/CreateExam";
import EventForm from "./EventForm";
import EventsGallery from "./EventList";
import FacultyGallery from "./FaculltyGallery";
import FacultyGalleryList from "./FacultyGalleryList";
import PerformerForm from "./Performance";
import PerformersList from "./PerformersList";

// export default function AdminLayout() {
//   const [isSidebarOpen, setSidebarOpen] = useState(false);
//   const [activeRoute, setActiveRoute] = useState("dashboard");

//   const renderContent = () => {
//     switch (activeRoute) {
//       case "dashboard":
//         return <AdminDashboard/>;
//       case "facultyCreation":
//         return <CreateFacultyPage/>
//         case "studentCreation":
//             return <StudentSignup/>
//         case "questions":
//             return <Questions/>
//         case "exams":
//             return <AllExams/>
//         case "allquestions":
//             return <AllQuestions/>
//         case "allstudents":
//             return <StudentList role={'student'}/>
//         case "allfaculties":
//             return <StudentList role={'faculty'}/>
//         case "questionbank":
//             return <QuestionBank/>
//         case "announcemnet":
//             return <AnnouncementForm/>
//         case "lsitannouncemnet":
//             return <ListAnnouncements/>
//         case "examcreation":
//             return <CreateExam/>
//         case "addevent":
//             return <EventForm/>
//         case "listevent":
//             return <EventsGallery/>

     
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex">
//       <AdminSidebar
//         isSidebarOpen={isSidebarOpen}
//         setSidebarOpen={setSidebarOpen}
//         activeRoute={activeRoute}
//         setActiveRoute={setActiveRoute}
//       />

//       {/* Main Content Area */}
//       <div className="flex-1 flex flex-col min-h-screen">
//         {/* Mobile Header */}
//         <div className="lg:hidden bg-white/95 backdrop-blur-sm shadow-sm border-b border-gray-200 px-4 py-3 flex-shrink-0">
//           <div className="flex items-center justify-between">
//             <button 
//               onClick={() => setSidebarOpen(true)} 
//               className="p-2 rounded-md hover:bg-gray-100 transition-colors"
//             >
//               <Menu className="w-5 h-5" />
//             </button>
//             <h1 className="text-lg font-semibold text-gray-800">Admin Portal</h1>
//             <div className="w-9" />
//           </div>
//         </div>

//         {/* Content */}
//         <div className="flex-1 overflow-auto">
//           {renderContent()}
//         </div>
//       </div>
//     </div>
//   );
// }


export default function AdminLayout() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [activeRoute, setActiveRoute] = useState("dashboard");

  const renderContent = () => {
    switch (activeRoute) {
      case "dashboard":
        return <AdminDashboard />;
      case "facultyCreation":
        return <CreateFacultyPage />;
      case "studentCreation":
        return <StudentSignup />;
      case "questions":
        return <Questions />;
      case "exams":
        return <AllExams />;
      case "allquestions":
        return <AllQuestions />;
      case "allstudents":
        return <StudentList role={"student"} />;
      case "allfaculties":
        return <StudentList role={"faculty"} />;
      case "questionbank":
        return <QuestionBank />;
      case "announcemnet":
        return <AnnouncementForm />;
      case "lsitannouncemnet":
        return <ListAnnouncements />;
      case "examcreation":
        return <CreateExam />;
      case "addevent":
        return <EventForm />;
      case "listevent":
        return <EventsGallery />;
      case "facultygallery":
        return <FacultyGallery />;
      case "facultygallerylist":
        return <FacultyGalleryList />;
      case "performer":
        return <PerformerForm />;
      case "performerlist":
        return <PerformersList />;
    }
  };

  return (
    <div className="flex h-screen overflow-hidden bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Sidebar */}
      <AdminSidebar
        isSidebarOpen={isSidebarOpen}
        setSidebarOpen={setSidebarOpen}
        activeRoute={activeRoute}
        setActiveRoute={setActiveRoute}
      />

      {/* Main Content Area */}
      <div className="flex flex-col flex-1 h-full overflow-hidden">
        {/* Mobile Header */}
        <div className="lg:hidden bg-white/95 backdrop-blur-sm shadow-sm border-b border-gray-200 px-4 py-3 flex-shrink-0">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-2 rounded-md hover:bg-gray-100 transition-colors"
            >
              <Menu className="w-5 h-5" />
            </button>
            <h1 className="text-lg font-semibold text-gray-800">
              Admin Portal
            </h1>
            <div className="w-9" />
          </div>
        </div>

        {/* Content Scrollable Area */}
        <div className="flex-1 overflow-y-auto p-4">{renderContent()}</div>
      </div>
    </div>
  );
}
