import React from "react";
import styled, { keyframes } from "styled-components";

const StyledLoadingCircleWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  padding-bottom: 0.375em;
`;
const circleRotate = keyframes`
   to {
      transform: rotate(1turn);
   }`;

const StyledLoadingCircle = styled.div`
  background-color: transparent;
  border-radius: 50%;
  border: 6px solid transparent;
  border-top: 6px solid var(--primary--loading-circle-color);
  width: 2.25em;
  height: 2.25em;
  animation: ${circleRotate} 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
`;

const Loadingcircle = () => {
  return (
    <StyledLoadingCircleWrapper>
      <StyledLoadingCircle />
    </StyledLoadingCircleWrapper>
  );
};

export default Loadingcircle;
