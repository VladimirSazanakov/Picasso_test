import React from "react";
import Post from "./Post";

export const PostList = (props: any) => {

  const posts = props.posts;

  return (
    <ul>

      {posts ? posts.map((post: any) => {
        return <li key={post.id}><Post post={post} /></li>
      }) : <h3>Loading...</h3>
      }
    </ul>
  )
}

export default PostList;