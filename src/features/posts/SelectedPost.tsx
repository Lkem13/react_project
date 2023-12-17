import { useSelector } from "react-redux";
import { Posts, selectPostById } from "./postsSlice";
import { useNavigate, useParams } from "react-router-dom";
import { Comments, selectAllComments, selectCommentById } from "../comments/commentsSlice";

const SelectedPost = () => {
    //id
    const {postId} = useParams()

    const post = useSelector((state: { posts: Posts }) => selectPostById(state, Number(postId)))
    //const comment = useSelector((state: { comments: Comments }) => selectCommentById(state, Number(postId)))
    
    const allComments = useSelector((state: { comments: Comments }) =>
    selectAllComments(state)
  );

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
        </article>
      ));

    return(
        <>
        <button onClick={handleReturn}>Return</button>
        <article className="post">
            <h2>{post.title}</h2>
            <p>{post.body}</p>
        </article>
        <section>
            {renderedComments}
        </section>
        </>
    )
}

export default SelectedPost