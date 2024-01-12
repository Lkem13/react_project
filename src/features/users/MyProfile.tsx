import { useSelector, useDispatch } from "react-redux";
import { selectAllPosts, postRemoved, deletePost } from "../posts/postsSlice";
import { PostsModel } from "../posts/PostsModel";
import { Link } from "react-router-dom";
import { UsersModel } from "../users/UsersModel";
import { selectAllUsers, selectUserById } from "../users/usersSlice";
import { selectCurrentUser } from "../users/currentUserSlice";
import { deleteComments } from "../comments/commentsSlice";
import { deleteAlbum, selectAllAlbums } from "../albums/albumsSlice";
import { deletePhotos } from "../photos/photosSlice";
import { useState } from "react";

export interface PostsProp{
    posts: PostsModel[];
}

const MyProfile = () => {
    const dispatch = useDispatch();
    const posts = useSelector(selectAllPosts)
    const albums = useSelector(selectAllAlbums)
    const users = useSelector(selectAllUsers)
    const currentUser = useSelector(selectCurrentUser);

    const [displayContent, setDisplayContent] = useState<"posts" | "albums" | null>(null);

    
    const handleRemovePost = (postId: number) =>{
        dispatch(deletePost(postId) as any);
        dispatch(deleteComments(postId) as any);
    };

    const handleRemoveAlbum = (albumId: number) =>{
        dispatch(deleteAlbum(albumId) as any);
        dispatch(deletePhotos(albumId) as any);
    };

    const renderedPosts = posts.map((post) => {
        const user: UsersModel | undefined = selectUserById(users, post.userId);
        return(
            <>
            {
                currentUser?.id === post.userId && (
                    <article className="post" key={post.id}>
                        <button className="delete" onClick={() => handleRemovePost(post.id)}>X</button>
                        <h4>{user?.username}:</h4>
                        <h5>{post.title}</h5>
                        <p>{post.body ? post.body.substring(0, 100) : "No content available"}</p>
                        <Link to={`/posts/${post.id}`}> View </Link>
                    </article>
                )
            }
        </>
    )}
    )

    const renderedAlbums = albums.map((album) => {
        const user: UsersModel | undefined = selectUserById(users, album.userId);
        return(
            <>
            {
                currentUser?.id === album.userId && (
                    <article className="album" key={album.id}>
                        <button className="delete" onClick={() => handleRemoveAlbum(album.id)}>X</button>
                        <h4>{user?.username}:</h4>
                        <h5>{album.title}</h5>
                        <Link to={`/albums/${album.id}`}> View </Link>
                    </article>
                )
            }
        </>
    )}
    )
    
    const handleButtonClick = (content: "posts" | "albums") => {
        setDisplayContent(content);
      };

    return(
    <section>
        <div>
            <h2>My Profile</h2>
            <h3>Name: {currentUser?.name}</h3>
            <h3>Username: {currentUser?.username}</h3>
            <h3>Email: {currentUser?.email}</h3>
        </div>
        <div className="buttons">
            <button className='change' onClick={() => handleButtonClick("posts")}>Posts</button>
            <button className='change' onClick={() => handleButtonClick("albums")}>Albums</button>
        </div>
      <div className="blank">{displayContent === "posts" ? renderedPosts : displayContent === "albums" ? renderedAlbums : null}</div>
    </section>
    )
}

export default MyProfile