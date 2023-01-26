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
  --color--titleBar:#272727;
  --color--division:#808080;
  --color--search--background: rgb(50, 50, 50);
  --color--header--background: rgb(16,16,16);
  --color--header--background--hover: rgba(255, 255, 255, 0.25);
  --color--main: #9E9DFF;
  --color--main--hover: #8685EF;
  --color--loadingCircle:rgba(128,128,128,1);

  --border--radius: 0.375em;

}

body {
  margin: 0;
  padding: 0;
  font-family: 'KoPubWorldDotum';
}
body::-webkit-scrollbar {
  display: none;
}

.sr-focusOut, .hidden {
  position: absolute;
  z-index: -1;
  visibility: hidden;
}
.si-focusIn {
  border: 2px solid var(--color--main);
  background-color: #000;
}
.si-focusOut {
  border: 2px solid transparent;
  &:hover {
    border: 2px solid var(--color--header--background--hover);
  }
}
.fa-solid {
  font-size: 1.25em;
}
.pt-inactive{
  display:none;
  position: absolute;
}

.scroll {
  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: transparent;
}
  &:hover::-webkit-scrollbar-thumb {
    border-radius: var(--border--radius);
    background-color: gray;
  }
}
`;

export default GlobalStyle;

export interface IconWrapperProps {
  borderRadius?: string;
  sideLength?: string;
  transition?: string;
  backgroundColor?: string;
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

  background-color: ${({ backgroundColor }) => {
    if (backgroundColor) {
      return backgroundColor;
    }
    return "var(--color--icon)";
  }};

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

export const StyledIconLink = styled.a<IconWrapperProps>`
  color: var(--color--white);
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

export const StyledSearchResultItem = styled.a`
  color: var(--color--white);
  text-decoration: none;
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

export const StyledUserInfoItemWrapper = styled.div`
  border: 0.125em solid #888;
  flex-direction: column;
  user-select: none;
  text-align: center;
  margin: 1em;
  padding: 1em;
  border-radius: var(--border--radius);
  background: var(--color--header);
  max-width: 24em;
`;

export const StyledAddButton = styled.span`
  cursor: pointer;
  font-size: 0.75em;
  text-align: center;
  user-select: none;
  background: var(--color--titleBar);
  display: block;
  border-radius: var(--border--radius);
  margin: 0.5em 0;
  transition: 0.25s;
  padding: 0.5em;
  &:hover {
    background-color: var(--color--icon);
  }
`;

export const CONTENTS_WIDTH = "21.25em";

export const HEADER_HEIGHT = "3.375em";
