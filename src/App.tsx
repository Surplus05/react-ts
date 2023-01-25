import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import GlobalStyle from "./common/style";
import Body from "./components/body/Body";
import Main from "./components/body/Main";
import SearchResult from "./components/body/SearchResult";
import Watch from "./components/body/watch/Watch";
import { PlatformProvider } from "./components/context/PlatformContext";
import Header from "./components/header/Header";
import User from "./components/user/User";

function App() {
  const uid: string | null = localStorage.getItem("uid");
  if (!uid) {
    localStorage.setItem("uid", Math.random().toString(36).substring(2, 10));
  }
  return (
    <PlatformProvider>
      <GlobalStyle />
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Body />}>
            <Route path="/" element={<Main />}></Route>
            <Route path="/watch" element={<Watch />}></Route>
            <Route path="/result" element={<SearchResult />}></Route>
            <Route path="/user" element={<User />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </PlatformProvider>
  );
}

export default App;
