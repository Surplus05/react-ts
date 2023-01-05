import React from "react";
import styled from "styled-components";
import { StyledIconWrapper } from "../../common/style";
import SearchBar from "./SearchBar";

const StyledHeaderWrapper = styled.div`
  background-color: var(--color--header);
  color: var(--color--white);
  position: relative;
  width: inherit;
  height: 3.25em;
  display: flex;
  justify-content: center;
`;

const StyledHeader = styled.div`
  position: relative;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100vw;
  margin: 0 0.5em 0 0.5em;
`;

const StyledLogo = styled.a`
  color: var(--color--white);
  text-decoration: none;
  @media screen and (max-width: 512px) {
    display: none;
  }
`;

const Header = () => {
  return (
    <StyledHeaderWrapper>
      <StyledHeader>
        <StyledLogo href="/">Logo</StyledLogo>
        <SearchBar />
        <StyledIconWrapper>
          <i className="fa-solid fa-user" />
        </StyledIconWrapper>
      </StyledHeader>
    </StyledHeaderWrapper>
  );
};

export default Header;
