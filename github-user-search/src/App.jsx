// App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';

// Simple layout component
const Layout = ({ children }) => {
  return (
    <div className="app">
      <header className="app-header">
        <nav>
          <ul className="nav-links">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
          </ul>
        </nav>
      </header>
      
      <main className="app-main">
        {children}
      </main>
      
      <footer className="app-footer">
        <p>© 2024 My React App. All rights reserved.</p>
      </footer>
    </div>
  );
};

// Page components
const Home = () => (
  <div className="page">
    <h1>Home Page</h1>
    <p>Welcome to the home page of our React application!</p>
  </div>
);

const About = () => (
  <div className="page">
    <h1>About Page</h1>
    <p>This is a simple React application with routing.</p>
  </div>
);

const Contact = () => (
  <div className="page">
    <h1>Contact Page</h1>
    <p>Get in touch with us!</p>
  </div>
);

const NotFound = () => (
  <div className="page">
    <h1>404 - Page Not Found</h1>
    <p>The page you're looking for doesn't exist.</p>
  </div>
);

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;