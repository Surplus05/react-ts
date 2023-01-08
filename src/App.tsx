import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import GlobalStyle from "./common/style";
import Body from "./components/body/Body";
import Main from "./components/body/Main";
import { PlatformProvider } from "./components/context/PlatformContext";
import Header from "./components/header/Header";

function App() {
  return (
    <PlatformProvider>
      <GlobalStyle />
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Body />}>
            <Route path="/" element={<Main />}></Route>
            <Route path="/result" element={<>검색. 검색결과 표시</>}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </PlatformProvider>
  );
}

export default App;
