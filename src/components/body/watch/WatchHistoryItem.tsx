import React from "react";
import styled from "styled-components";
const StyledHistoryItemWrapper = styled.a`
  display: flex;
  width: 14.75em;
  justify-content: space-between;
  align-items: center;
  color: white;
  text-decoration: none;
  user-select: none;
`;

const StyledHistoryItemLogo = styled.img`
  width: 2.25em;
  margin: 0.5em;
  border-radius: 50%;
`;
const StyledHistoryItemTitle = styled.span`
  text-align: left;
  display: block;
  line-height: 3.25em;
  height: 3.25em;
  width: 11.5em;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const WatchHistoryItem = ({
  isExpand,
  history,
}: {
  isExpand: boolean;
  history: any;
}) => {
  return (
    <StyledHistoryItemWrapper
      href={`/watch?v=${history.videoId}&c=${history.channelId}`}
    >
      <StyledHistoryItemLogo src={history.thumbnailURL}></StyledHistoryItemLogo>
      {isExpand && (
        <StyledHistoryItemTitle>{history.title}</StyledHistoryItemTitle>
      )}
    </StyledHistoryItemWrapper>
  );
};

export default WatchHistoryItem;
