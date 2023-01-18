import React, { useState } from "react";
import { StyledUserInfoItemWrapper } from "../../common/style";
import usePlaylist, { Playlist } from "../hooks/usePlaylist";
import UserInfoItem from "./UserInfoItem";

const PlaylistItem = () => {
  const [, removePlaylist] = usePlaylist();
  const [playlist, setPlaylist] = useState<Array<Playlist>>(
    JSON.parse(localStorage.getItem("playlist") as string)
  );
  return (
    <StyledUserInfoItemWrapper>
      <span
        style={{
          display: "block",
        }}
      >
        재생목록
      </span>
      {playlist.map((item) => {
        return (
          <UserInfoItem
            removeItem={() => {
              removePlaylist(item.videoId);
              setPlaylist(
                JSON.parse(localStorage.getItem("playlist") as string)
              );
            }}
            key={item.videoId}
            item={item.title}
          />
        );
      })}
    </StyledUserInfoItemWrapper>
  );
};

export default PlaylistItem;
