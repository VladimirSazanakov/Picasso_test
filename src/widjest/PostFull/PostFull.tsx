import { useNavigate } from "react-router-dom";

import style from "./PostFull.module.css";

export type TPost = {
  id: number,
  title: string,
  body: string,
  userId: number
}

export interface IProps {
  post: TPost
}

const PostFull = ({ post }: IProps) => {

  const navigator = useNavigate();

  return (
    <div className={style.card}>
      <h2 className={style.title}>{post.title}</h2>
      <p className={style.body}>{post.body}</p>
      <button onClick={() => { navigator(-1) }} className={style.button}>Назад</button>
    </div>
  )
}

export default PostFull;