import Post from "../Post/Post";
import style from './PostList.module.css';
import type { TPost } from "../Post/Post";

export interface IProps {
  posts: Array<TPost>;
}

export const PostList = (props: IProps) => {

  const posts = props.posts;

  return (
    <ul className={style.list}>
      {posts ? posts.map((post: any) => {
        return <li key={post.id}><Post post={post} /></li>
      }) : <h3>Loading...</h3>
      }
    </ul>
  )
}

export default PostList;