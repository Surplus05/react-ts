import React, { useContext, useRef } from "react";
import styled from "styled-components";
import { StyledIconLink, StyledIconWrapper } from "../../common/style";
import { PlatformContext } from "../context/PlatformContext";
import SearchBar from "./SearchBar";

const StyledHeaderWrapper = styled.div`
  background-color: var(--color--header);
  color: var(--color--white);
  z-index: 10;
  position: fixed;
  width: 100vw;
  height: 3.25em;
  display: flex;
  justify-content: center;
  border-bottom: 2px solid #000;
`;

const StyledHeader = styled.div`
  position: relative;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: calc(100vw - 1em);
  margin: 0 0.5em 0 0.5em;
`;

const StyledLogo = styled.a`
  color: var(--color--white);
  text-decoration: none;
  font-weight: bold;
`;

const Header = () => {
  const wrapperRef = useRef<HTMLInputElement>(null);
  const context = useContext(PlatformContext);

  const toggleSearchBar = () => {
    if (wrapperRef.current) wrapperRef.current.classList.toggle("hidden");
  };

  return (
    <StyledHeaderWrapper>
      <StyledHeader>
        <StyledLogo href="/">Logo</StyledLogo>
        <SearchBar wrapperRef={wrapperRef} />
        {context.platform === "MOBILE" && (
          <StyledIconWrapper
            className="toggleBtn"
            onClick={toggleSearchBar}
            tabIndex={2}
          >
            <i className="fa-solid fa-magnifying-glass toggleBtn" />
          </StyledIconWrapper>
        )}
        <StyledIconLink href="/user" tabIndex={3}>
          <i className="fa-solid fa-user" />
        </StyledIconLink>
      </StyledHeader>
    </StyledHeaderWrapper>
  );
};

export default Header;
