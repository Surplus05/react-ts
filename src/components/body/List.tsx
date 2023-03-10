import React, { useEffect, useContext, useRef, useState } from "react";
import styled from "styled-components";
import { PlatformContext } from "../context/PlatformContext";
import useSearchPreview from "../hooks/useSearchPreview";
import useContentsSizes from "../hooks/useContentsSizes";
import useMainList from "../hooks/useMainList";
import ListDummyItem from "./ListDummyItem";
import ListItem from "./ListItem";
import PopupItem from "./PopupItem";

const MAXIMUM_ITEM_PER_LIST = 10;

const StyledListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: calc(100vw - 1em);
  max-width: 90em;
  overflow: hidden;
  margin: 0.5em;
  position: relative;
`;

const StyledListItemWrapper = styled.div`
  /* overflow: hidden; */
  width: fit-content;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const StyledListTitle = styled.span`
  font-size: 1.5em;
  font-weight: bold;
  margin-bottom: 0.5rem;
`;

const List = ({
  title,
  videoCategoryId,
  query,
}: {
  title: string;
  videoCategoryId?: string;
  query?: string;
}) => {
  let data: any;
  let requestData: any;
  const [trendingData, requestTrendingData] = useMainList();
  const [searchData, requestSearchData] = useSearchPreview();
  if (videoCategoryId != null) {
    data = trendingData;
    requestData = requestTrendingData;
  }
  if (query != null) {
    data = searchData;
    requestData = requestSearchData;
  }

  const context = useContext(PlatformContext);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const translatePrev = useRef<number>(0);
  const maxWidth = useRef<number>(0);
  const [popupItemCompoent, setPopupItemCompoent] =
    useState<JSX.Element | null>(null);

  const hoverTimerId: React.MutableRefObject<NodeJS.Timeout | null> =
    useRef<NodeJS.Timeout | null>(null);
  const isDraggingRef = useRef<boolean>(false);

  let startX = -1;
  let endX = -1;
  let [itemPerPage, fontSize, imgQuality, width, height] = useContentsSizes();

  useEffect(() => {
    if (videoCategoryId != null) requestData(videoCategoryId);
    if (query != null) requestData(query, MAXIMUM_ITEM_PER_LIST);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  useEffect(() => {
    const innerWidth = Math.min(context.innerWidth, 1440);
    if (wrapperRef.current) {
      const listWidth = (width + 8) * MAXIMUM_ITEM_PER_LIST;
      maxWidth.current = innerWidth - listWidth;
      if (context.innerWidth <= 1440) maxWidth.current -= 8;
      translatePrev.current = Number(
        wrapperRef.current.style.transform.replaceAll(/[^0-9,^-]/g, "")
      );
      if (
        maxWidth.current > translatePrev.current &&
        translatePrev.current !== 0
      ) {
        setTranslate(maxWidth.current);
      }
    }
  }, [context.innerWidth, width]);

  useEffect(() => {
    if (wrapperRef.current) {
      wrapperRef.current.addEventListener("mousedown", onDragStart);
      wrapperRef.current.addEventListener("touchstart", onDragStart);
    }

    return () => {
      if (wrapperRef.current) {
        wrapperRef.current.removeEventListener("mousedown", onDragStart);
        // eslint-disable-next-line react-hooks/exhaustive-deps
        wrapperRef.current.removeEventListener("touchstart", onDragStart);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function setTranslate(quantity: number) {
    if (wrapperRef.current) {
      wrapperRef.current.style.transform = `translateX(${quantity}px)`;
    }
  }

  function onDragStart(e: MouseEvent | TouchEvent) {
    e.preventDefault();
    if (e.target) preventHover(e.target);
    if (wrapperRef.current) {
      if (e.type === "mousedown") {
        startX = (e as MouseEvent).screenX;
      } else if (e.type === "touchstart") {
        startX = (e as TouchEvent).targetTouches[0].screenX;
      } else {
        throw new Error("Unknown Event Type");
      }

      wrapperRef.current.addEventListener("mousemove", onDragMove);
      wrapperRef.current.addEventListener("touchmove", onDragMove);
      wrapperRef.current.addEventListener("mouseleave", onDragEnd);
      wrapperRef.current.addEventListener("touchend", onDragEnd);
      wrapperRef.current.addEventListener("mouseup", onDragEnd);
    }
  }

  function onDragMove(e: MouseEvent | TouchEvent) {
    if (!isDraggingRef.current) {
      isDraggingRef.current = true;
    }
    if (e.type === "mousemove") {
      endX = (e as MouseEvent).screenX;
    } else if (e.type === "touchmove") {
      endX = (e as TouchEvent).targetTouches[0].screenX;
    } else {
      throw new Error("Unknown Event Type");
    }
    let translate = translatePrev.current - (startX - endX);
    if (translate > 0) {
      setTranslate(translate / itemPerPage);
      return;
    } else if (maxWidth.current > translate) {
      setTranslate(
        maxWidth.current - (maxWidth.current - translate) / itemPerPage
      );
      return;
    }

    setTranslate(translate);
  }

  function onDragEnd(e: MouseEvent | TouchEvent) {
    function exceedLimits(side: string) {
      translatePrev.current = side === "left" ? 0 : maxWidth.current;
      if (wrapperRef.current) {
        wrapperRef.current.style.transition = "0.3s ease-out";
        wrapperRef.current.removeEventListener("mousedown", onDragStart);
        wrapperRef.current.removeEventListener("touchstart", onDragStart);
      }
      setTranslate(translatePrev.current);
      setTimeout(() => {
        if (wrapperRef.current) {
          wrapperRef.current.style.transition = "";
          wrapperRef.current.addEventListener("mousedown", onDragStart);
          wrapperRef.current.addEventListener("touchstart", onDragStart);
        }
      }, 300);
    }
    if (wrapperRef.current) {
      translatePrev.current = Number(
        wrapperRef.current.style.transform.replaceAll(
          /[^0-9^-]+[^a-z^0-9^-]/g,
          ""
        )
      );
      if (translatePrev.current > 0) {
        exceedLimits("left");
      } else if (maxWidth.current > translatePrev.current) {
        exceedLimits("right");
      }
      wrapperRef.current.removeEventListener("mousemove", onDragMove);
      wrapperRef.current.removeEventListener("touchmove", onDragMove);
      wrapperRef.current.removeEventListener("mouseleave", onDragEnd);
      wrapperRef.current.removeEventListener("mouseup", onDragEnd);
      wrapperRef.current.removeEventListener("touchend", onDragEnd);

      setTimeout(() => {
        isDraggingRef.current = false;
      }, 0);
      // mouseup ???????????? click ??????????????? ??? ?????? ??????.
      // onClickItem ????????? isDragging??? boolean ????????? ????????? ????????????
      // isDragging?????? ?????? false ??? ??????????????? -> ????????????.
      // setTimeout 0 ??? ?????? boolean ??? ????????? click ????????? ?????? ???????????? ???.
    }
  }

  function onMouseEnterItem(
    e: React.BaseSyntheticEvent,
    progressRef: React.RefObject<HTMLDivElement>,
    item: any,
    eventTargetRef: React.RefObject<HTMLDivElement>
  ) {
    if (!isDraggingRef.current) {
      if (hoverTimerId.current) clearInterval(hoverTimerId.current);
      hoverTimerId.current = setTimeout(() => {
        popupItem(item, eventTargetRef);
      }, 1500);
      if (progressRef.current) {
        progressRef.current.style.width = `${width}px`;
        progressRef.current.style.transition = "1s linear";
      }
    }
  }
  function onMouseLeaveItem(
    e: React.BaseSyntheticEvent,
    progressRef: React.RefObject<HTMLDivElement>
  ) {
    if (hoverTimerId.current) clearInterval(hoverTimerId.current);
    if (progressRef.current) {
      progressRef.current.style.transition = "0s";
      progressRef.current.style.width = `0px`;
    }
  }

  function preventHover(e: any) {
    let progressBar: HTMLDivElement;
    if (hoverTimerId.current) clearInterval(hoverTimerId.current);
    if (e.className === "li-eventTarget") {
      progressBar = e.parentNode.children[1];
      progressBar.style.transition = "0s";
      progressBar.style.width = `0px`;
    }
  }

  function popupItem(
    item: any,
    eventTargetRef: React.RefObject<HTMLDivElement>
  ) {
    if (!isDraggingRef.current) {
      setPopupItemCompoent(
        <PopupItem item={item} setPopupItemCompoent={setPopupItemCompoent} />
      );
    }
    if (hoverTimerId.current) clearInterval(hoverTimerId.current);
  }

  return (
    <>
      <StyledListWrapper>
        <StyledListTitle>{title}</StyledListTitle>
        <StyledListItemWrapper
          style={{ transform: "translateX(0px)" }}
          ref={wrapperRef}
        >
          {data.length > 0 &&
            data.map((item: any) => {
              return (
                <ListItem
                  onMouseEnterItem={onMouseEnterItem}
                  onMouseLeaveItem={onMouseLeaveItem}
                  onClickItem={popupItem}
                  fontSize={fontSize}
                  item={item}
                  width={width}
                  height={height}
                  imgQuality={imgQuality}
                  key={item.etag}
                />
              );
            })}
          {data.length === 0 && (
            <ListDummyItem
              itemPerPage={itemPerPage}
              width={width}
              height={height}
            />
          )}
        </StyledListItemWrapper>
      </StyledListWrapper>
      {popupItemCompoent}
    </>
  );
};

export default List;
