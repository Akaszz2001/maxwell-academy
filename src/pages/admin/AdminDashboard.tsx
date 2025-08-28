import { useAuthStore } from "../../store/authStore"
export default function AdminDashboard(){

const {signOut} =useAuthStore()
    return(
        <div>
            <h1>Admin Dashboard</h1>
            <button onClick={signOut}>logout</button>
        </div>
    )
}2