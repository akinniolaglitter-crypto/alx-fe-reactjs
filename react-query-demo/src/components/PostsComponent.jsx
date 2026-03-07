import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchPosts = async () => {
  const response = await axios.get("https://jsonplaceholder.typicode.com/posts");
  return response.data;
};

function PostsComponent() {

  const {
    data,
    isLoading,
    isError,
    refetch
  } = useQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,

    // React Query caching options
    cacheTime: 1000 * 60 * 5,
    staleTime: 1000 * 60,
    refetchOnWindowFocus: false,
    keepPreviousData: true
  });

  if (isLoading) {
    return <p>Loading posts...</p>;
  }

  if (isError) {
    return <p>Error fetching posts</p>;
  }

  return (
    <div>
      <h2>Posts</h2>

      <button onClick={() => refetch()}> Refetch Posts </button>

      {data.map((post) => (
        <div key={post.id}>
          <h3>{post.title}</h3>
          <p>{post.body}</p>
        </div>
      ))}
    </div>
  );
}

export default PostsComponent;