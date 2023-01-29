import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import useFirebase from "../../hooks/useFirebase";
import Chatting from "./Chatting";

interface ChatBoxProps {
  isRow: boolean;
}

const StyledChatBoxWrapper = styled.div<ChatBoxProps>`
  flex-grow: 1;
  height: ${({ isRow }) => {
    if (isRow) {
      return "calc(100vh - 12.175em)";
    } else return "calc(100% - 8.8em)";
  }};

  margin: 0 0.75em;
  overflow-y: scroll;
  overflow-x: hidden;
`;

const ChatBox = ({
  videoId,
  getCurrentTime,
  isRow,
}: {
  videoId: string;
  getCurrentTime: () => number;
  isRow: boolean;
}) => {
  const [checkChatData, getChatData] = useFirebase();
  const [update, setUpdate] = useState<boolean>(false);
  const chatData = useRef<Array<any>>([]);
  const previusTime = useRef<number>(0);
  const preventDuplicate = useRef<boolean>(false);
  const interval = useRef<any>();

  useEffect(() => {
    checkChatData(videoId);
  }, []);

  useEffect(() => {
    if (videoId != null) {
      if (interval.current) {
        clearInterval(interval.current);
      }
      interval.current = setInterval(() => {
        let currentTime = getCurrentTime();
        if (previusTime.current === currentTime) {
          if (preventDuplicate.current) return;
          preventDuplicate.current = true;
        }
        if (previusTime.current > currentTime) {
          chatData.current = [];
          previusTime.current = 0;
        }
        getChatData(videoId, previusTime.current, currentTime).then(
          (snapshot) => {
            if (snapshot.val() != null) {
              snapshot.forEach((chatData: any) => {
                pushToState(chatData.val());
                // chatData.val() 를 push 해주자.
                // state array 는 maximum length가 100인 array.
                // Circular Queue? -> 순서 뒤죽박죽
                // push 할 때 마다 하나씩 제거를 해주어야 함.
              });
            }
            previusTime.current = currentTime;
          }
        );
      }, 500); // chat 가져올 interval
    }
    return () => {
      if (interval.current) {
        clearInterval(interval.current);
      }
    };
  }, [update]);

  function pushToState(data: Object) {
    if (chatData.current.length === 100) {
      chatData.current = [...chatData.current.slice(1), data];
    } else {
      chatData.current = [...chatData.current, data];
    }
    setUpdate(!update);
  }

  return (
    <StyledChatBoxWrapper isRow={isRow} className="scroll">
      {chatData.current.length > 0 &&
        chatData.current.map((chat: any) => {
          return <Chatting key={chat.currentTime} chat={chat}></Chatting>;
        })}
    </StyledChatBoxWrapper>
  );
};

export default ChatBox;
