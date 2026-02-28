import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import PostsComponent from "./PostsComponent";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <PostsComponent />
    </QueryClientProvider>
  );
}

export default App;