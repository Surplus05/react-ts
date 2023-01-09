import React from "react";
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

const StyledListItemWrapper = styled.div`
  position: relative;
  margin-right: 0.5em;
  border-radius: var(--border--radius);
  overflow: hidden;
  display: flex;
`;

const ListItem = ({
  fontSize,
  item,
  width,
  height,
  imgQuality,
}: {
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

  return (
    <StyledListItemWrapper>
      <StyledListItemTitle width={width} fontSize={`${fontSize * 16}`}>
        {item.snippet.localized.title}
      </StyledListItemTitle>
      <img
        draggable={false}
        style={{ objectFit: "cover", userSelect: "none" }}
        width={width}
        height={height}
        src={imgSrc}
        alt={item.snippet.localized.title}
      />
    </StyledListItemWrapper>
  );
};

export default ListItem;
