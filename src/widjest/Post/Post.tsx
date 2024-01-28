import style from './Post.module.css';
import { Link } from "react-router-dom";

export type TPost = {
  id: number,
  title: string,
  body: string,
  userId: number
}

export interface IProps {
  post: TPost
}

const Post = (props: IProps) => {
  const { id, title, body } = props.post;
  return (
    <div className={style.card}>
      <div className={style.number}>N {id}</div>
      <div className={style.title}>{title.length > 20 ? `${title.substring(0, 20)}...` : title}</div>
      <div className={style.body}>{body.length > 20 ? `${body.substring(0, 20)}...` : body}</div>
      <Link to={`/post/${props.post.id}`} className={style.button}><button>Читать подробнее</button></Link>
    </div>
  )
}

export default Post;