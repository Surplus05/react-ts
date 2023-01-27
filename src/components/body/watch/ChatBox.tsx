import React, { useEffect, useState } from "react";
import useFirebase from "../../hooks/useFirebase";

const ChatBox = ({ videoId }: { videoId: string }) => {
  const [getAllChatData, getOneChatData, , listenChatCount] = useFirebase();
  const [chatData, setChatData] = useState<any>(null);
  useEffect(() => {
    if (videoId != null) {
      getAllChatData(videoId).then((data: any) => {
        setChatData(data);
      });

      listenChatCount(videoId, (chatIdx: any) => {
        // chatIdx : 업데이트된 chatCount.
        // 현재 ChatCount 와의 차이만큼 받아와야 함.
        //  getOneChatData 함수 chatIdx- chatCount 번 실행해야 함.
        // getOneChatData(videoId, chatIdx).then((data: any) => {
        //   // console.log(data); // new data received
        //   기존 chatData 에다가 data 를 추가해주자..
        // });
      });
    }
  }, [videoId]);

  return <div>Chatting Box</div>;
};

export default ChatBox;
