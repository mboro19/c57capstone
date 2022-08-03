import { useEffect, useState } from "react"
import { Navigate, useNavigate } from "react-router-dom"



export const Main = () => {

    const [celebs, setCeleb] = useState([])
    const [filteredCeleb, setFilteredCeleb] = useState({})
    const [isCelebAlive, setIsCelebAlive] = useState(null)

    const navigate = useNavigate()

    const currentUser = localStorage.getItem("current_user")
    const currentUserObject = JSON.parse(currentUser)




    const randomIdGenerator = () => {

        const idArray = Array.from(Array(30).keys())
    
        const randomNumId = Math.floor(Math.random() * idArray.length)
    
        return randomNumId
    
    }
    
    let randomNumber = randomIdGenerator()


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
            if(celebs.length > 0){

            const people = celebs.find(celeb => celeb.id === randomNumber) 
            setFilteredCeleb(people)
            if(people){
                localStorage.setItem("current_celebrity", JSON.stringify(people));
            }
            }
        },
        [celebs]
    )

    

    useEffect(
        () => {

                if(filteredCeleb.dateOfDeath != 0){
                    setIsCelebAlive(false)
                }
                else{
                    setIsCelebAlive(true)
                }
        },
        [filteredCeleb]
    )
   
        
        const saveClick = (event) => {
    
            
                    const saveToSendToAPI = {
            
                        userId: currentUserObject.id,
                        celebrityId: filteredCeleb.id,
                        isAliveGuess: event,
                        isCelebAlive: isCelebAlive
                    }
            


                    return fetch(`http://localhost:8088/statistics`,{
                        method: "POST",
                        headers: {
                            "Content-Type":"application/json"
                        },
                        body: JSON.stringify(saveToSendToAPI)
                    })
                    .then(res => res.json())
                    .then(() => {
                        navigate(`/mainAfter`)
                    })
                }

            

    return <>
            {filteredCeleb &&
            <>
                <img src={filteredCeleb.imageLink} className="main__pic" width="300" height="auto" key={`image--${filteredCeleb.id}`} />

                <li className="celebrity__name" key={`name--${filteredCeleb.id}`}>{filteredCeleb.name}
                </li>

                <li className="celebrity__alias" key={`alias--${filteredCeleb.id}`}>{filteredCeleb.alias}</li>
            
            <button key={`true--${filteredCeleb.id}`} onClick={() => {saveClick(true)}}>Alive</button>
            <button key={`false--${filteredCeleb.id}`} onClick={() => {saveClick(false)}}>Dead</button>
            </>
            }

            
        </>
            
}