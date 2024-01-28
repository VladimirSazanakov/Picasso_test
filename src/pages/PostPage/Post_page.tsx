import { useGetPostQuery } from "../../api/Plaseholder";
import { useParams } from "react-router-dom";
import PostFull from "../../widjest/PostFull/PostFull";
import type { TPost } from "../../widjest/PostFull/PostFull";

const Post_page = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetPostQuery({ id });


  if (isLoading) return <h2>Loading...</h2>

  return (
    <PostFull post={data as TPost} />
  )
}

export default Post_page;