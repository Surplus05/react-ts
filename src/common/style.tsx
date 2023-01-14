import styled, { createGlobalStyle, keyframes } from "styled-components";

const GlobalStyle = createGlobalStyle`
:root {
  --color--header: #18181B;
  --color--body:#0e0e10;
  --color--icon: #35363a;
  --color--icon--hover: #40413f;
  --color--black: #0E0E10;
  --color--white: #fff;
  --color--title: #0000009f;
  --color--titleBar:#4b4b4b33;

  --border--radius: 0.375em;

  --primary--black--color: #191f28;
  --primary--color: #ee7272;
  --primary--color--hover:#ef8080;
  --primary--header--background: rgb(16,16,16);
  --primary--search--background: rgb(50, 50, 50);
  --primary--search--background--hover: rgba(255, 255, 255, 0.25);
  --primary--loading-circle-color: rgba(128,128,128,1);
  --primary--item--title--background: rgba(255,255,255,0.5);
}

body {
  margin: 0;
  padding: 0;
  font-family: 'KoPubWorldDotum';
}
body::-webkit-scrollbar {
  display: none; /* Chrome, Safari, Opera*/
}

.sr-focusOut, .hidden {
  position: absolute;
  z-index: -1;
  visibility: hidden;
}
.si-focusIn {
  border: 2px solid var(--primary--color);
  background-color: #000;
}
.si-focusOut {
  border: 2px solid transparent;
  &:hover {
    border: 2px solid var(--primary--search--background--hover);
  }
}
.fa-solid {
  font-size: 1.25em;
}
.pt-inactive{
  display:none;
  position: absolute;
}

`;

export default GlobalStyle;

export interface IconWrapperProps {
  borderRadius?: string;
  sideLength?: string;
  transition?: string;
}

export const StyledIconWrapper = styled.div<IconWrapperProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: ${({ borderRadius }) => {
    if (borderRadius) {
      return borderRadius;
    }
    return "var(--border--radius)";
  }};

  ${({ sideLength }) => {
    if (sideLength) {
      return `
      min-width: ${sideLength};
      width: ${sideLength};
      height: ${sideLength};
    `;
    }
    return `
      min-width: 2.25em;
      width: 2.25em;
      height: 2.25em;
    `;
  }};

  background-color: var(--color--icon);
  transition: ${({ transition }) => {
    if (transition) {
      return transition;
    }
    return "0.3s";
  }};
  cursor: pointer;
  &:hover {
    background-color: var(--color--icon--hover);
  }
`;

export const SearchBarPosition = `
  position: absolute;
  top: 0;
  left: 0;
`;

export const StyledSearchResultItemWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 0.375em 0.375em 0.375em;
  box-sizing: border-box;
  align-items: center;
`;

export const StyledSearchResultItem = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  text-align: left;
  width: 100%;
  margin: 0;
  cursor: pointer;
  border-radius: var(--border--radius);
  &:hover {
    background-color: var(--color--icon--hover);
  }
`;

export const StyledBodyWrapper = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100vw;
  min-height: calc(100vh - 3.375em);
  margin-bottom: 0.5em;
`;

export const StyledListItemWrapper = styled.div`
  position: relative;
  margin-right: 0.5em;
  border-radius: var(--border--radius);
  overflow: hidden;
  display: flex;
`;

export const fadeInPopupItem = (x: number, y: number) => keyframes`
  from{
    width: 0px;
    height: 0px;
  }
  to {
    width: ${x}px;
    height: ${y}px;
  }
`;
