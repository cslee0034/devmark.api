import axios from "axios";
import React, { createContext, useEffect, useMemo, useState } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import Slidebar from "./components/Slidebar";
import Navbar from "./components/NavBar";
import Footer from "./components/Footer";

import FrontPage from "./views/FrontPage";
import BookmarkPage from "./views/BookmarkPage";
import LoginPage from "./views/LoginPage";
import RegisterPage from "./views/RegisterPage";

import "./App.css";
import DashboardPage from "./views/DashboardPage";
import AboutPage from "./views/AboutPage";
import SchedulePage from "./views/SchedulePage";
import MemoPage from "./views/MemoPage";
import TagPage from "./views/TagPage";

export const UserContext = createContext({
  setLoggedIn: (loggedIn: any): any => {},
  setSidebar: (sidebar: any): any => {},
});

const NavBar = Navbar as unknown as React.JSXElementConstructor<{
  loggedIn: boolean;
}>;

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
      <BrowserRouter>
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
                  <NavBar loggedIn={loggedIn} />
                </div>
                {/* End of Navber Content */}

                {/* Begin Page Content */}
                <div id="main-page">
                  <Routes>
                    <Route path="/" element={<FrontPage />} />
                    <Route path="dashboard" element={<DashboardPage />} />
                    <Route path="/bookmark" element={<BookmarkPage />} />
                    <Route path="/about" element={<AboutPage />} />
                    <Route path="/schedule" element={<SchedulePage />} />
                    <Route path="/memo" element={<MemoPage />} />
                    <Route path="/tag" element={<TagPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                  </Routes>
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
      </BrowserRouter>
    </UserContext.Provider>
  );
};

export default App;
