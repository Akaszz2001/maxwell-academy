import { useAuthStore } from "../../store/authStore"
import { useNavigate } from "react-router-dom"
export default function StudentDashboard(){
    const navigate=useNavigate()
    const {signOut}=useAuthStore()

    const directToExams=()=>{
        navigate("/student/dashboard/allExams")
    }
    return(

        <div>
            <h1>Hi student</h1>
            <button onClick={signOut}>signout</button>
            <button onClick={directToExams}>Exams</button>
        </div>
    )
}