import { useEffect, useState } from "react"; //~~~~~ imports

export const Comments = ({ userId, celebrityId }) => {
  //main component function

  //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ USESTATES vv

  const [postComments, setPostComments] = useState("");
  const [pullAllComments, setPullAllComments] = useState([]);
  const [filterCommentsByCeleb, setFilterCommentsByCeleb] = useState([]);
  const [areCommentsNew, setAreCommentsNew] = useState(true);

  //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ USEEFFECTS vv

  useEffect(
    () => {
      if (areCommentsNew === true) {
        fetch("http://localhost:8088/comments")
          .then((res) => res.json())
          .then((items) => {
            if (items.length > 0) {
              setPullAllComments(items);
            }
            setAreCommentsNew(false);
          });
      }
    },
    [areCommentsNew] //checks to see if the comments have changed and re renders
  );

  useEffect(
    () => {
      if (pullAllComments.length > 0) {
        setFilterCommentsByCeleb(
          pullAllComments.filter(
            (singleComment) => singleComment.celebrityId === celebrityId
          )
        );
      }
    },
    [pullAllComments] //makes sure all comments have rendered, then filters comments by celeb ID
  );

  //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ FUNCTIONS vv

  const commentSubmit = (event) => {
    //function whose job is to submit the comment to the API and database
    const commentPostToAPI = {
      userId: userId,
      celebrityId: celebrityId,
      comment: event,
    };
    return fetch("http://localhost:8088/comments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(commentPostToAPI),
    });
  };

  const deleteMyPost = (commentId) => {
    //function whose job is to delete comments if a user is current

    fetch(`http://localhost:8088/comments/${commentId}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });
  };

  const deleteOption = (commentId) => (
    <button
      onClick={() => {
        deleteMyPost(commentId);
        setAreCommentsNew(true);
      }}
    >
      Delete
    </button>
  ); //function creates html and a button for deleting, but also rerenders the comments afterwards

  const deleteComment = (commentUser, commentId) => {
    if (userId === commentUser) {
      return deleteOption(commentId); //function that only shows delete button if the user has the proper authority. If they dont, it does nothing.
    } else {
    }
  };

  //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ RETURN STATEMENT FOR COMMENTS COMPONENT vv

  return (
    <>
      <main className="container--login">
        <section>
          <form className="form--submit">
            <fieldset>
              <label htmlFor="inputText"> Write your comment here! </label>
              <input
                type="text"
                value={postComments.comment}
                onChange={(evt) => {
                  setPostComments(evt.target.value);
                }}
                className="form-control"
                placeholder="Something to say?"
                required
                autoFocus
              />
            </fieldset>
            <fieldset>
              <button
                onClick={() => {
                  commentSubmit(postComments);
                }}
                type="submit"
              >
                Submit
              </button>
              <p></p>
              <h3>All Comments:</h3>
            </fieldset>
          </form>
          {filterCommentsByCeleb.map((comment) => {
            return (
              <li key={comment.id} className="all--comments">
                {comment.comment} --- 
                {deleteComment(comment.userId, comment.id)}
              </li>
            );
          })}
        </section>
      </main>
    </>
  );

  //button that submits the comment
  //button that deletes the comment from current user
};
