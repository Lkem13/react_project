import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Comments, commentAdded, commentRemoved, selectAllComments, selectCommentById } from "../comments/commentsSlice";
import { AppDispatch } from "../../app/store";
import { useState } from "react";
import { Albums, selectAlbumById } from "./albumsSlice";
import { Photos, photoRemoved, selectAllPhotos } from "../photos/photosSlice";
import { UsersModel } from "../users/UsersModel";
import { selectAllUsers, selectUserById } from "../users/usersSlice";

export const useAppDispatch: () => AppDispatch = useDispatch


const SelectedAlbum = () => {
    //id
    const {albumId} = useParams()
    const users = useSelector(selectAllUsers)
    
    const dispatch = useAppDispatch();
    
    const album = useSelector((state: { albums: Albums }) => selectAlbumById(state, Number(albumId)))
    //const comment = useSelector((state: { comments: Comments }) => selectCommentById(state, Number(postId)))
    
    const allPhotos = useSelector((state: { photos: Photos }) =>
    selectAllPhotos(state)
  );

    const navigate = useNavigate();
    
    const handleReturn = () => {
        navigate('/albums')
      };

    if(!album){
        return (
            <section>
                <h2>Album not found!</h2>
            </section>
        )
    }

    const albumPhotos = allPhotos.filter(
        (photo) => photo.albumId === Number(albumId)
      );

      const renderedPhotos = albumPhotos.map((photo) => (
        <div className="photo" key={photo.id}>
          <button className="remove-button" onClick={() => handleRemovePhoto(photo.id)}>
            X
          </button>
          <img className="" src={photo.url} alt={photo.title}></img>
        </div>
      ));

      const handleRemovePhoto = (id: number) =>{
        dispatch(photoRemoved(id));
    };

    const user: UsersModel | undefined = selectUserById(users, album.userId);

    return(
        <>
        <button onClick={handleReturn}>Return</button>
        <article className="album">
            <h2>{album.title}</h2>
            <p>{user?.email}</p>
        </article>
        <section className="section">
            {renderedPhotos}
        </section>
        </>
    )
}

export default SelectedAlbum