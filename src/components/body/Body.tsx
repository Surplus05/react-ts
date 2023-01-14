import React from "react";
import { Outlet } from "react-router";
import styled from "styled-components";

const StyledBodyWrapper = styled.div`
  min-height: calc(100vh - 3.375em);
  padding-top: calc(3.375em);
  background: var(--color--body);
  color: var(--color--white);
  display: flex;
  justify-content: center;
`;

const Body = () => {
  return (
    <StyledBodyWrapper>
      <Outlet />
    </StyledBodyWrapper>
  );
};

export default Body;
