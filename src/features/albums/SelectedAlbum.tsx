import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { AppDispatch } from "../../app/store";
import { useState } from "react";
import { Albums, selectAlbumById } from "./albumsSlice";
import { Photos, addNewPhoto, photoRemoved, selectAllPhotos } from "../photos/photosSlice";
import { UsersModel } from "../users/UsersModel";
import { selectAllUsers, selectUserById } from "../users/usersSlice";
import { selectCurrentUser } from "../users/currentUserSlice";

export const useAppDispatch: () => AppDispatch = useDispatch


const SelectedAlbum = () => {
    const {albumId} = useParams()
    const users = useSelector(selectAllUsers)
    const currentUser = useSelector(selectCurrentUser);
    const dispatch = useAppDispatch();
    const [newPhotoUrl, setNewPhotoUrl] = useState("");
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const navigate = useNavigate();

    const album = useSelector((state: { albums: Albums }) => selectAlbumById(state, Number(albumId)))
    //const comment = useSelector((state: { comments: Comments }) => selectCommentById(state, Number(postId)))
    
    const allPhotos = useSelector((state: { photos: Photos }) =>
    selectAllPhotos(state)
    );

    if(!album){
      return (
          <section>
              <h2>Album not found!</h2>
          </section>
      )
  }

    const handleReturn = () => {
        navigate('/albums')
      };

    const handleRemovePhoto = (id: number) =>{
        dispatch(photoRemoved(id));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        setSelectedFile(file);
        const reader = new FileReader();
        reader.onload = () => {
          setNewPhotoUrl(reader.result as string);
        };
        reader.readAsDataURL(file);
      }
    };
  
    const handleUploadPhoto = () => {
      if (selectedFile) {
        dispatch(
          addNewPhoto({
            albumId: album.id,
            title: "New Photo Title",
            url: newPhotoUrl,
          })
        );
        setNewPhotoUrl("");
        setSelectedFile(null);

        const fileInput = document.getElementById("fileInput") as HTMLInputElement;
      if (fileInput) {
        fileInput.value = "";
      }
      }
    };
    

    const albumPhotos = allPhotos.filter(
        (photo) => photo.albumId === Number(albumId)
      );

      const renderedPhotos = albumPhotos.map((photo) => (
        <div className="photo" key={photo.id}>
          {
            currentUser?.id === album.userId && (
              <button className="delete" onClick={() => handleRemovePhoto(photo.id)}>
              X
            </button>
                )
           }
          <img className="" src={photo.url} alt={photo.title}></img>
        </div>
      ));

    const user: UsersModel | undefined = selectUserById(users, album.userId);

    return(
        <>
        <button className="return" onClick={handleReturn}>Return</button>
        <article className="album">
            <h2>{album.title}</h2>
            <p>{user?.email}</p>
            {
            currentUser?.id === album.userId && (
          <div>
          <input id="fileInput" type="file" accept="image/*" onChange={handleFileChange} />
          {newPhotoUrl && <img src={newPhotoUrl} alt="Selected" style={{ width: "100px" }} />}
            <button className="upload" onClick={handleUploadPhoto}>
              Upload Photo
            </button>
          </div>
                )
           }
            
        </article>
        <br/>
        <section className="section">
            {renderedPhotos}
        </section>
        </>
    )
}

export default SelectedAlbum