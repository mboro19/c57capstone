import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


export const Comments = ({ userId, celebrityId}) => {


    const [postComments, setPostComments] = useState("")
    const [pullAllComments, setPullAllComments] = useState([])
    const [filterCommentsByCeleb, setFilterCommentsByCeleb] = useState([])
    const [areCommentsDirty, setAreCommentsDirty] = useState(true)

useEffect(() => {
    if(areCommentsDirty === true){
     fetch('http://localhost:8088/comments')
    .then(res => res.json())
    .then((items) => {

        if(items.length > 0){
        setPullAllComments(items)}
        setAreCommentsDirty(false);
    })
}

},
[areCommentsDirty]
)

useEffect(() => {
    if(pullAllComments.length > 0){
        setFilterCommentsByCeleb(pullAllComments.filter((singleComment) => singleComment.celebrityId === celebrityId));   
    }
},
[pullAllComments]
)


const commentSubmit = (event) => {
    const commentPostToAPI = {
        userId: userId ,
        celebrityId: celebrityId ,
        comment: event
    }
    return fetch("http://localhost:8088/comments",{
        method: "POST",
        headers: {
            "Content-Type":"application/json"
        },
        body: JSON.stringify(commentPostToAPI)
    })
}

const deleteMyPost = (commentId) => {

    fetch(`http://localhost:8088/comments/${commentId}`, {
    method: "DELETE",
    headers: {"Content-Type":"application/json"},
})
}

const deleteOption = (commentId) => (<button onClick={() => {deleteMyPost(commentId); setAreCommentsDirty(true)}}>Delete</button>)

const deleteComment = (commentUser, commentId) => {

    if(userId === commentUser){
        return deleteOption(commentId)
    }else{}

}




  return<>
  
  <main className="container--login">
            <section>
                <form className="form--submit">
                    <fieldset>
                        <label htmlFor="inputText"> Write your comment here! </label>
                        <input type="text"
                            value={postComments.comment}
                            onChange={(evt) => {setPostComments(evt.target.value)}}
                            className="form-control"
                            placeholder="Something to say?"
                            required autoFocus />
                    </fieldset>
                    <fieldset>
                        <button onClick={() => {commentSubmit(postComments)}}type="submit">
                            Submit
                        </button><p></p><h3>All Comments:</h3>
                    </fieldset>
                </form>
                        {filterCommentsByCeleb.map((comment, i) => {
                            return (
                            <li key={comment.id} className="all--comments">{comment.comment}{deleteComment(comment.userId, comment.id)}</li> 
                            )
                        })
                        }
                            
            </section>
        </main>
  
  </>

    

//button that submits the comment
//button that deletes the comment from current user



}