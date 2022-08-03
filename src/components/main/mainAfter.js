import { useEffect, useState } from "react"
import { Navigate, useNavigate, useParams } from "react-router-dom"
import { Comments } from "../comments/comments.js"

export const MainAfter = () => {
    const [stats, setStats] = useState([])
    const [celeb, setCeleb] = useState([])
    const [filteredStat, setFilteredStat] = useState([])
    const [celebObj, setCelebObj] = useState([])
    const [areTheyRight, setAreTheyRight] = useState(false)
    const [rightStatement, setRightStatement] = useState("")
    const [deadOrAlive, setDeadOrAlive] = useState("")


  
    const navigate = useNavigate()

    const currentUser = JSON.parse(localStorage.getItem("current_user"))
    const currentCelebrity = JSON.parse(localStorage.getItem("current_celebrity"))


    useEffect( 
        () => {
        
            fetch("http://localhost:8088/statistics")
            .then(res => res.json())
            .then((stats) => { 

                setStats(stats)
                
            })},
            []
    )

    useEffect( 
        () => {
        
            fetch("http://localhost:8088/celebrities")
            .then(res => res.json())
            .then((person) => { 

                setCeleb(person)
                
            })},
            []
    )

    useEffect(
        () => {

            if(stats.length > 0){

            stats.map((statId) => {

                const length = stats.length
                const lastItem = (length + 1)

                if(statId.id === lastItem){setFilteredStat(statId)}
        })}

        },
        [celeb]
    )
    
    useEffect(() => {
 
        if(celeb.length > 0){
        for(let person of celeb){
            

                if (filteredStat.celebrityId === person.id){

                    setCelebObj(person)
                }

            
        }}
    },
    [filteredStat]
    )
    
    useEffect(() => {

        if(filteredStat.isAliveGuess === filteredStat.isCelebAlive){setAreTheyRight(true)}else{setAreTheyRight(false)}


    },
    [celebObj]
    )
    
    useEffect(() => {

        if(areTheyRight === true){setRightStatement("Correct!!!")}else{setRightStatement("Wrong! Better luck with the next.")}

    },
    [areTheyRight]
    )

    useEffect(() => {

        if(filteredStat.isCelebAlive === true && filteredStat.length > 0){setDeadOrAlive("Alive")} else {setDeadOrAlive("Dead")}
    },
    [rightStatement]
    )
 

    return <>

            <img src={celebObj.imageLink} className="main__pic" width="300" height="auto" key={`image--${celebObj.id}`} />
            
            <li className="celebrity__name" key={`name--${celebObj.id}`}>{celebObj.name}
            </li>

            <h1 className="dead__alive" key={`status--${celebObj.id}`}>{deadOrAlive}</h1>

            <div className="celebrity__statement" key={`statement--${celebObj.id}`}>{rightStatement}</div>
            <button key={``} onClick={() => {navigate("/main")}}>Next</button>
            <Comments userId={currentUser.id} celebrityId={currentCelebrity.id} />


            
                
        
            
            
        </> 
    
}