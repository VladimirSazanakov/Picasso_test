import React, { useEffect, useState } from "react";
import { useGetPostsQuery } from "../api/Plaseholder";
import { useAppDispatch, useAppSelector } from "../api/hooks";
import { setOffset } from "../api/redux";
import { PostList } from "./widjest/PostList";
import style from './main_page.module.css';

const Main_page = () => {
  const [isGetDown, setIsGetDown] = useState(false);
  const [isGetUp, setIsGetUp] = useState(false);
  const currentPos = useAppSelector((state) => state.state.offset);
  const dispatch = useAppDispatch();
  const { data = [], isLoading } = useGetPostsQuery({ limit: 10, offset: currentPos });
  const scrollHandler = () => {
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const scrollPosition = window.scrollY;
    if (documentHeight - (windowHeight + scrollPosition) <= 50) {
      setIsGetDown(true);
      window.scrollTo(0, 200)
    }
    if (scrollPosition < 50) {
      setIsGetUp(true);
      window.scrollTo(0, 100);
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', scrollHandler)
    return () => {
      window.removeEventListener('scroll', scrollHandler)
    }
  }, []);

  useEffect(() => {
    console.log('isGetDown', isGetDown);
    //console.log(inViewLastPost);
    if (isGetDown) {
      console.log("enable isGenDown");
      const offset = currentPos < 90 ? currentPos + 2 : currentPos;
      dispatch(setOffset(offset));
      // setCurrentPos((prev: any) => {
      //   return prev < 90 ? prev + 1 : prev;
      // })
      console.log(offset);
      setIsGetDown(false);
    }

  }, [isGetDown]);

  useEffect(() => {
    console.log("in FirstView")
    if (isGetUp) {
      //window.scrollTo(0, (window.scrollHeight + e.documentElement.scrollTop))
      const offset = currentPos > 0 ? currentPos - 2 : currentPos;
      dispatch(setOffset(offset))
      // setCurrentPos(prev => {
      //   return prev > 0 ? prev - 1 : prev;
      // })
      console.log(currentPos);
      setIsGetUp(false);
    }
  }, [isGetUp]);

  // const Row = ({ index, style }) => (
  //   <Post key={statePosts[index].id} style={style} post={statePosts[index]} />
  // )

  if (isLoading) return <h1>Loading...</h1>

  return (
    // <FixedSizeList height={900}
    //   itemCount={100}
    //   itemSize={35}
    //   width={800}
    // >
    //   {Row}
    // </FixedSizeList >




    <div className={style.main_page}>

    //   {/* <ul>
    //       {data.map((item: any) => {
    //         return (<li key={item.id}>
    //           <h4>{item.title}</h4>
    //           <p>
    //             {item.body}
    //           </p>
    //           <Link to='/post/:item.id'><button>link</button></Link>
    //         </li>)
    //       })}
    //     </ul> */}
      {/* <div className={style.post_list} onScroll={(e) => { }}>
        {data.map((item: any, index: number) => {
           if (index === 0) return <div ref={firstPost} key={item.id}><Post post={item} /></div>
           if (index === data.length - 1) return <div ref={lastPost} key={item.id}><Post post={item} /></div>
           return <div ref={lastPost} key={item.id}><Post post={item} /></div>
         })}
       </div>
       <button onClick={() => setIsGetDown(true)}>загрузить еще</button> */}

      {/* <div className={style.post_list}>
        {data.map((item: any, index: number) => {
          if (index === 0) return <div key={item.id}><Post post={item} /></div>
          if (index === data.length - 1) return <div key={item.id}><Post post={item} /></div>
          return <div key={item.id}><Post post={item} /></div>
        })}
      </div> */}
      <PostList posts={data} />
      <button onClick={() => setIsGetDown(true)}>загрузить еще</button>

    </div>
  )
}

export default Main_page;