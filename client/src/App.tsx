import axios, { AxiosResponse } from "axios";
import React, { createContext, useEffect, useMemo, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Slidebar from "./components/Sidebar";
import Navbar from "./components/NavBar";
import Footer from "./components/Footer";

import FrontPage from "./views/FrontPage";
import BookmarkPage from "./views/BookmarkPage";
import AboutPage from "./views/AboutPage";
import AuthPage from "./views/AuthPage";
import Modal from "./utils/Modal";
import AlarmPage from "./views/Alarm";
import "./App.css";
import RedirectPage from "./views/RedirectPage";
import CModal from "./utils/CModal";
import MemoPage from "./views/MemoPage";
import UModal from "./utils/UModal";
import DModal from "./utils/DModal";

// Contexts

export const UserContext = createContext({
  loginContent: {
    loggedIn: false,
    userId: "",
    userNick: "",
  },
  setLoginContent: (loggedIn: any): any => {},
});

export const SidebarContext = createContext({
  setSidebar: (sidebar: any): any => {},
});

export const ModalContext = createContext({
  setModalContent: (ModalContent: any): any => {},
});

// Interfaces
interface Navbar {
  loggedIn: boolean;
}

interface Modal {
  header: string;
  message: string;
  toggle: any;
  url: string;
}

// React Start from here
const App = (): JSX.Element => {
  //--------------------------------------------------------
  // Config

  /* Axios withCredentials */
  axios.defaults.withCredentials = true;

  //--------------------------------------------------------
  // Declaration of useState, useContext, useRef ...

  /* Login Content */
  const [loginContent, setLoginContent] = useState({
    loggedIn: false,
    userId: "",
    userNick: "",
  });
  /* Sidebar Content */
  const [sidebar, setSidebar] = useState(true);

  /* Modal Content */
  const [ModalContent, setModalContent] = useState({
    header: "",
    message: "",
    toggle: "",
    url: "",
    id: "",
  });

  //--------------------------------------------------------
  // useMemos

  /* Remember Login, Sideber, Modal Memo */
  const loginMemo = useMemo(
    () => ({ loginContent, setLoginContent }),
    [loginContent, setLoginContent]
  );
  const sidebarMemo = useMemo(() => ({ setSidebar }), [setSidebar]);
  const modalMemo = useMemo(() => ({ setModalContent }), [setModalContent]);

  /* Storage Login */
  const StorageLogin = async () => {
    if (window.localStorage.getItem("userId")) {
      try {
        setLoginContent({
          loggedIn: true,
          userId: window.localStorage.getItem("userId")!,
          userNick: window.localStorage.getItem("userNick")!,
        });
      } catch (error) {
        console.error(error);
      }
    } else if (window.sessionStorage.getItem("userId")) {
      try {
        setLoginContent({
          loggedIn: true,
          userId: window.sessionStorage.getItem("userId")!,
          userNick: window.sessionStorage.getItem("userNick")!,
        });
      } catch (error) {
        console.error(error);
      }
    }
  };

  //--------------------------------------------------------
  /* Check If Loggedin Or Not */

  useEffect(() => {
    if (
      window.localStorage.getItem("userId") ||
      window.sessionStorage.getItem("userId")
    ) {
      StorageLogin();
    }
  }, []);

  //--------------------------------------------------------
  // Modal render

  /* CRUD Modal */
  const renderModal = () => {
    if (ModalContent.toggle === "") {
      return;
    }
    if (ModalContent.toggle === "view") {
      return (
        <Modal
          header={ModalContent.header}
          message={ModalContent.message}
          toggle={ModalContent.toggle}
        />
      );
    }
    if (ModalContent.toggle === "create") {
      return (
        <CModal
          header={ModalContent.header}
          message={ModalContent.message}
          toggle={ModalContent.toggle}
          id={ModalContent.id}
        />
      );
    }
    if (ModalContent.toggle === "update") {
      return (
        <UModal
          header={ModalContent.header}
          toggle={ModalContent.toggle}
          url={ModalContent.url}
          id={ModalContent.id}
        />
      );
    }
    if (ModalContent.toggle === "delete") {
      return (
        <DModal
          header={ModalContent.header}
          message={ModalContent.message}
          toggle={ModalContent.toggle}
          url={ModalContent.url}
          id={ModalContent.id}
        />
      );
    }
  };

  //--------------------------------------------------------
  // return

  return (
    <UserContext.Provider value={loginMemo}>
      <SidebarContext.Provider value={sidebarMemo}>
        <ModalContext.Provider value={modalMemo}>
          <BrowserRouter>
            <div id="page-top">
              {/* Page Wrapper */}
              <div id="wrapper">
                {/* Sidebar */}
                {sidebar && loginContent.loggedIn ? (
                  <div id="sidebar">
                    <Slidebar />
                  </div>
                ) : null}
                {/* End of Sidebar */}

                {/* Content Wrapper */}
                <div id="content-wrapper">
                  {/* Modal */}
                  {renderModal()}
                  {/* End of Modal */}

                  {/* Main Content */}
                  <div id="content">
                    {/* Navbar Content */}
                    <div id="navbar">
                      <Navbar
                        loggedIn={loginContent.loggedIn}
                        userNick={loginContent.userNick}
                      />
                    </div>
                    {/* End of Navber Content */}

                    {/* Begin Page Content */}
                    <div id="main-page">
                      <Routes>
                        <Route path="/" element={<FrontPage />} />
                        <Route path="/bookmarks" element={<BookmarkPage />} />
                        <Route
                          path="/bookmarks/:id"
                          element={<BookmarkPage />}
                        />
                        <Route path="/about" element={<AboutPage />} />
                        <Route path="/alarms" element={<AlarmPage />} />
                        <Route path="/memos" element={<MemoPage />} />
                        <Route path="/memos/:memo_id" element={<MemoPage />} />
                        <Route path="/auth" element={<AuthPage />} />
                        <Route path="/redirect" element={<RedirectPage />} />
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
        </ModalContext.Provider>
      </SidebarContext.Provider>
    </UserContext.Provider>
  );
};

export default App;
