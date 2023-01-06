import React from "react";
import { decode } from "html-entities";
import {
  StyledSearchResultItem,
  StyledSearchResultItemWrapper,
} from "../../common/style";

const SearchBarResultPreview = ({
  onClickPreview,
  data,
}: {
  onClickPreview: Function;
  data: Array<Object>;
}) => {
  if (data == null) return <></>;
  return (
    <>
      {data.slice(0, 3).map((item: any) => {
        const query = decode(item.snippet.title);

        return (
          <StyledSearchResultItemWrapper key={item.id.videoId}>
            <StyledSearchResultItem
              onClick={() => {
                onClickPreview(query);
              }}
            >
              <i className="fa-solid fa-magnifying-glass" />
              <span
                style={{
                  maxWidth: "21.75em",
                  marginLeft: "0.375em",
                  lineHeight: "1.875em",
                }}
              >
                {query}
              </span>
            </StyledSearchResultItem>
          </StyledSearchResultItemWrapper>
        );
      })}
    </>
  );
};

export default SearchBarResultPreview;
