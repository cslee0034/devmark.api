import axios, { AxiosResponse } from "axios";
import React, { createContext, useEffect, useMemo, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Slidebar from "./components/Sidebar";
import Navbar from "./components/NavBar";
import Footer from "./components/Footer";

import FrontPage from "./views/FrontPage";
import BookmarkPage from "./views/BookmarkPage";
import AboutPage from "./views/AboutPage";
import TILsPage from "./views/TILsPage";
import FeedPage from "./views/FeedPage";
import "./App.css";
import AuthPage from "./views/AuthPage";
import Alarm from "./views/Alarm";
import Modal from "./utils/Modal";

export const UserContext = createContext({
  setLoginContent: (loggedIn: any): any => {},
  setSidebar: (sidebar: any): any => {},
  setModalContent: (ModalContent: any): any => {},
});

interface Navbar {
  loggedIn: boolean;
}

interface Get {
  id: any;
}

interface Modal {
  header: string;
  message: string;
  toggle: any;
}

const App = (): JSX.Element => {
  axios.defaults.withCredentials = true;
  const [loginContent, setLoginContent] = useState({
    loggedIn: false,
    userId: null,
  });
  const [sidebar, setSidebar] = useState(true);
  const [ModalContent, setModalContent] = useState({
    header: "",
    message: "",
    toggle: "",
  });

  const value = useMemo(
    () => ({ setLoginContent, setSidebar, setModalContent }),
    [setLoginContent, setSidebar, setModalContent]
  );

  const loginAPI = async () => {
    try {
      await axios.get<Get>("/api/info").then((res) => {
        const UserId = res.data.id;
        if (UserId) {
          setLoginContent({
            loggedIn: true,
            userId: UserId,
          });
        }
      });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error(
          (error.response as AxiosResponse<{ message: string }>)?.data.message
        );
      } else {
        console.error(error);
      }
    }
  };

  useEffect(() => {
    loginAPI();
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
              {/* Modal */}
              {ModalContent.toggle === "view" ? (
                <Modal
                  header={ModalContent.header}
                  message={ModalContent.message}
                  toggle={ModalContent.toggle}
                />
              ) : null}
              {/* End of Modal */}
              {/* Main Content */}
              <div id="content">
                {/* Navbar Content */}
                <div id="navbar">
                  <Navbar loggedIn={loginContent.loggedIn} />
                </div>
                {/* End of Navber Content */}

                {/* Begin Page Content */}
                <div id="main-page">
                  <Routes>
                    <Route path="/" element={<FrontPage />} />
                    <Route path="/bookmark" element={<BookmarkPage />} />
                    <Route path="/about" element={<AboutPage />} />
                    <Route path="/Alarm" element={<Alarm />} />
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
