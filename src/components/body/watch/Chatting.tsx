import React, { useRef, useEffect } from "react";
import styled from "styled-components";
import { processTime } from "../../service/Functions";

const StyledChatWrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: calc(100% - 1em);
  margin: 0.5em;
  flex-wrap: wrap;
  color: #eee;
`;

const Chatting = ({ chat }: { chat: any }) => {
  const chatRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatRef.current) chatRef.current.scrollIntoView();
  }, []);

  return (
    <StyledChatWrapper ref={chatRef}>
      <span style={{ marginRight: "0.5em", userSelect: "none" }}>
        {`${chat.uid}(${processTime(chat.currentTime)}) :`}
      </span>
      <span style={{ maxWidth: "calc(100% - 1em)" }}>{chat.text}</span>
    </StyledChatWrapper>
  );
};

export default Chatting;
