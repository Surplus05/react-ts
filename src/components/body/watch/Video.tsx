import React from "react";
import styled from "styled-components";
import ChannelInfo from "./ChannelInfo";
import Chat from "./Chat";

interface VideoWrapperProps {
  isRow: boolean;
}

const StyledVideoWrapper = styled.div<VideoWrapperProps>`
  display: flex;
  justify-content: space-between;
  background-color: var(--color--black);
  flex-grow: 1;
  color: #fff;
  flex-direction: ${({ isRow }) => {
    if (isRow) return "row";
    return "column";
  }};
`;

const StyledVideoArea = styled.div`
  display: flex;
  flex-direction: column;
  background-color: var(--color--black);
  flex-grow: 1;
  max-height: calc(100vh - 3.375em);
  ::-webkit-scrollbar {
    display: none;
  }
`;

const StyledVideo = styled.div`
  user-select: none;
  aspect-ratio: 16/9;
  max-height: calc(100% - 6em);
  background-color: #888;
`;

const Video = ({
  isRow,
  videoAreaHeight,
  channelData,
}: {
  isRow: boolean;
  videoAreaHeight: number;
  channelData: string[];
}) => {
  return (
    <StyledVideoWrapper isRow={isRow}>
      <StyledVideoArea>
        <StyledVideo id="player"></StyledVideo>
        <ChannelInfo channelData={channelData}></ChannelInfo>
      </StyledVideoArea>
      <Chat videoAreaHeight={videoAreaHeight} isRow={isRow}></Chat>
    </StyledVideoWrapper>
  );
};

export default Video;
