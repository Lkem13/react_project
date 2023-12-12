import { useSelector } from "react-redux";
import { selectAllPosts } from "./postsSlice";
import { PostsModel } from "./PostsModel";

export interface PostsProp{
    posts: PostsModel[];
}

const PostsList = () => {
    const posts = useSelector(selectAllPosts)

    const renderedPosts = posts ? (
        posts.map((post) => (
        <article key={post.id}>
            <h3>{post.title}</h3>
            <p>{post.content.substring(0, 100)}</p>
        </article>
            
    ))
    ) : null;
    return(
        <section>
            <h2>Posts</h2>
            {renderedPosts}
        </section>
    )
}

export default PostsList