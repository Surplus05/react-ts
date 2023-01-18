import React from "react";
import styled from "styled-components";
import { StyledIconWrapper } from "../../common/style";

const StyledUserInfoItem = styled.div`
  display: flex;
  text-align: left;
  flex-direction: row;
  font-size: 1em;
  justify-content: space-between;
  margin: 0.5em;
  align-items: center;
`;

const UserInfoItem = ({
  item,
  removeItem,
}: {
  item: string;
  removeItem: () => void;
}) => {
  return (
    <StyledUserInfoItem>
      <span
        style={{
          marginRight: "0.5em",
        }}
      >
        {item}
      </span>
      <StyledIconWrapper onClick={removeItem} sideLength="1.75em">
        <i className="fa-solid fa-xmark"></i>
      </StyledIconWrapper>
    </StyledUserInfoItem>
  );
};

export default UserInfoItem;
