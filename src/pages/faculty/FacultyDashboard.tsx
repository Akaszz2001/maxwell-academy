import { useQuestionStore } from "../../store/questionStore"
export default function FacultyDashboard(){
    const {fetchQuestions} = useQuestionStore()
const handleClick=()=>{
    fetchQuestions("1f0mjy6cls0dw2n")
}
return(
    <div><h1>Faculty</h1>
    <button onClick={handleClick}>click</button>
    </div>
)
}