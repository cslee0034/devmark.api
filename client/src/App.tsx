import axios from "axios";
import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import FrontPage from "./components/views/FrontPage";
import About from "./components/views/About";
import BookmarkPage from "./components/views/BookmarkPage";
import LoginPage from "./components/views/LoginPage";
import Footer from "./components/views/Footer";
import React from "react";

const App: React.FC = () => {
  const callApi = async () => {
    axios.get("/api").then((res) => {
      console.log(res.data.test);
    });
  };

  useEffect(() => {
    callApi();
  }, []);

  return (
    <div className="App">
      <Router>
        <div className="header-container">
          <div className="header-container-left">
            <div className="box">
              <Link to="/">Home</Link>
            </div>
            <div className="box">
              <Link to="/about">About</Link>
            </div>
          </div>
          <div className="header-container-right">
            <div className="box">
              <Link to="/bookmark">Bookmark</Link>
            </div>
            <div className="box">
              <Link to="/login">Login</Link>
            </div>
          </div>
        </div>
        <Routes>
          <Route path="/" element={<FrontPage />} />
          <Route path="/about" element={<About />} />
          <Route path="/bookmark" element={<BookmarkPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </Router>
      <Footer />
    </div>
  );
}

export default App;
