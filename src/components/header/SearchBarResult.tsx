import React from "react";
import styled from "styled-components";
import Loadingcircle from "../Loadingcircle";
import { SearchBarResultProps } from "./SearchBar";
import SearchBarResultHistory from "./SearchBarResultHistory";
import SearchBarResultPreview from "./SearchBarResultPreview";

const StyledSearchBarResult = styled.div`
  max-width: 24em;
  border-radius: var(--border--radius);
  padding: 3em 0 0 0;
  background-color: var(--color--header);
  box-shadow: 0px 0px 0.25em 0.05em #000;
  z-index: 1;
`;

const SearchBarResult = ({
  resultRef,
  history,
  data,
  isTypingNow,
  onClickRemove,
}: SearchBarResultProps) => {
  return (
    <StyledSearchBarResult ref={resultRef}>
      {isTypingNow && <Loadingcircle />}
      <SearchBarResultPreview data={data} />
      <SearchBarResultHistory history={history} onClickRemove={onClickRemove} />
    </StyledSearchBarResult>
  );
};

export default SearchBarResult;
