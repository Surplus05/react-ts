import React, { useContext } from "react";
import { useSearchParams } from "react-router-dom";
import styled from "styled-components";
import { PlatformContext } from "../../context/PlatformContext";
import { setDigits } from "../../service/Functions";
import PlaylistButton from "../PlaylistButton";

const StyledChannelInfoWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: auto;
  max-width: 100vw;
  border-radius: var(--border--radius);
  background-color: var(--color--black);
`;

const StyledChannelTitleWrapper = styled.div`
  max-width: calc(100% - 105px);
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;

const StyledChannelImg = styled.img`
  height: calc(100% - 2em);
  max-width: 4em;
  min-width: 2em;
  border-radius: 50%;
  margin: 1em;
`;
const StyledChannelSpan = styled.span`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const ChannelInfo = ({ channelData }: { channelData: string[] }) => {
  let context = useContext(PlatformContext);
  const [searchParams, setSearchParams] = useSearchParams();
  const videoId = searchParams.get("v") as string;
  const channelId = searchParams.get("c") as string;
  const title = document.title;
  let channelDataRaw: any;
  if (channelData.length > 0) channelDataRaw = channelData[0];
  else return <></>;
  console.log(channelDataRaw);
  console.log(context);

  return (
    <>
      <StyledChannelInfoWrapper>
        <StyledChannelTitleWrapper>
          <StyledChannelImg
            src={channelDataRaw.snippet.thumbnails.medium.url}
            alt={channelDataRaw.snippet.title}
          ></StyledChannelImg>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              maxWidth: "calc(100% - 96px)",
            }}
          >
            <StyledChannelSpan style={{ fontSize: "1.25em" }}>
              {channelDataRaw.snippet.title}
            </StyledChannelSpan>
            <StyledChannelSpan>
              {setDigits(channelDataRaw.statistics.subscriberCount) + " Subs"}
            </StyledChannelSpan>
          </div>
        </StyledChannelTitleWrapper>
        <div style={{ margin: "0 0.5em" }}>
          <PlaylistButton
            channelId={channelId}
            videoId={videoId}
            title={title}
          ></PlaylistButton>
        </div>
      </StyledChannelInfoWrapper>
    </>
  );
};

export default ChannelInfo;
