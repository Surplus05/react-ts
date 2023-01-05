import styled, { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
:root {
  --color--header: #18181B;
  --color--icon: #35363a;
  --color--icon--hover: #40413f;
  --color--black: #0E0E10;
  --color--white: #fff;

  --border--radius: 6px;

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
.sr-focusOut {
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

  width: ${({ sideLength }) => {
    if (sideLength) {
      return sideLength;
    }
    return "2.25em";
  }};

  height: ${({ sideLength }) => {
    if (sideLength) {
      return sideLength;
    }
    return "2.25em";
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
