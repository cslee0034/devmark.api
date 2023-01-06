import axios from "axios";
import { useEffect } from "react";
import Slidebar from "./components/Slidebar";
import Navbar from "./components/NavBar";
import FrontPage from "./components/views/FrontPage";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import React from "react";
import "./App.css";
import Footer from "./components/Footer";

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
    <div id="page-top">
      {/* Page Wrapper */}
      <div id="wrapper">
        {/* Sidebar */}
        <div id="sidebar">
          <Slidebar />
        </div>
        {/* End of Sidebar */}

        {/* Content Wrapper */}
        <div id="content-wrapper">
          {/* Main Content */}
          <div id="content">
            {/* Navbar Content */}
            <div id="navbar">
              <Navbar />
            </div>
            {/* End of Navber Content */}

            {/* Begin Page Content */}
            <div id="main-page">
              <FrontPage />
            </div>
            {/* End of Page Content */}
          </div>

          {/* Footer */}
          <div>
            <Footer />
          </div>
          {/* End of Footer */}
          {/* End of Main Content */}
        </div>
        {/* End of Content Wrapper */}
      </div>
      {/* End of Page Wrapper */}
    </div>
  );
};

export default App;
