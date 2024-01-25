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

  //const currentPos = useAppSelector((state) => state.state.offset);

  const globalstate = useAppSelector(state => state);
  let currentPos = globalstate.state.offset;

  const dispatch = useAppDispatch();

  const { data = [], isLoading } = useGetPostsQuery({ limit: 10, offset: currentPos });
  //console.log(data);

  const scrollHandler = () => {
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const scrollPosition = window.scrollY;
    console.log(documentHeight - (windowHeight + scrollPosition));
    console.log('scroll currentPos', currentPos);

    if (documentHeight - (windowHeight + scrollPosition) <= 50) {
      console.log('NeedNewData')
      const offset = currentPos < 90 ? currentPos + 5 : currentPos;
      //dispatch(setOffset(offset));
      setIsGetDown(true);
      window.scrollTo(0, (documentHeight + scrollPosition))
      console.log('current position', currentPos);
      console.log('offset = ', offset);
      console.log(globalstate.state.offset);

    }

    //window.addEventListener('scroll', scrollHandler);

    // const e = event.target as HTMLElement;
    // // if(e.scrollTop )
    // if (e.documentElement.scrollTop < 50) {
    //   setIsGetUp(true);
    // }
    // if (e.documentElement.scrollHeight - e.documentElement.scrollTop - window.innerHeight < 50) {
    //   setIsGetDown(true);
    //   console.log('isGetDown from handler');
    //   window.scrollTo(0, (e.documentElement.scrollHeight + e.documentElement.scrollTop))
    // }
  }

  useEffect(() => {
    window.addEventListener('scroll', scrollHandler)
    return () => {
      window.removeEventListener('scroll', scrollHandler)
    }
  }, []);

  useEffect(() => {
    console.log('isGetDown', isGetDown);
    if (isGetDown) {
      console.log("enable isGenDown");
      const offset = currentPos < 90 ? currentPos + 1 : currentPos;
      dispatch(setOffset(offset));
      // setCurrentPos((prev: any) => {
      //   return prev < 90 ? prev + 1 : prev;
      // })
      console.log(currentPos);
      setIsGetDown(false);
    }
  }, [isGetDown]);

  // useEffect(() => {
  //   if (isGetUp) {
  //     const offset = currentPos > 0 ? currentPos - 1 : currentPos;
  //     dispatch(setOffset(offset))
  //     // setCurrentPos(prev => {
  //     //   return prev > 0 ? prev - 1 : prev;
  //     // })
  //     console.log(currentPos);
  //     setIsGetUp(false);
  //   }
  // }, [isGetUp]);

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
      <div className={style.post_list} onScroll={(e) => console.log(e)}>
        {data.map((item: any) => {
          return <Post key={item.id} post={item} />
        })}
      </div>
      <button onClick={() => dispatch(setOffset(currentPos < 90 ? currentPos + 5 : currentPos))}>загрузить еще</button>
    </div>
  )
}

export default Main_page;