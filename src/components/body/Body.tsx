import React from "react";
import { Outlet } from "react-router";
import styled from "styled-components";

const StyledBodyWrapper = styled.div`
  height: calc(100vh - 3.25em);
  background: var(--color--body);
  color: var(--color--white);
`;

const Body = () => {
  return (
    <StyledBodyWrapper>
      <Outlet />
    </StyledBodyWrapper>
  );
};

export default Body;
