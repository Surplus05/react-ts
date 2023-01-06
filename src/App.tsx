import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import GlobalStyle from "./common/style";
import Header from "./components/header/Header";

function App() {
  return (
    <>
      <GlobalStyle />
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path={"/"} element={<>메인페이지. 추천비디오 표시</>}></Route>
          <Route path={"/result"} element={<>검색. 검색결과 표시</>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
