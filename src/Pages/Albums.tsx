import React from "react";
import PostsList from "../features/posts/PostsList";
import AddPostForm from "../features/posts/AddPostForm";
import AlbumsList from "../features/albums/AlbumsList";
import AddAlbumForm from "../features/albums/AddAlbumForm";

const Albums = () => {
    return(
        <div>
            <div>
                <AddAlbumForm/>
            </div>
            <div>
                <AlbumsList/>
            </div>
        </div>
    )
}
export default Albums;