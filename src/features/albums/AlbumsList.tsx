import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { AlbumsModel } from "./AlbumsModel";
import { UsersModel } from "../users/UsersModel";
import { albumRemoved, selectAllAlbums } from "./albumsSlice";
import { Users, selectAllUsers, selectUserById } from "../users/usersSlice";
import { PhotosModel } from "../photos/PhotosModel";
import { selectAllPhotos, selectPhotoById } from "../photos/photosSlice";

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
    const photos = useSelector(selectAllPhotos)
    // Sort albums by id in descending order
    const sortedAlbums = [...albums].sort((a, b) => b.id - a.id);
    const handleRemoveAlbum = (id: number) =>{
        dispatch(albumRemoved(id));
    };

    const renderedAlbums = sortedAlbums.map((album) => {
        // Find the user associated with the album
        const user: UsersModel | undefined = selectUserById(users, album.userId);

        return (
          <article className="album" key={album.id}>
            <h3>Title: {album.title ? album.title.substring(0, 100) : "No content available"}</h3>
            <p>Creator: {user?.email}</p>
            <button onClick={() => handleRemoveAlbum(album.id)}>X</button> /
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