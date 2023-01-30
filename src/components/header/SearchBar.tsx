import React, {
  BaseSyntheticEvent,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import styled from "styled-components";
import { PlatformContext } from "../context/PlatformContext";
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
  z-index: 1;
`;

const SearchBar = ({
  wrapperRef,
}: {
  wrapperRef: React.RefObject<HTMLInputElement>;
}) => {
  // contexts
  const context = useContext(PlatformContext);

  // states
  const [history, setHistory] = useState<Array<string>>(
    JSON.parse(localStorage.getItem("searchHistory") as string)
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
        setHistory(JSON.parse(localStorage.getItem("searchHistory") as string));
      }
      if (history == null) {
        setHistory([]);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (resultRef.current && wrapperRef.current) {
      if (context.platform === "DESKTOP") {
        wrapperRef.current.classList.remove("hidden");
        resultRef.current.classList.add("sr-focusOut");
      }
    }
  }, [resultRef, wrapperRef, context.platform]);

  useOutsideDetector(wrapperRef, resultRef, context.platform);

  const hideSearchBarResult = () => {
    if (resultRef.current && context.platform === "DESKTOP") {
      resultRef.current.classList.add("sr-focusOut");
    }
  };

  const pageMove = (q: string) => {
    if (inputRef.current && wrapperRef.current) {
      if (resultRef.current && context.platform === "DESKTOP")
        resultRef.current.classList.add("sr-focusOut");
      if (context.platform === "MOBILE")
        wrapperRef.current.classList.add("hidden");
      inputRef.current.value = q;
      addHistory(q);
      setHistory(JSON.parse(localStorage.getItem("searchHistory") as string));
      inputRef.current.blur();
      resetData();
      navigate(`/result?q=${q}`);
    }
  };

  const typingEndCallback = () => {
    isTypingNow.current = false;
    if (inputRef.current) {
      if (inputRef.current.value) {
        requestData(inputRef.current.value, 3, () => {});
      } else {
        resetData();
      }
    }
  };

  const getFocus = (e: BaseSyntheticEvent): void => {
    const parent = e.target.parentNode;
    if (parent.classList.contains("si")) {
      parent.classList.replace("si-focusOut", "si-focusIn");
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
    const parent = e.target.parentNode;
    if (parent.classList.contains("si")) {
      parent.classList.replace("si-focusIn", "si-focusOut");
    } else {
      throw new Error("unknown parent");
    }
  };

  const detectTab = (e: React.KeyboardEvent): void => {
    if (
      e.key === "Tab" &&
      context.platform === "DESKTOP" &&
      resultRef.current
    ) {
      resultRef.current.classList.add("sr-focusOut");
    }
  };

  const searchRequest = (e: any) => {
    if (inputRef.current) {
      if (inputRef.current.value) {
        if (e.type === "click" || (e.type === "keyup" && e.code === "Enter")) {
          pageMove(inputRef.current.value);
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
      if (inputRef.current.value === "" && history.length <= 0) {
        hideSearchBarResult();
      }
    }
  };

  const onClickRemove = (q: string) => {
    if (history.some((value) => value === q)) {
      if (history.length === 1 && data.length === 0) hideSearchBarResult();
      removeHistory(q);
      setHistory(JSON.parse(localStorage.getItem("searchHistory") as string));
    } else {
      throw new Error(`unknown searchHistory Error ${q}`);
    }
  };

  return (
    <StyledSearchBarWrapper
      className="hidden"
      ref={wrapperRef}
      data-platform={context.platform}
      platform={context.platform}
    >
      <SearchBarResult
        history={history}
        data={data}
        resultRef={resultRef}
        isTypingNow={isTypingNow.current}
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
