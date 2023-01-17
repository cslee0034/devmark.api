import axios, { AxiosResponse } from "axios";
import React, { createContext, useEffect, useMemo, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Slidebar from "./components/Sidebar";
import Navbar from "./components/NavBar";
import Footer from "./components/Footer";

import FrontPage from "./views/FrontPage";
import BookmarkPage from "./views/BookmarkPage";
import AboutPage from "./views/AboutPage";
import SchedulePage from "./views/SchedulePage";
import TILsPage from "./views/TILsPage";
import FeedPage from "./views/FeedPage";
import "./App.css";
import AuthPage from "./views/AuthPage";

export const UserContext = createContext({
  setLoggedIn: (loggedIn: any): any => {},
  setSidebar: (sidebar: any): any => {},
});

interface Navbar {
  loggedIn: boolean;
}

interface Get {
  test: string;
}

const App = (): JSX.Element => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [sidebar, setSidebar] = useState(true);

  const value = useMemo(
    () => ({ setLoggedIn, setSidebar }),
    [setLoggedIn, setSidebar]
  );

  const callApi = async () => {
    try {
      await axios.get<Get>("/api/test").then((res) => {
        // 응답이 온다고 해서 그냥 두면 안되고 any일 경우 타입 지정해주어야 한다.
        console.log(res.data.test);
      });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        // custom typeguard
        console.error(
          (error.response as AxiosResponse<{ message: string }>)?.data.message
        );
      } else {
        console.error(error);
      }
    }
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
                  <Navbar loggedIn={loggedIn} />
                </div>
                {/* End of Navber Content */}

                {/* Begin Page Content */}
                <div id="main-page">
                  <Routes>
                    <Route path="/" element={<FrontPage />} />
                    <Route path="/bookmark" element={<BookmarkPage />} />
                    <Route path="/about" element={<AboutPage />} />
                    <Route path="/schedule" element={<SchedulePage />} />
                    <Route path="/tils" element={<TILsPage />} />
                    <Route path="/feed" element={<FeedPage />} />
                    <Route path="/auth" element={<AuthPage />} />
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
