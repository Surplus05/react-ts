import React from "react";
import { StyledBodyWrapper } from "../../common/style";
import List from "./List";

const Main = () => {
  return (
    <StyledBodyWrapper>
      <List title={"Trending Videos in Korea"} videoCategoryId={"0"}></List>
      <List title={"Music"} videoCategoryId={"10"}></List>
      <List title={"Sports"} videoCategoryId={"17"}></List>
      <List title={"Gaming"} videoCategoryId={"20"}></List>
      <List title={"Entertainment"} videoCategoryId={"24"}></List>
      <List title={"News & Politics"} videoCategoryId={"25"}></List>
      <List title={"Science & Technology"} videoCategoryId={"28"}></List>
    </StyledBodyWrapper>
  );
};

export default Main;
