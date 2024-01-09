import { useDispatch, useSelector } from "react-redux";
import { Posts, selectPostById } from "./postsSlice";
import { useNavigate, useParams } from "react-router-dom";
import { Comments, addNewComment, deleteComment, selectAllComments} from "../comments/commentsSlice";
import { AppDispatch } from "../../app/store";
import { useState } from "react";
import { selectAllUsers, selectUserById } from "../users/usersSlice";
import { UsersModel } from "../users/UsersModel";
import { selectCurrentUser } from "../users/currentUserSlice";
export const useAppDispatch: () => AppDispatch = useDispatch

const SelectedPost = () => {
    //id
    const {postId} = useParams()

    const dispatch = useAppDispatch();
    
    const post = useSelector((state: { posts: Posts }) => selectPostById(state, Number(postId)))
    //const comment = useSelector((state: { comments: Comments }) => selectCommentById(state, Number(postId)))
    const users = useSelector(selectAllUsers)
    const currentUser = useSelector(selectCurrentUser);
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
          {
            currentUser?.email === comment.email && (
                <button className="delete" onClick={() => handleRemoveComment(comment.id)}>X</button>
                )
           }
        </article>
      ));

      const handleComment = async () => {
            await dispatch(addNewComment({email: currentUser?.email || 'Guest', postId: post.id, body: commentBody}));
            setCommentBody('');
      }

      const handleRemoveComment = (commentId: number) =>{
        dispatch(deleteComment(commentId));
    };
    const user: UsersModel | undefined = selectUserById(users, post.userId);
    return(
        <>
        <button className="return" onClick={handleReturn}>Return</button>
        <article className="post">
            <h4>{user?.username}:</h4>
            <h5>{post.title}</h5>
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
                <button className="submit" type="button" onClick={handleComment}>Submit</button>
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