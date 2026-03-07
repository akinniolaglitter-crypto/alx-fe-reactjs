import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import Home from "./pages/Home";
import Profile from "./components/Profile";
import BlogPost from "./pages/BlogPost";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/">Home</Link> |{" "}
        <Link to="/profile">Profile</Link> |{" "}
        <Link to="/blog/1">Blog Post 1</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />

        {/* Protected Profile route */}
        <Route
          path="/profile/*"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        {/* Dynamic blog route */}
        <Route path="/blog/:id" element={<BlogPost />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;