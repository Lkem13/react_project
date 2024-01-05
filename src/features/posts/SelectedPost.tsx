import { useDispatch, useSelector } from "react-redux";
import { Posts, selectPostById } from "./postsSlice";
import { useNavigate, useParams } from "react-router-dom";
import { Comments, commentAdded, commentRemoved, selectAllComments, selectCommentById } from "../comments/commentsSlice";
import { AppDispatch } from "../../app/store";
import { useState } from "react";
export const useAppDispatch: () => AppDispatch = useDispatch

const SelectedPost = () => {
    //id
    const {postId} = useParams()

    const dispatch = useAppDispatch();
    
    const post = useSelector((state: { posts: Posts }) => selectPostById(state, Number(postId)))
    //const comment = useSelector((state: { comments: Comments }) => selectCommentById(state, Number(postId)))
    
    const allComments = useSelector((state: { comments: Comments }) =>
    selectAllComments(state)
  );

    const [commentBody, setCommentBody] = useState('');
    const onCommentBodyChanged = (e: React.ChangeEvent<HTMLTextAreaElement>) => setCommentBody(e.target.value)

    const navigate = useNavigate();
    
    const handleReturn = () => {
        navigate('/posts')
      };

    if(!post){
        return (
            <section>
                <h2>Post not found!</h2>
            </section>
        )
    }

    const postComments = allComments.filter(
        (comment) => comment.postId === Number(postId)
      );

      const renderedComments = postComments.map((comment) => (
        <article className="comment" key={comment.id}>
          <h5>{comment.email}</h5>
          <p>{comment.body}</p>
          <button onClick={() => handleRemoveComment(comment.id)}>X</button>
        </article>
      ));

      const handleComment = () => {
        dispatch(
            commentAdded({
                postId: post.id,
                email: 'test@test.test',
                body: commentBody
            })
            )
      }

      const handleRemoveComment = (id: number) =>{
        dispatch(commentRemoved(id));
    };

    return(
        <>
        <button onClick={handleReturn}>Return</button>
        <article className="post">
            <h2>{post.title}</h2>
            <p>{post.body}</p>
        </article>
        <section>
            <br/>
            <h2>Add New Comment</h2>
            <form>
                <label htmlFor="commentContent">Comment:</label>
                <textarea
                    id="commentContent"
                    name="commentContent"
                    value={commentBody}
                    onChange={onCommentBodyChanged}/>
                <button type="button" onClick={handleComment}>Submit</button>
            </form>
            <br/>
        </section>
        <section>
            {renderedComments}
        </section>
        </>
    )
}

export default SelectedPost