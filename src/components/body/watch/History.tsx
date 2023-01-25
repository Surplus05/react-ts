import React, { useRef } from "react";
import styled from "styled-components";
import { StyledIconWrapper } from "../../../common/style";

interface HistoryWrapperProps {
  isExpand: boolean;
}

const StyledHistoryWrapper = styled.div<HistoryWrapperProps>`
  background-color: var(--color--header);
  width: ${({ isExpand }) => {
    if (isExpand) return "15em";
    else return "3.25em";
  }};
`;

const StyledTitleDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 0.25em;
  padding: 0.25em;
`;

const StyledHistoryIconWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0.25em;
  padding: 0.75em;
`;

const History = ({
  innerWidth,
  isExpand,
  setIsExpand,
}: {
  innerWidth: number;
  isExpand: boolean;
  setIsExpand: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  if (innerWidth <= 500) return <></>;
  return (
    <StyledHistoryWrapper isExpand={isExpand}>
      {innerWidth >= 1280 && (
        <StyledTitleDiv>
          {isExpand && (
            <span
              style={{
                lineHeight: "36px",
                textAlign: "center",
                display: "inline-block",
              }}
            >
              같이보기 기록
            </span>
          )}
          <StyledIconWrapper
            id="button"
            onClick={() => {
              setIsExpand(!isExpand);
            }}
            style={{
              transform: `${isExpand ? "rotate(180deg)" : ""}`,
            }}
            backgroundColor="var(--icon--header)"
            transition="0"
          >
            <i className="fa-solid fa-arrow-right" />
          </StyledIconWrapper>
        </StyledTitleDiv>
      )}
      {!isExpand && (
        <StyledHistoryIconWrapper
          style={{
            color: "var(--color--division)",
          }}
        >
          <i className="fa-solid fa-clock-rotate-left" />
        </StyledHistoryIconWrapper>
      )}
    </StyledHistoryWrapper>
  );
};
export default History;
