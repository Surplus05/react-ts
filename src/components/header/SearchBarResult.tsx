import React from "react";
import styled from "styled-components";
import Loadingcircle from "../Loadingcircle";
import { SearchBarResultProps } from "./SearchBar";
import SearchBarResultHistory from "./SearchBarResultHistory";

const StyledSearchBarResult = styled.div`
  width: 24em;
  border-radius: var(--border--radius);
  padding: 3em 1px 0 0;
  background-color: var(--color--header);
  box-shadow: 0 0 0.25em #000;
  z-index: 1;
`;

const SearchBarResult = ({
  resultRef,
  history,
  data,
  isTypingNow,
}: SearchBarResultProps) => {
  return (
    <StyledSearchBarResult className="sr-focusOut" ref={resultRef}>
      <SearchBarResultHistory
        history={history}
        onClick={() => {}}
        onClickRemove={() => {}}
      />
      {isTypingNow && <Loadingcircle />}
    </StyledSearchBarResult>
  );
};

export default SearchBarResult;
