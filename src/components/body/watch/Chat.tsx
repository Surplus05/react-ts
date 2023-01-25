import React from "react";
import styled from "styled-components";

interface ChatWrapperProps {
  isRow: boolean;
  videoAreaHeight: number;
}

const StyledChatWrapper = styled.div<ChatWrapperProps>`
  background-color: var(--color--header);
  width: ${({ isRow }) => {
    if (!isRow) return "100%";
    return "21.25em";
  }};
  height: ${({ videoAreaHeight }) => {
    if (videoAreaHeight !== -1)
      return `calc(100vh - ${videoAreaHeight + 54 + 96}px)`;
  }};
`;

const Chat = ({
  isRow,
  videoAreaHeight,
}: {
  isRow: boolean;
  videoAreaHeight: number;
}) => {
  return (
    <StyledChatWrapper videoAreaHeight={videoAreaHeight} isRow={isRow}>
      Chatting Box
    </StyledChatWrapper>
  );
};

export default Chat;
