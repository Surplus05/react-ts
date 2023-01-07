import React, { useEffect, useState, useRef } from "react";
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
  border-bottom: 2px solid #000;
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
`;

const Header = () => {
  const [platform, setPlatform] = useState<string>("null");
  const wrapperRef = useRef<HTMLInputElement>(null);

  const toggleSearchBar = () => {
    if (wrapperRef.current) wrapperRef.current.classList.toggle("hidden");
  };
  useEffect(() => {
    if (window.innerWidth < 500) setPlatform("MOBILE");
    else {
      setPlatform("DESKTOP");
    }
  }, []);

  useEffect(() => {
    function eventHandler(event: any) {
      if (event.target.innerWidth < 500 && platform === "DESKTOP") {
        setPlatform("MOBILE");
      } else if (event.target.innerWidth > 500 && platform === "MOBILE") {
        setPlatform("DESKTOP");
      }
    }
    window.addEventListener("resize", eventHandler);
    return () => {
      window.removeEventListener("resize", eventHandler);
    };
  }, [platform]);
  return (
    <StyledHeaderWrapper>
      <StyledHeader>
        <StyledLogo href="/">Logo</StyledLogo>
        <SearchBar platform={platform} wrapperRef={wrapperRef} />
        {platform === "MOBILE" && (
          <StyledIconWrapper
            className="toggleBtn"
            onClick={toggleSearchBar}
            tabIndex={2}
          >
            <i className="fa-solid fa-magnifying-glass toggleBtn" />
          </StyledIconWrapper>
        )}
        <StyledIconWrapper tabIndex={3}>
          <i className="fa-solid fa-user" />
        </StyledIconWrapper>
      </StyledHeader>
    </StyledHeaderWrapper>
  );
};

export default Header;
