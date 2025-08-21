import { useAuthStore } from "../../store/authStore"
export default function Admin(){

const {signOut} =useAuthStore()
    return(
        <div>
            <h1>Admin Dashboard</h1>
            <button onClick={signOut}>logout</button>
        </div>
    )
}