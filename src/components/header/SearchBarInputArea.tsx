import React from "react";
import styled from "styled-components";
import { SearchBarPosition, StyledIconWrapper } from "../../common/style";
import { SearchBarInputAreaProps } from "./SearchBar";

const StyledSearchInputWrapper = styled.div`
  ${SearchBarPosition}
  margin: 0.375em;
  z-index: 2;
  border-radius: var(--border-radius);
  width: calc(100% - 0.75em);
  height: 2.25em;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const StyledSearchBar = styled.div`
  box-sizing: border-box;
  overflow: hidden;
  border-radius: var(--border--radius) 0 0 var(--border--radius);
  background-color: var(--color--header--background);
  width: inherit;
  margin: 0 1px 0 0;
`;

const SearchBarInputArea = ({
  getFocus,
  lostFocus,
  onTextChange,
  searchRequest,
  detectTab,
  inputRef,
}: SearchBarInputAreaProps) => {
  return (
    <StyledSearchInputWrapper>
      <StyledSearchBar className="si si-focusOut">
        <input
          placeholder="검색"
          style={{
            userSelect: "none",
            boxSizing: "border-box",
            color: "#fff",
            background: "transparent",
            outline: "none",
            border: "none",
            float: "left",
            width: "100%",
            height: "100%",
            padding: "0 6px",
            margin: "0",
          }}
          tabIndex={1}
          onFocus={getFocus}
          onBlur={lostFocus}
          onChange={onTextChange}
          onKeyUp={searchRequest}
          onKeyDown={detectTab}
          ref={inputRef}
          type="text"
        />
      </StyledSearchBar>
      <StyledIconWrapper
        tabIndex={2}
        borderRadius={"0 0.375em 0.375em 0"}
        onClick={searchRequest}
        transition={"0"}
      >
        <i className="fa-solid fa-magnifying-glass"></i>
      </StyledIconWrapper>
    </StyledSearchInputWrapper>
  );
};

export default SearchBarInputArea;
