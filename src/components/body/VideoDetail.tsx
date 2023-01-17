import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { setDigits } from "../service/Functions";
import { getVideoDetail } from "../service/Youtube";
import VideoDetailComments from "./VideoDetailComments";
import VideoDetailDivision from "./VideoDetailDivision";

const StyledTagWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;
const StyledStatWrapper = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: center;
  user-select: none;
`;

const StyledTag = styled.span`
  font-size: 0.875em;
  user-select: none;
  background: var(--color--titleBar);
  display: inline-block;
  border-radius: 1em;
  margin: 0.25em;
  padding: 0.5em 0.75em;
`;
const StyledDescWrapper = styled.div`
  margin: 0.5em 0;
`;

const VideoDetail = ({
  videoId,
  videoSnippet,
  fontSize,
}: {
  videoId: string;
  videoSnippet: any;
  fontSize: number;
}) => {
  const [statistics, setStatistics] = useState<any>();
  let date = new Date(videoSnippet.publishedAt);
  let dateString = `${date.getFullYear()}년 ${
    date.getMonth() + 1
  }월 ${date.getDate()}일`;
  let processedViews: string = "";
  if (statistics != null) {
    processedViews = setDigits(statistics.viewCount);
  }

  useEffect(() => {
    // Request Detail
    if (videoId != null) {
      getVideoDetail(videoId).then((res) => {
        setStatistics(res.data.items[0].statistics);
      });
    }
  }, [videoId]);

  if (statistics == null) return <></>;
  return (
    <>
      <StyledStatWrapper>
        <span>{processedViews} Views</span>
        <span>{dateString} 업로드</span>
      </StyledStatWrapper>
      <StyledTagWrapper style={{ fontSize: `${fontSize}em` }}>
        {videoSnippet.tags &&
          videoSnippet.tags.map((tag: any, index: number) => {
            if (index < 5) return <StyledTag key={index}>{tag}</StyledTag>;
          })}
      </StyledTagWrapper>
      <VideoDetailDivision />

      <StyledDescWrapper style={{ fontSize: `${fontSize}em` }}>
        {videoSnippet.description
          .split("\n")
          .map((line: string, index: number) => {
            return (
              <span key={index}>
                {line}
                <br />
              </span>
            );
          })}
      </StyledDescWrapper>
      <VideoDetailDivision />
      <span>{statistics.commentCount} Total Comments</span>

      <VideoDetailComments
        videoId={videoId}
        fontSize={fontSize}
      ></VideoDetailComments>
    </>
  );
};

export default VideoDetail;
