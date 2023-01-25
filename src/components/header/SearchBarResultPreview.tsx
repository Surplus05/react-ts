import React from "react";
import { decode } from "html-entities";
import {
  StyledSearchResultItem,
  StyledSearchResultItemWrapper,
} from "../../common/style";

const SearchBarResultPreview = ({ data }: { data: Array<Object> }) => {
  if (data == null) return <></>;
  return (
    <>
      {data.slice(0, 3).map((item: any) => {
        const query = decode(item.snippet.title);

        return (
          <StyledSearchResultItemWrapper key={item.id.videoId}>
            <StyledSearchResultItem href={`/result?q=${query}`}>
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
