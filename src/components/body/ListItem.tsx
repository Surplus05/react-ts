import React, { useRef } from "react";
import styled from "styled-components";
import { StyledListItemWrapper } from "../../common/style";

interface ListItemTitleProps {
  fontSize?: string;
  width: number;
}

const StyledListItemTitle = styled.span<ListItemTitleProps>`
  background: var(--color--title);
  padding: 0.25em;
  position: absolute;
  display: inline-block;
  white-space: nowrap;
  overflow: hidden;
  user-select: none;
  font-weight: bold;
  text-overflow: ellipsis;
  width: ${({ width }) => `${width - 7}px`};
  font-size: ${({ fontSize }) => {
    if (fontSize) return `${fontSize}px`;
    return "1em";
  }};
`;

const StyledListItemContainer = styled.div`
  position: relative;
`;

const ListItem = ({
  onMouseEnterItem,
  onMouseLeaveItem,
  onClickItem,
  fontSize,
  item,
  width,
  height,
  imgQuality,
}: {
  onMouseEnterItem: (
    e: React.BaseSyntheticEvent,
    progressRef: React.RefObject<HTMLDivElement>,
    item: any,
    eventTargetRef: React.RefObject<HTMLDivElement>
  ) => void;
  onMouseLeaveItem: (
    e: React.BaseSyntheticEvent,
    progressRef: React.RefObject<HTMLDivElement>
  ) => void;
  onClickItem: (
    item: any,
    eventTargetRef: React.RefObject<HTMLDivElement>
  ) => void;
  fontSize: number;
  item: any;
  width: number;
  height: number;
  imgQuality: string;
}) => {
  const imgSrc =
    imgQuality === "high"
      ? item.snippet.thumbnails.high.url
      : item.snippet.thumbnails.medium.url;
  const progressRef: React.RefObject<HTMLDivElement> =
    useRef<HTMLDivElement>(null);
  const eventTargetRef: React.RefObject<HTMLDivElement> =
    useRef<HTMLDivElement>(null);
  return (
    <StyledListItemContainer>
      <div
        onMouseEnter={(e) => {
          onMouseEnterItem(e, progressRef, item, eventTargetRef);
        }}
        onMouseLeave={(e) => {
          onMouseLeaveItem(e, progressRef);
        }}
        onTouchEnd={() => {
          onClickItem(item, eventTargetRef);
        }}
        onClick={() => {
          onClickItem(item, eventTargetRef);
        }}
        className="li-eventTarget"
        ref={eventTargetRef}
        style={{
          zIndex: 1,
          position: "absolute",
          width: width,
          height: height,
        }}
      ></div>
      <div
        ref={progressRef}
        style={{
          zIndex: 1,
          position: "absolute",
          width: 0,
          height: "0.2em",
          background: "red",
          bottom: "0",
        }}
      ></div>
      <StyledListItemWrapper>
        <StyledListItemTitle width={width} fontSize={`${fontSize * 16}`}>
          {item.snippet.localized.title + " | " + item.snippet.channelTitle}
        </StyledListItemTitle>
        <img
          style={{ objectFit: "cover", userSelect: "none" }}
          width={width}
          height={height}
          src={imgSrc}
          alt={item.snippet.localized.title}
        />
      </StyledListItemWrapper>
    </StyledListItemContainer>
  );
};

export default ListItem;
