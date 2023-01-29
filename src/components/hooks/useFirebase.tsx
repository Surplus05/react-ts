import React from "react";
import {
  ref,
  child,
  set,
  get,
  push,
  query,
  orderByChild,
  startAt,
  endAt,
  limitToLast,
} from "firebase/database";
import { db } from "../service/Firebase";

export type ChatItem = {
  currentTime: number;
  uid: string;
  text: string;
};

export default function useFirebase(): [
  (videoId: string) => Promise<any>,
  (videoId: string, previusTime: number, currentTime: number) => Promise<any>,
  (
    videoId: string,
    {
      currentTime,
      uid,
      text,
    }: { currentTime: number; uid: string; text: string }
  ) => any
] {
  function checkChatData(videoId: string) {
    return get(child(ref(db), `videos/${videoId}/metaData`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          return snapshot.val();
        } else {
          set(ref(db, `videos/${videoId}`), {
            metaData: { currentUsers: 0 },
            chats: "",
          });
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }
  function getChatData(
    videoId: string,
    previusTime: number,
    currentTime: number
  ) {
    const videoRef = ref(db, `videos/${videoId}/chats`);
    const q = query(
      videoRef,
      startAt(previusTime),
      endAt(currentTime),
      limitToLast(100),
      orderByChild("currentTime")
    );
    return get(q);
  }

  function sendChatData(
    videoId: string,
    {
      currentTime,
      uid,
      text,
    }: { currentTime: number; uid: string; text: string }
  ) {
    const chatRef = ref(db, `videos/${videoId}/chats`);
    const newChatRef = push(chatRef);
    const chatData: ChatItem = {
      currentTime,
      uid,
      text,
    };
    set(newChatRef, chatData);
  }

  return [checkChatData, getChatData, sendChatData];
}
