import { useEffect, useState } from "react";
import { useGetPostsQuery } from "../../api/Plaseholder";
import { useAppDispatch, useAppSelector } from "../../api/hooks";
import { setOffset } from "../../api/redux";
import { PostList } from "../../widjest/PostList/PostList";
import style from './main_page.module.css';

const Main_page = () => {
  const [isGetDown, setIsGetDown] = useState(false);
  const [isGetUp, setIsGetUp] = useState(false);
  const currentPos = useAppSelector((state) => state.state.offset);
  const dispatch = useAppDispatch();
  const { data = [], isLoading } = useGetPostsQuery({ limit: 15, offset: currentPos });

  const scrollHandler = () => {
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const scrollPosition = window.scrollY;

    if (documentHeight - (windowHeight + scrollPosition) <= 50) {
      setIsGetDown(true);
      window.scrollBy(0, -50);
    }
    if (scrollPosition < 50) {
      setIsGetUp(true);
      window.scrollBy(0, 50);
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', scrollHandler)
    return () => {
      window.removeEventListener('scroll', scrollHandler)
    }
  }, []);

  useEffect(() => {
    if (isGetDown) {
      const offset = currentPos < 90 ? currentPos + 2 : currentPos;
      dispatch(setOffset(offset));
      setIsGetDown(false);
    }
  }, [isGetDown]);

  useEffect(() => {
    if (isGetUp) {
      const offset = currentPos >= 2 ? currentPos - 2 : currentPos;
      dispatch(setOffset(offset))
      setIsGetUp(false);
    }
  }, [isGetUp]);

  if (isLoading) return <h1>Loading...</h1>

  return (
    <div className={style.main_page}>
      <PostList posts={data} />
    </div>
  )
}

export default Main_page;