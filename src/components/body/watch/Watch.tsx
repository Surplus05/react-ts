import React, { useContext, useEffect, useState, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import styled from "styled-components";
import { PlatformContext } from "../../context/PlatformContext";
import useChannelData from "../../hooks/useChannelData";
import useWatchHistory from "../../hooks/useWatchHistory";
import History from "./History";
import Video from "./Video";

const StyledWatchWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
`;

const Watch = () => {
  const context = useContext(PlatformContext);
  const [searchParams] = useSearchParams();
  const [isExpand, setIsExpand] = useState<boolean>(true);
  const [isRow, setIsRow] = useState<boolean>(false);
  const player = useRef<any>(null);
  const [data, requestData] = useChannelData();
  const [addHistory, removeHistory] = useWatchHistory();
  const videoId = searchParams.get("v") as string;
  const channelId = searchParams.get("c") as string;

  let videoAreaHeight: number;

  if (context.innerWidth >= 900) {
    videoAreaHeight = -1;
  } else if (context.innerWidth < 900 && context.innerWidth > 500) {
    videoAreaHeight = ((context.innerWidth - 52) * 9) / 16;
  } else {
    videoAreaHeight = (context.innerWidth * 9) / 16;
  }

  useEffect(() => {}, [channelId, requestData]);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://www.youtube.com/iframe_api";
    const root = document.getElementsByTagName("head")[0];
    root.appendChild(script);
    (window as any).onYouTubeIframeAPIReady = () => {
      player.current = new (window as any).YT.Player("player", {
        height: "auto",
        width: "auto",
        videoId: videoId,
        playerVars: {
          autoplay: 1,
          controls: 1,
          modestbranding: 1,
          rel: 0,
          fs: 1,
        },
        events: {
          onReady: onPlayerReady,
        },
      });
    };
  }, [videoId]);

  useEffect(() => {
    if (context.innerWidth >= 1280) {
      setIsExpand(true);
    } else {
      setIsExpand(false);
    }

    if (context.innerWidth >= 900) setIsRow(true);
    else setIsRow(false);
  }, [context.innerWidth]);

  function onPlayerReady(event: any): void {
    event.target.playVideo();
    document.title = event.target.videoTitle;
    requestData(channelId, (url: string) => {
      addHistory(channelId, videoId, event.target.videoTitle, url);
    });
  }

  return (
    <StyledWatchWrapper>
      <History
        innerWidth={context.innerWidth}
        isExpand={isExpand}
        setIsExpand={setIsExpand}
      ></History>
      <Video
        videoAreaHeight={videoAreaHeight}
        channelData={data}
        isRow={isRow}
      ></Video>
    </StyledWatchWrapper>
  );
};
export default Watch;