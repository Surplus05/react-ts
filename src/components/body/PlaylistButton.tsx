import React, { useEffect, useState } from "react";
import styled from "styled-components";
import usePlaylist, { Playlist } from "../hooks/usePlaylist";

const StyledAddButton = styled.span`
  cursor: pointer;
  font-size: 0.75em;
  text-align: center;
  user-select: none;
  background: var(--color--titleBar);
  display: block;
  border-radius: var(--border--radius);
  margin: 0.5em 0;
  transition: 0.25s;
  padding: 0.5em;
  &:hover {
    background-color: var(--color--icon);
  }
`;

const PlaylistButton = ({
  videoId,
  title,
}: {
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
    addPlaylist(videoId, title);
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
