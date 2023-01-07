import React, { BaseSyntheticEvent, useEffect, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import styled from "styled-components";
import useOutsideDetector from "../hooks/useOutsideDetector";
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
  data: Array<Object>;
  isTypingNow: boolean | null;
  onClickItem: (q: string) => void;
  onClickRemove: (q: string) => void;
}

export interface SearchBarWrapperProps {
  platform: string;
}
const StyledSearchBarWrapper = styled.div<SearchBarWrapperProps>`
  max-width: 24em;
  width: 90vw;
  border-radius: var(--border--radius);
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  top: ${({ platform }) => {
    if (platform === "MOBILE") {
      return "3.25em";
    }
    return "0";
  }};
  margin: 2px 0;
`;

const SearchBar = ({
  platform,
  wrapperRef,
}: {
  platform: string;
  wrapperRef: React.RefObject<HTMLInputElement>;
}) => {
  // states
  const [history, setHistory] = useState<Array<string>>(
    JSON.parse(localStorage.getItem("history") as string)
  );
  // hooks
  const [addHistory, removeHistory] = useSearchHistory();
  const [data, requestData, resetData] = useSearchPreview();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // dom refs
  // const wrapperRef = useRef<HTMLInputElement>(null);
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

  useEffect(() => {
    if (resultRef.current && wrapperRef.current) {
      if (platform === "DESKTOP") {
        wrapperRef.current.classList.remove("hidden");
        resultRef.current.classList.add("sr-focusOut");
      }
      if (platform === "MOBILE") {
        resultRef.current.classList.remove("sr-focusOut");
      }
    }
  }, [resultRef, wrapperRef, platform]);

  const hideSearchBarResult = () => {
    if (resultRef.current && platform === "DESKTOP") {
      resultRef.current.classList.add("sr-focusOut");
    }
  };

  const pageMove = (q: string) => {
    if (inputRef.current && wrapperRef.current) {
      if (resultRef.current && platform === "DESKTOP")
        resultRef.current.classList.add("sr-focusOut");
      if (platform === "MOBILE") wrapperRef.current.classList.add("hidden");

      inputRef.current.value = q;
      addHistory(q);
      setHistory(JSON.parse(localStorage.getItem("history") as string));
      inputRef.current.blur();
      navigate(`/result?q=${q}`);
    }
  };

  const typingEndCallback = () => {
    isTypingNow.current = false;
    if (inputRef.current) {
      if (inputRef.current.value) {
        requestData(inputRef.current.value, "snippet", 3, () => {});
      } else {
        resetData();
      }
    }
  };

  const getFocus = (e: BaseSyntheticEvent): void => {
    if (e.target.parentNode.classList.contains("si")) {
      e.target.parentNode.classList.add("si-focusIn");
      e.target.parentNode.classList.remove("si-focusOut");
      if (resultRef.current && wrapperRef.current && inputRef.current) {
        if (data.length + history.length > 0) {
          resultRef.current.classList.remove("sr-focusOut");
        }
      }
    } else {
      throw new Error("unknown parent");
    }
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
    if (e.key === "Tab" && platform === "DESKTOP" && resultRef.current) {
      resultRef.current.classList.add("sr-focusOut");
    }
  };

  const searchRequest = (e: any) => {
    if (inputRef.current) {
      switch (e.type) {
        case "click": {
          if (inputRef.current.value) {
            pageMove(inputRef.current.value);
          }
          break;
        }
        case "keyup": {
          if (e.code === "Enter" && inputRef.current.value) {
            pageMove(inputRef.current.value);
          }
          break;
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

    if (inputRef.current && wrapperRef.current && resultRef.current) {
      if (inputRef.current.value !== "") {
        resultRef.current.classList.remove("sr-focusOut");
      }
      if (inputRef.current.value === "" && data.length + history.length <= 0) {
        hideSearchBarResult();
      }
    }
  };

  const onClickItem = (q: string) => {
    pageMove(q);
  };

  const onClickRemove = (q: string) => {
    let idx = -1;
    if (history != null)
      idx = history.findIndex((value) => {
        return value === q;
      });
    if (idx === -1) throw new Error(`unknown history Error ${q}`);
    if (history.length === 1 && data.length < 0) hideSearchBarResult();
    removeHistory(q);
    setHistory(JSON.parse(localStorage.getItem("history") as string));
  };

  useOutsideDetector(wrapperRef, resultRef, platform);

  return (
    <StyledSearchBarWrapper
      className="hidden"
      ref={wrapperRef}
      data-platform={platform}
      platform={platform}
    >
      <SearchBarResult
        history={history}
        data={data}
        resultRef={resultRef}
        isTypingNow={isTypingNow.current}
        onClickItem={onClickItem}
        onClickRemove={onClickRemove}
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
