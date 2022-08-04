import { useEffect, useState } from "react"


export const Profile = () => {

    const [getComments, setGetComments] = useState([])
    const [filterComments, setFilterComments] = useState([])
    const [areCommentsNew, setAreCommentsNew] = useState(true)


    const currentUser = JSON.parse(localStorage.getItem("current_user"))



    useEffect(() => {

        fetch("http://localhost:8088/comments")
        .then(res => res.json())
        .then((comments) => {
            setGetComments(comments)
            setAreCommentsNew(false)
        })

    },
    [areCommentsNew]
    )

    useEffect(() => {

        let allComments = getComments.filter(comment => currentUser.id === comment.userId)

            
        
        setFilterComments(allComments)

    },
    [getComments]
    )

//~~~~~~~~~~~~~~~~~~~~~~~~~

const deleteMyPost = (commentId) => { //function whose job is to delete comments if a user is current

    fetch(`http://localhost:8088/comments/${commentId}`, {
    method: "DELETE",
    headers: {"Content-Type":"application/json"},
})
}

const deleteOption = (commentId) => (<button onClick={() => {deleteMyPost(commentId); setAreCommentsNew(true)}}>Delete</button>) //function creates html and a button for deleting, but also rerenders the comments afterwards

const deleteComment = (commentId) => {


        return deleteOption(commentId) //function that only shows delete button if the user has the proper authority. If they dont, it does nothing. 
    }



//~~~~~~~~~~~~~~~~~~~~~~~~~

    return<>
    <h2>My Comments...</h2>
    <div>{filterComments.map((comment) => {
        return (
            
    <li key={comment.id} className="all--comments">{comment.comment}---{deleteComment(comment.id)}</li> )
    })}</div>

    </>
}