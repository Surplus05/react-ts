import React, { useEffect, useContext } from "react";
import styled from "styled-components";
import { PlatformContext } from "../context/PlatformContext";
import useMainList from "../hooks/useMainList";
import ListItem from "./ListItem";

const StyledListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: left;
  width: 100vw;
  overflow: hidden;
  margin: 0.5em;
`;

const StyledListItemWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const StyledListTitle = styled.span`
  font-size: 1.5em;
  font-weight: bold;
  margin-bottom: 0.5rem;
`;

const List = ({
  title,
  videoCategoryId,
}: {
  title: string;
  videoCategoryId: string;
}) => {
  const [data, requestData] = useMainList();
  const context = useContext(PlatformContext);

  useEffect(() => {
    requestData(videoCategoryId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  let itemPerPage = 5;
  let imgQuality = "high";

  let width = 0;
  if (context.platform === "DESKTOP") {
    imgQuality = "high";
    if (context.innerWidth >= 1024) {
      itemPerPage = 5;
    } else if (context.innerWidth >= 768 && context.innerWidth < 1024) {
      itemPerPage = 4;
    } else if (context.innerWidth < 768) {
      itemPerPage = 3;
    }
  } else {
    imgQuality = "medium";
    itemPerPage = 2;
  }
  width = (context.innerWidth - 16) / itemPerPage - 8 + 8 / itemPerPage;

  const height = (width * 9) / 16;

  return (
    <StyledListWrapper>
      <StyledListTitle>{title}</StyledListTitle>
      <StyledListItemWrapper>
        {data.map((item: any) => {
          return (
            <ListItem
              item={item}
              width={width}
              height={height}
              imgQuality={imgQuality}
              key={item.etag}
            />
          );
        })}
      </StyledListItemWrapper>
    </StyledListWrapper>
  );
};

export default List;
