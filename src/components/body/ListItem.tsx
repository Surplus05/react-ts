import React from "react";
import styled from "styled-components";

const StyledListItemWrapper = styled.div`
  margin-right: 0.5em;
  display: flex;
`;

const ListItem = ({
  item,
  width,
  height,
  imgQuality,
}: {
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
      <img
        style={{ objectFit: "cover" }}
        width={width}
        height={height}
        src={imgSrc}
        alt={item.snippet.localized.title}
      />
      {/* <span>{item.snippet.localized.title}</span>; */}
    </StyledListItemWrapper>
  );
};

export default ListItem;
