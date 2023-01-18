import React, { useState } from "react";
import { StyledUserInfoItemWrapper } from "../../common/style";
import useSearchHistory from "../hooks/useSearchHistory";
import UserInfoItem from "./UserInfoItem";

const SearchHistory = () => {
  const [, removeHistory] = useSearchHistory();
  const [history, setHistory] = useState<Array<string>>(
    JSON.parse(localStorage.getItem("history") as string)
  );
  return (
    <StyledUserInfoItemWrapper>
      <span
        style={{
          display: "block",
        }}
      >
        검색 기록
      </span>
      {history.map((item: string) => {
        return (
          <UserInfoItem
            removeItem={() => {
              removeHistory(item);
              setHistory(JSON.parse(localStorage.getItem("history") as string));
            }}
            key={item}
            item={item}
          />
        );
      })}
    </StyledUserInfoItemWrapper>
  );
};

export default SearchHistory;
