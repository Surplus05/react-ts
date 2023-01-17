import React from "react";
import { useSearchParams } from "react-router-dom";
import { StyledBodyWrapper } from "../../common/style";
import List from "./List";

const SearchResult = () => {
  const [searchParams] = useSearchParams();
  let query = searchParams.get("q") as string;
  return (
    <StyledBodyWrapper>
      <List title={`${query}에 대한 검색 결과`} query={query}></List>
    </StyledBodyWrapper>
  );
};

export default SearchResult;
