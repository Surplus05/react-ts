import React, { useEffect, useRef } from "react";
import styled from "styled-components";

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
  width: ${({ width }) => `${width}px`};
  text-overflow: ellipsis;
  font-size: ${({ fontSize }) => {
    if (fontSize) return `${fontSize}px`;
    return "1em";
  }};
`;

const StyledListItemContainer = styled.div`
  position: relative;
`;

const StyledListItemWrapper = styled.div`
  position: relative;
  margin-right: 0.5em;
  border-radius: var(--border--radius);
  overflow: hidden;
  display: flex;
`;

const ListItem = ({
  onMouseEnterItem,
  onMouseLeaveItem,
  fontSize,
  item,
  width,
  height,
  imgQuality,
}: {
  onMouseEnterItem: (
    e: React.BaseSyntheticEvent,
    progressRef: React.RefObject<HTMLDivElement>
  ) => void;
  onMouseLeaveItem: (
    e: React.BaseSyntheticEvent,
    progressRef: React.RefObject<HTMLDivElement>
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
  useEffect(() => {}, []);

  return (
    <StyledListItemContainer>
      <div
        onMouseEnter={(e) => {
          onMouseEnterItem(e, progressRef);
        }}
        onMouseLeave={(e) => {
          onMouseLeaveItem(e, progressRef);
        }}
        data-list-item-listner="true"
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
