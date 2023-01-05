import React from "react";
import styled from "styled-components";
import { StyledIconWrapper } from "../../common/style";

const StyledSearchResultHistoryWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 0.375em 0.375em 0.375em;
  box-sizing: border-box;
  align-items: center;
`;

const StyledSearchResultHistory = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  text-align: left;
  margin: 0;
  cursor: pointer;
  border-radius: var(--border--radius);
  &:hover {
    background-color: var(--primary--icon--color);
  }
`;

const SearchBarResultHistory = ({
  onClick,
  onClickRemove,
  history,
}: {
  onClick: Function;
  onClickRemove: Function;
  history: Array<String>;
}) => {
  if (history == null) return <></>;
  return (
    <>
      {history.slice(0, 3).map((item: any) => {
        return (
          <StyledSearchResultHistoryWrapper key={item}>
            <StyledSearchResultHistory
              onClick={() => {
                onClick(item);
              }}
            >
              <i className="fa-solid fa-clock-rotate-left" />
              <span
                style={{
                  width: "19.875em",
                  marginLeft: "0.375em",
                  lineHeight: "1.875em",
                }}
              >
                {item}
              </span>
            </StyledSearchResultHistory>
            <StyledIconWrapper
              sideLength="1.75em"
              transition="0"
              onClick={() => {
                onClickRemove(item);
              }}
            >
              <i
                style={{
                  lineHeight: "1.875em",
                }}
                className="fa-solid fa-xmark"
              ></i>
            </StyledIconWrapper>
          </StyledSearchResultHistoryWrapper>
        );
      })}
    </>
  );
};

export default SearchBarResultHistory;
