import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { AlbumsModel } from "./AlbumsModel";
import { UsersModel } from "../users/UsersModel";
import { deleteAlbum, selectAllAlbums } from "./albumsSlice";
import { selectAllUsers, selectUserById } from "../users/usersSlice";
import { deletePhotos, selectAllPhotos, selectPhotoById } from "../photos/photosSlice";
import { selectCurrentUser } from "../users/currentUserSlice";

export interface AlbumsProp{
    albums: AlbumsModel[];
}

export interface UsersProp{
    users: UsersModel[];
}


const AlbumsList = () => {
    const dispatch = useDispatch();
    const albums = useSelector(selectAllAlbums)
    const users = useSelector(selectAllUsers)
    const currentUser = useSelector(selectCurrentUser);
    const handleRemoveAlbum = (albumId: number) =>{
        dispatch(deleteAlbum(albumId) as any);
        dispatch(deletePhotos(albumId) as any);
    };

    const renderedAlbums = albums.map((album) => {
        // Find the user associated with the album
        const user: UsersModel | undefined = selectUserById(users, album.userId);

        return (
          <article className="album" key={album.id}>
            {
                currentUser?.id === album.userId && (
                    <button className="delete" onClick={() => handleRemoveAlbum(album.id)}>X</button>
                )
            }
            <h3>Title: {album.title ? album.title.substring(0, 100) : "No content available"}</h3>
            <p>Creator: {user?.email}</p>
            <Link to={`./${album.id}`}> View </Link>
          </article>
        );
      });

        
    
    return(
        <section>
            <h2>Albums</h2>
            {renderedAlbums}
        </section>
    )
}

export default AlbumsList