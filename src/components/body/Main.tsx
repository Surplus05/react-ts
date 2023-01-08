import React from "react";
import { StyledBodyWrapper } from "../../common/style";
import List from "./List";

const Main = () => {
  return (
    <StyledBodyWrapper>
      <List title={"Trending in Korea"} videoCategoryId={"0"}></List>
    </StyledBodyWrapper>
  );
};

export default Main;
