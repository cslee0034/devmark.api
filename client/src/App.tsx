import axios from "axios";
import React, { createContext, useEffect, useMemo, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Slidebar from "./components/Slidebar";
import Navbar from "./components/NavBar";
import Footer from "./components/Footer";

import About from "./components/views/About";
import FrontPage from "./components/views/FrontPage";
import BookmarkPage from "./components/views/BookmarkPage";
import LoginPage from "./components/views/LoginPage";
import RegisterPage from "./components/views/RegisterPage";

import "./App.css";

export const UserContext = createContext({
  setLoggedIn: (loggedIn: any): any => {},
  setSidebar: (sidebar: any): any => {},
});

const App: React.FC = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [sidebar, setSidebar] = useState(true);

  const value = useMemo(
    () => ({ setLoggedIn, setSidebar }),
    [setLoggedIn, setSidebar]
  );

  const callApi = async () => {
    axios.get("/api").then((res) => {
      console.log(res.data.test);
    });
  };

  useEffect(() => {
    callApi();
  }, []);

  return (
    <UserContext.Provider value={value}>
      <div id="page-top">
        {/* Page Wrapper */}
        <div id="wrapper">
          {/* Sidebar */}
          {sidebar ? (
            <div id="sidebar">
              <Slidebar />
            </div>
          ) : null}
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
                <BrowserRouter>
                  <Routes>
                    <Route path="/" element={<FrontPage />} />
                    <Route path="/bookmark" element={<BookmarkPage />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                  </Routes>
                </BrowserRouter>
              </div>
              {/* End of Page Content */}
            </div>

            {/* End of Main Content */}
          </div>
          {/* End of Content Wrapper */}
        </div>
        {/* Footer */}
        <div>
          <Footer />
        </div>
        {/* End of Footer */}

        {/* End of Page Wrapper */}
      </div>
    </UserContext.Provider>
  );
};

export default App;
