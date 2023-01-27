import React from "react";
import {
  ref,
  child,
  onValue,
  set,
  get,
  runTransaction,
  Unsubscribe,
} from "firebase/database";
import { db } from "../service/Firebase";

type ChatItem = {
  publishedAt: number;
  uid: string;
  text: string;
};

export default function useFirebase(): [
  (videoId: string) => Promise<any>,
  (videoId: string, chatIdx: number) => Promise<any>,
  (videoId: string, { publishedAt, uid, text }: ChatItem) => any,
  (videoId: string, callback: Function) => Unsubscribe
] {
  function getAllChatData(videoId: string) {
    return get(child(ref(db), `videos/${videoId}`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          return snapshot.val();
        } else {
          set(ref(db, `videos/${videoId}`), {
            chatCount: 0,
          });
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function getOneChatData(videoId: string, chatIdx: number) {
    return get(child(ref(db), `videos/${videoId}/${chatIdx - 1}/`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          return snapshot.val();
        } else {
          set(ref(db, `videos/${videoId}`), {
            chatCount: 0,
          });
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function sendChatData(videoId: string, { publishedAt, uid, text }: ChatItem) {
    const chatRef = ref(db, `videos/${videoId}/`);

    const chatData: ChatItem = {
      publishedAt,
      uid,
      text,
    };

    runTransaction(chatRef, (chat) => {
      if (chat) {
        chat[`${chat.chatCount}`] = chatData;
        chat.chatCount++;
      }
      return chat;
    });
  }

  function listenChatCount(videoId: string, callback: Function) {
    const starCountRef = ref(db, `videos/${videoId}/chatCount`);
    return onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        callback(data);
      }
    });
  }

  return [getAllChatData, getOneChatData, sendChatData, listenChatCount];
}
