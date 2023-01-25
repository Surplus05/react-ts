import React, { useEffect, useState } from "react";
import { StyledAddButton } from "../../common/style";
import usePlaylist, { Playlist } from "../hooks/usePlaylist";

const PlaylistButton = ({
  channelId,
  videoId,
  title,
}: {
  channelId: string;
  videoId: string;
  title: string;
}) => {
  const [addPlaylist, removePlaylist] = usePlaylist();
  const [isInPlaylist, setIsInPlaylist] = useState<boolean>(false);
  let playlist = localStorage.getItem("playlist");

  useEffect(() => {
    if (playlist != null) {
      const temp: Array<Playlist> = JSON.parse(playlist);
      const idx = temp.findIndex((value) => {
        return value.videoId === videoId;
      });
      if (idx >= 0) setIsInPlaylist(true);
      else {
        setIsInPlaylist(false);
      }
    }
  }, [videoId, isInPlaylist, playlist]);

  function onClickAddBtn() {
    addPlaylist(channelId, videoId, title);
    setIsInPlaylist(true);
  }
  function onClickDelBtn() {
    removePlaylist(videoId);
    setIsInPlaylist(false);
  }

  return (
    <>
      {!isInPlaylist && (
        <StyledAddButton onClick={onClickAddBtn}>
          재생목록에 추가
        </StyledAddButton>
      )}
      {isInPlaylist && (
        <StyledAddButton onClick={onClickDelBtn}>
          재생목록에서 제거
        </StyledAddButton>
      )}
    </>
  );
};

export default PlaylistButton;
