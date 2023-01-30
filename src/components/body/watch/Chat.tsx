import React, { BaseSyntheticEvent, useRef } from "react";
import styled from "styled-components";
import useFirebase from "../../hooks/useFirebase";
import ChatBox from "./ChatBox";

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
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const StyledChatBar = styled.div`
  box-sizing: border-box;
  overflow: hidden;
  border-radius: var(--border--radius);
  background-color: var(--color--header--background);
  width: inherit;
  margin: 0;
`;

const StyledChatAreaWrapper = styled.div`
  margin: 0.75em;
`;

const StyleChatUid = styled.span`
  display: inline-block;
  background-color: var(--color--black);
  border-radius: var(--border--radius);
  padding: 0.25em 0.75em;
  user-select: none;
`;

const StyledChatSendButton = styled.button`
  font-family: "KoPubWorldDotum";
  color: var(--color--white);
  cursor: pointer;
  padding: 0 1.125em;
  font-weight: bold;
  background-color: var(--color--main);
  border-radius: var(--border--radius);
  :hover {
    background-color: var(--color--main--hover);
  }
`;

const Chat = ({
  videoId,
  isRow,
  videoAreaHeight,
  getCurrentTime,
}: {
  videoId: string;
  isRow: boolean;
  videoAreaHeight: number;
  getCurrentTime: () => number;
}) => {
  let uid = localStorage.getItem("uid")?.toLocaleUpperCase() as string;
  let inputRef = useRef<HTMLInputElement>(null);
  const [, , sendChatData] = useFirebase();

  function sendChat() {
    let currentTime: number = getCurrentTime();
    if (inputRef.current?.value !== "")
      sendChatData(videoId, {
        currentTime,
        uid,
        text: inputRef.current!.value,
      });
    inputRef.current!.value = "";
  }

  function onInputKeyUp(e: React.KeyboardEvent): void {
    if (e.key === "Enter") {
      sendChat();
    }
  }

  function getFocus(e: BaseSyntheticEvent): void {
    if (e.target.parentNode.classList.contains("si")) {
      e.target.parentNode.classList.add("si-focusIn");
      e.target.parentNode.classList.remove("si-focusOut");
    } else {
      throw new Error("unknown parent");
    }
  }

  const lostFocus = (e: BaseSyntheticEvent): void => {
    if (e.target.parentNode.classList.contains("si")) {
      e.target.parentNode.classList.add("si-focusOut");
      e.target.parentNode.classList.remove("si-focusIn");
    } else {
      throw new Error("unknown parent");
    }
  };

  return (
    <StyledChatWrapper videoAreaHeight={videoAreaHeight} isRow={isRow}>
      <div
        style={{
          width: "calc(100% )",
          height: "2.25em",
          textAlign: "center",
        }}
      >
        <span style={{ lineHeight: "2.25em", userSelect: "none" }}>
          동영상 채팅
        </span>
      </div>
      <ChatBox
        videoId={videoId}
        getCurrentTime={getCurrentTime}
        isRow={isRow}
      ></ChatBox>
      <StyledChatAreaWrapper>
        <div>
          <StyledChatBar className="si si-focusOut">
            <input
              ref={inputRef}
              placeholder="메시지 보내기"
              style={{
                fontFamily: "KoPubWorldDotum",
                userSelect: "none",
                boxSizing: "border-box",
                color: "#fff",
                background: "transparent",
                outline: "none",
                border: "none",
                float: "left",
                width: "100%",
                height: "32.8px",
                padding: "0 6px",
                margin: "0",
              }}
              type="text"
              onFocus={getFocus}
              onBlur={lostFocus}
              onKeyUp={onInputKeyUp}
            />
          </StyledChatBar>
        </div>
        <div
          style={{
            marginTop: "0.75em",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <StyleChatUid>{"ID : " + uid}</StyleChatUid>
          <StyledChatSendButton onClick={sendChat}>전송</StyledChatSendButton>
        </div>
      </StyledChatAreaWrapper>
    </StyledChatWrapper>
  );
};

export default Chat;
