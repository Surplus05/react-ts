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
  // hooks
  const [checkChatData, getChatData] = useFirebase();

  // states
  const [update, setUpdate] = useState<boolean>(false);

  // refs
  const chatData = useRef<Array<any>>([]);
  const previousTime = useRef<number>(0);
  const preventDuplicate = useRef<boolean>(false);
  const interval = useRef<any>();

  useEffect(() => {
    checkChatData(videoId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (videoId != null) {
      if (interval.current) {
        clearInterval(interval.current);
      }
      interval.current = setInterval(() => {
        let currentTime = getCurrentTime();
        if (previousTime.current === currentTime) {
          if (preventDuplicate.current) return;
          preventDuplicate.current = true;
        }
        if (previousTime.current > currentTime) {
          chatData.current = [];
          previousTime.current = 0;
        }
        getChatData(videoId, previousTime.current, currentTime).then(
          (snapshot) => {
            if (snapshot.val() != null) {
              snapshot.forEach((chatData: any) => {
                pushToState(chatData.val());
              });
            }
            previousTime.current = currentTime;
          }
        );
      }, 500); // chat 가져올 interval
    }
    return () => {
      if (interval.current) {
        clearInterval(interval.current);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    <StyledChatBoxWrapper isRow={isRow} className="chatBox scroll">
      {chatData.current.length > 0 &&
        chatData.current.map((chat: any) => {
          return <Chatting key={chat.currentTime} chat={chat}></Chatting>;
        })}
    </StyledChatBoxWrapper>
  );
};

export default ChatBox;
