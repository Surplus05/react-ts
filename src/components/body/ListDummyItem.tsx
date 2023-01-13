import React from "react";
import styled from "styled-components";
import { StyledListItemWrapper } from "../../common/style";

interface ListDummyItemProps {
  width: number;
  height: number;
  itemPerPage?: number;
}

const StyledListDummyItem = styled.div<ListDummyItemProps>`
  background: var(--color--header);
  margin-right: 0.5em;
  border-radius: var(--border--radius);
  z-index: 3;
  width: ${({ width }) => {
    return `${width}px`;
  }};
  height: ${({ height }) => {
    return `${height}px`;
  }};
`;

const ListDummyItem = ({ width, height, itemPerPage }: ListDummyItemProps) => {
  let array: Array<any> = [];
  for (let index = 0; index < itemPerPage!; index++) {
    array.push(`dummy ${index}`);
  }
  return (
    <StyledListItemWrapper>
      {array.map((item: any) => {
        return (
          <StyledListDummyItem
            key={item}
            width={width}
            height={height}
          ></StyledListDummyItem>
        );
      })}
    </StyledListItemWrapper>
  );
};

export default ListDummyItem;
