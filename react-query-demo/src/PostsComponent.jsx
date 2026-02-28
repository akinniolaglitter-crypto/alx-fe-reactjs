import { useQuery } from "@tanstack/react-query";

const fetchPosts = async () => {
  const response = await fetch(
    "https://jsonplaceholder.typicode.com/posts"
  );

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  return response.json();
};

export default function PostsComponent() {
  const {
    data,
    error,
    isLoading,
    isFetching,
    refetch,
  } = useQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,
  });

  if (isLoading) return <p>Loading posts...</p>;
  if (error) return <p>Error fetching posts</p>;

  return (
    <div>
      <h2>Posts</h2>

      <button onClick={() => refetch()}>
        Refetch Posts
      </button>

      {isFetching && <p>Updating...</p>}

      <ul>
        {data.slice(0, 10).map((post) => (
          <li key={post.id}>
            <strong>{post.title}</strong>
            <p>{post.body}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}