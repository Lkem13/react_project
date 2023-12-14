import { useSelector, useDispatch } from "react-redux";
import { selectAllPosts, postRemoved } from "./postsSlice";
import { PostsModel } from "./PostsModel";

export interface PostsProp{
    posts: PostsModel[];
}

const PostsList = () => {
    const dispatch = useDispatch();
    const posts = useSelector(selectAllPosts)

    // Sort posts by id in descending order
    const sortedPosts = [...posts].sort((a, b) => b.id - a.id);
    const handleRemovePost = (postId: number) =>{
        dispatch(postRemoved(postId));
    };

    const renderedPosts = sortedPosts.map((post) => (
        <article key={post.id}>
            <h3>{post.title}</h3>
            <p>{post.body ? post.body.substring(0, 100) : "No content available"}</p>
            <button onClick={() => handleRemovePost(post.id)}>X</button>
        </article>
            
    )
    )
    return(
        <section>
            <h2>Posts</h2>
            {renderedPosts}
        </section>
    )
}

export default PostsList