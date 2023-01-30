import React from "react";
import { decode } from "html-entities";
import {
  StyledIconWrapper,
  StyledSearchResultItem,
  StyledSearchResultItemWrapper,
} from "../../common/style";

const SearchBarResultHistory = ({
  onClickRemove,
  history,
}: {
  onClickRemove: Function;
  history: Array<String>;
}) => {
  if (history == null) return <></>;
  return (
    <>
      {history.slice(0, 3).map((item: any) => {
        const query = decode(item);

        return (
          <StyledSearchResultItemWrapper key={query}>
            <StyledSearchResultItem
              href={`/result?q=${query}`}
              style={{
                width: "100%",
                marginRight: "0.375em",
              }}
            >
              <i className="fa-solid fa-clock-rotate-left" />
              <span
                style={{
                  maxWidth: "19.5em",
                  marginLeft: "0.375em",
                  lineHeight: "1.875em",
                }}
              >
                {query}
              </span>
            </StyledSearchResultItem>
            <StyledIconWrapper
              data-type="removeButton"
              sideLength="1.75em"
              transition="0"
              onClick={() => {
                onClickRemove(query);
              }}
            >
              <i
                data-type="removeButton"
                style={{
                  lineHeight: "1.875em",
                }}
                className="fa-solid fa-xmark"
              ></i>
            </StyledIconWrapper>
          </StyledSearchResultItemWrapper>
        );
      })}
    </>
  );
};

export default SearchBarResultHistory;
