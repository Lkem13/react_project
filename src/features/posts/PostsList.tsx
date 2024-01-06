import { useSelector, useDispatch } from "react-redux";
import { selectAllPosts, postRemoved } from "./postsSlice";
import { PostsModel } from "./PostsModel";
import { Link } from "react-router-dom";
import { UsersModel } from "../users/UsersModel";
import { selectAllUsers, selectUserById } from "../users/usersSlice";

export interface PostsProp{
    posts: PostsModel[];
}

const PostsList = () => {
    const dispatch = useDispatch();
    const posts = useSelector(selectAllPosts)
    const users = useSelector(selectAllUsers)
    
    // Sort posts by id in descending order
    const sortedPosts = [...posts].sort((a, b) => b.id - a.id);
    const handleRemovePost = (postId: number) =>{
        dispatch(postRemoved(postId));
    };

    const renderedPosts = sortedPosts.map((post) => {
        const user: UsersModel | undefined = selectUserById(users, post.userId);
        return(
        <article className="post" key={post.id}>
            <h4>{user?.username}:</h4>
            <h5>{post.title}</h5>
            <p>{post.body ? post.body.substring(0, 100) : "No content available"}</p>
            <button onClick={() => handleRemovePost(post.id)}>X</button> / 
            <Link to={`./${post.id}`}> View </Link>
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