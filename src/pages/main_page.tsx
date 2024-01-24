import React, { useEffect, useState } from "react";
import { useGetPostsQuery } from "../api/Plaseholder";
import { useAppDispatch, useAppSelector } from "../api/hooks";
import { setOffset } from "../api/redux";
import { Link } from "react-router-dom";
import Post from './widjest/Post';
import style from './main_page.module.css';

const Main_page = () => {
  const [isGetDown, setIsGetDown] = useState(false);
  const [isGetUp, setIsGetUp] = useState(false);
  //const [currentPos, setCurrentPos] = useState(0);

  const currentPos = useAppSelector((state) => state.state.offset);
  const dispatch = useAppDispatch();

  const { data = [], isLoading } = useGetPostsQuery({ limit: 10, offset: currentPos });
  console.log(data);

  const scrollHandler = (e: any): void => {
    if (e.target.documentElement.scrollTop < 50) {
      setIsGetUp(true);
    }
    if (e.target.documentElement.scrollHeight - e.target.documentElement.scrollTop - window.innerHeight < 50) {
      setIsGetDown(true)
      window.scrollTo(0, (e.target.documentElement.scrollHeight + e.target.documentElement.scrollTop))
    }
  }

  useEffect(() => {
    document.addEventListener('scroll', scrollHandler)
    return () => {
      document.removeEventListener('scroll', scrollHandler)
    }
  }, []);

  useEffect(() => {
    if (isGetDown) {
      const offset = currentPos < 90 ? currentPos + 1 : currentPos;
      dispatch(setOffset(offset))
      // setCurrentPos((prev: any) => {
      //   return prev < 90 ? prev + 1 : prev;
      // })
      console.log(currentPos);
      setIsGetDown(false);
    }
  }, [isGetDown]);

  useEffect(() => {
    if (isGetUp) {
      const offset = currentPos > 90 ? currentPos - 1 : currentPos;
      dispatch(setOffset(offset))
      // setCurrentPos(prev => {
      //   return prev > 0 ? prev - 1 : prev;
      //})
      setIsGetUp(false);
    }
  }, [isGetUp]);

  if (isLoading) return <h1>Loading...</h1>

  return (
    <div className={style.main_page}>

      {/* <ul>
        {data.map((item: any) => {
          return (<li key={item.id}>
            <h4>{item.title}</h4>
            <p>
              {item.body}
            </p>
            <Link to='/post/:item.id'><button>link</button></Link>
          </li>)
        })}
      </ul> */}
      <div className={style.post_list}>
        {data.map((item: any) => {
          return <Post key={item.id} post={item} />
        })}
      </div>

    </div>
  )
}

export default Main_page;