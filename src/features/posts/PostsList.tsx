import { useSelector, useDispatch } from "react-redux";
import { selectAllPosts, postRemoved, deletePost } from "./postsSlice";
import { PostsModel } from "./PostsModel";
import { Link } from "react-router-dom";
import { UsersModel } from "../users/UsersModel";
import { selectAllUsers, selectUserById } from "../users/usersSlice";
import { selectCurrentUser } from "../users/currentUserSlice";
import { deleteComments } from "../comments/commentsSlice";

export interface PostsProp{
    posts: PostsModel[];
}

const PostsList = () => {
    const dispatch = useDispatch();
    const posts = useSelector(selectAllPosts)
    const users = useSelector(selectAllUsers)
    const currentUser = useSelector(selectCurrentUser);
    const handleRemovePost = (postId: number) =>{
        dispatch(deletePost(postId) as any);
        dispatch(deleteComments(postId) as any);
    };

    const renderedPosts = posts.map((post) => {
        const user: UsersModel | undefined = selectUserById(users, post.userId);
        return(
        <article className="post" key={post.id}>
            {
                currentUser?.id === post.userId && (
                    <button className="delete" onClick={() => handleRemovePost(post.id)}>X</button>
                )
            }
            <h4>{user?.username}:</h4>
            <h5>{post.title}</h5>
            <p>{post.body ? post.body.substring(0, 100) : "No content available"}</p>
            <Link to={`./posts/${post.id}`}> View </Link>
        </article>
            
    )}
    )
    return(
        <section>
            <h2>Posts</h2>
            {renderedPosts}
        </section>
    )
}

export default PostsList