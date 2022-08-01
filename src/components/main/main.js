import { useEffect, useState } from "react"
import { Navigate } from "react-router-dom"



export const Main = () => {

    const [celebs, setCeleb] = useState([])
    const [filteredCeleb, setFilteredCeleb] = useState([])
    const [isAliveGuess, setIsAliveGuess] = useState(null)
    const [guessCeleb, setGuessCeleb] = useState({})

    const currentUser = localStorage.getItem("current_user")
    const currentUserObject = JSON.parse(currentUser)


    const randomIdGenerator = () => {

        const idArray = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30]
    
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
            const people = celebs.filter(celeb => celeb.id === randomNumber) 
            setFilteredCeleb(people)
        },
        [celebs]


    )

    
    useEffect(
        () => {
            for(const guessedCeleb of filteredCeleb){
                setGuessCeleb(guessedCeleb)
                
                
            }
        }
        )
        
        
        const saveClick = (event) => {
    
            
    
                    const saveToSendToAPI = {
            
                        userId: currentUserObject.id,
                        celebrityId: guessCeleb.id,
                        isAliveGuess: event
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
    
                        Navigate(`/mainAfter`)
                        
                    })
            }

    return <>
        <>{filteredCeleb.map((celeb) => {

            return <>
            
                <img src={celeb.imageLink} className="main__pic" width="300" height="auto" key={`image--${celeb.id}`} />
                    <li className="celebrity__name" key={`name--${celeb.id}`}>{celeb.name}
            </li>
            
            <button key={`true--${celeb.id}`} onClick={() => {saveClick(true)}}>Alive</button>
            <button key={`false--${celeb.id}`} onClick={() => {saveClick(false)}}>Dead</button>


            
                </>
        
            
            
        })}</>
    </>
}