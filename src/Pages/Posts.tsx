import React from "react";
import PostsList from "../features/posts/PostsList";
import AddPostForm from "../features/posts/AddPostForm";

const Posts = () => {
    return(
        <div>
            <div>
                <AddPostForm/>
            </div>
            <div>
                <PostsList/>
            </div>
        </div>
    )
}
export default Posts;