import React from "react";
import { useGetPostQuery } from "../api/Plaseholder";
import { useNavigate, useParams } from "react-router-dom";
import style from './Post_page.module.css';

const Article_page = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetPostQuery({ id });
  const navigator = useNavigate();

  console.log(id);
  console.log(data);

  if (isLoading) return <h2>Loading...</h2>

  return (
    <div className={style.post_page}>
      <h2 className={style.title}>{data.title}</h2>
      <p className={style.body}>{data.body}</p>
      <button onClick={() => { navigator(-1) }} className={style.button}>Назад</button>

    </div>
  )
}

export default Article_page;