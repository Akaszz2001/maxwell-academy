import { useAuthStore } from "../../store/authStore"
export default function Student(){
    const {signOut}=useAuthStore()
    return(

        <div>
            <h1>Hi student</h1>
            <button onClick={signOut}>signout</button>
        </div>
    )
}