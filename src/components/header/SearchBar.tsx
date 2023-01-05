import React, { BaseSyntheticEvent, useEffect, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import styled from "styled-components";
import useSearchHistory from "../hooks/useSearchHistory";
import useSearchPreview from "../hooks/useSearchPreview";
import SearchBarInputArea from "./SearchBarInputArea";
import SearchBarResult from "./SearchBarResult";

export interface SearchBarInputAreaProps {
  getFocus: (e: BaseSyntheticEvent) => void;
  lostFocus: (e: BaseSyntheticEvent) => void;
  onTextChange: () => void;
  searchRequest: (e: BaseSyntheticEvent) => void;
  detectTab: (e: React.KeyboardEvent) => void;
  inputRef: React.RefObject<HTMLInputElement>;
}

export interface SearchBarResultProps {
  resultRef: React.RefObject<HTMLDivElement>;
  history: Array<string>;
  data: Array<string>;
  isTypingNow: boolean | null;
}
const StyledSearchBarWrapper = styled.div`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  top: 0;
  margin: 2px 0;
`;

const SearchBar = () => {
  // states
  const [history, setHistory] = useState<Array<string>>(
    JSON.parse(localStorage.getItem("history") as string)
  );
  // hooks
  const [addHistory, removeHistory] = useSearchHistory();
  const [data, requestData, resetData] = useSearchPreview();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  // dom refs
  const inputRef = useRef<HTMLInputElement>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  // var refs (need to be memorized)
  const timerId: React.MutableRefObject<NodeJS.Timeout | null> =
    useRef<NodeJS.Timeout | null>(null);
  const isTypingNow: React.MutableRefObject<boolean | null> = useRef<
    boolean | null
  >(null);

  // useEffects
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.value = searchParams.get("q") as string;
      if (inputRef.current.value !== "") {
        addHistory(inputRef.current.value);
        setHistory(JSON.parse(localStorage.getItem("history") as string));
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const pageMove = () => {
    if (inputRef.current) {
      if (resultRef.current) resultRef.current.classList.add("sr-focusOut");
      addHistory(inputRef.current.value);
      setHistory(JSON.parse(localStorage.getItem("history") as string));
      inputRef.current.blur();
      navigate(`/result?q=${inputRef.current.value}`);
    }
  };

  const typingEndCallback = () => {
    isTypingNow.current = false;
    if (inputRef.current) {
      if (inputRef.current.value) {
        // requestData(inputRef.current.value, "snippet", 3, () => {});
      } else {
        resetData();
      }
    }
  };

  const getFocus = (e: BaseSyntheticEvent): void => {
    if (e.target.parentNode.classList.contains("si")) {
      e.target.parentNode.classList.add("si-focusIn");
      e.target.parentNode.classList.remove("si-focusOut");
      if (resultRef.current) resultRef.current.classList.remove("sr-focusOut");
    } else {
      throw new Error("unknown parent");
    }
    // searchWrapperView();
  };

  const lostFocus = (e: BaseSyntheticEvent): void => {
    if (e.target.parentNode.classList.contains("si")) {
      e.target.parentNode.classList.add("si-focusOut");
      e.target.parentNode.classList.remove("si-focusIn");
    } else {
      throw new Error("unknown parent");
    }
  };

  const detectTab = (e: React.KeyboardEvent): void => {
    if (e.key === "Tab" && resultRef.current)
      resultRef.current.classList.add("sr-focusOut");
  };

  const searchRequest = (e: any) => {
    if (inputRef.current) {
      switch (e.type) {
        case "click": {
          pageMove();
          break;
        }
        case "keyup": {
          if (e.code === "Enter" && inputRef.current.value) {
            pageMove();
            break;
          }
        }
      }
    }
  };

  const onTextChange = () => {
    if (!isTypingNow.current) {
      resetData();
      if (resultRef.current) resultRef.current.classList.remove("si-focusOut");
      timerId.current = setTimeout(typingEndCallback, 500);
      isTypingNow.current = true;
    } else {
      if (timerId.current != null) clearInterval(timerId.current);
      timerId.current = setTimeout(typingEndCallback, 500);
    }
  };

  return (
    <StyledSearchBarWrapper>
      <SearchBarResult
        history={history}
        data={data}
        resultRef={resultRef}
        isTypingNow={isTypingNow.current}
      />
      <SearchBarInputArea
        getFocus={getFocus}
        lostFocus={lostFocus}
        onTextChange={onTextChange}
        searchRequest={searchRequest}
        detectTab={detectTab}
        inputRef={inputRef}
      />
    </StyledSearchBarWrapper>
  );
};

export default SearchBar;
