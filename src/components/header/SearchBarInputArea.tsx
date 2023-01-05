import React from "react";
import styled from "styled-components";
import { SearchBarPosition, StyledIconWrapper } from "../../common/style";
import { SearchBarInputAreaProps } from "./SearchBar";

const StyledSearchInputWrapper = styled.div`
  ${SearchBarPosition}
  margin: 0.375em;
  z-index: 2;
  border-radius: var(--border-radius);
  height: 2.25em;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const StyledSearchBar = styled.div`
  box-sizing: border-box;
  overflow: hidden;
  border-radius: var(--border--radius) 0 0 var(--border--radius);
  background-color: var(--primary--search--background);
  width: 21em;
  margin: 0 1px 0 0;
  transition: 0.3s;
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
          onFocus={getFocus}
          onBlur={lostFocus}
          onChange={onTextChange}
          onKeyUp={searchRequest}
          onKeyDown={detectTab}
          ref={inputRef}
          type="text"
        />
      </StyledSearchBar>
      <StyledIconWrapper borderRadius={"0 6px 6px 0"} onClick={searchRequest}>
        <i className="fa-solid fa-magnifying-glass"></i>
      </StyledIconWrapper>
    </StyledSearchInputWrapper>
  );
};

export default SearchBarInputArea;
