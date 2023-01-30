import React from "react";
import { StyledBodyWrapper } from "../../common/style";
import List from "./List";
const videoCategories = [
  { id: "0", title: "Trending Videos in Korea" },
  { id: "10", title: "Music" },
  { id: "17", title: "Sports" },
  { id: "20", title: "Game" },
  { id: "24", title: "Entertainment" },
  { id: "25", title: "News & Politics" },
  { id: "28", title: "Science & Technology" },
];

const Main = () => {
  return (
    <StyledBodyWrapper>
      {videoCategories.map(({ id, title }) => (
        <List key={id} title={title} videoCategoryId={id} />
      ))}
    </StyledBodyWrapper>
  );
};

export default Main;
