import React, { useEffect, useState, useRef } from "react";
import useFirebase from "../../hooks/useFirebase";

const ChatBox = ({
  videoId,
  getCurrentTime,
}: {
  videoId: string;
  getCurrentTime: () => number;
}) => {
  const [checkChatData, getChatData] = useFirebase();
  const [chatData, setChatData] = useState<any>({});
  const previusTime = useRef<number>(0);
  const interval = useRef<any>();
  console.log(chatData);
  useEffect(() => {
    if (videoId != null) {
      checkChatData(videoId).then((data: any) => {
        interval.current = setInterval(() => {
          let currentTime = getCurrentTime();
          if (previusTime.current === currentTime) return;
          if (previusTime.current > currentTime) {
            setChatData([]);
            previusTime.current = 0;
          }
          getChatData(videoId, previusTime.current, currentTime).then(
            (snapshot) => {
              if (snapshot.val() != null) {
                // snapshot.val()을 state Data 에 더해주자.
                // state Data 가 100 넘기는 경우 오래된것 부터 제거
                console.log(snapshot.val());
              }
              previusTime.current = currentTime;
            }
          );
        }, 1000); // chat 가져올 interval
      });
    }
    return () => {
      if (interval.current) {
        clearInterval(interval.current);
      }
    };
  }, [videoId]);

  return <div style={{ flexGrow: "1" }}>Chatting Box</div>;
};

export default ChatBox;
