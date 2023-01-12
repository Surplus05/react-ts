import React, { useEffect, useContext, useRef } from "react";
import styled from "styled-components";
import { PlatformContext } from "../context/PlatformContext";
import useMainList from "../hooks/useMainList";
import ListItem from "./ListItem";

const MAXIMUM_ITEM_PER_LIST = 10;

const StyledListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: left;
  width: 100vw;
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
}: {
  title: string;
  videoCategoryId: string;
}) => {
  const [data, requestData] = useMainList();
  const context = useContext(PlatformContext);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const popupRef = useRef<HTMLDivElement>(null);
  const translatePrev = useRef<number>(0);
  const maxWidth = useRef<number>(0);

  const hoverTimerId: React.MutableRefObject<NodeJS.Timeout | null> =
    useRef<NodeJS.Timeout | null>(null);
  const isDraggingRef = useRef<boolean>(false);

  let startX = -1;
  let endX = -1;
  let itemPerPage = 5;
  let fontSize = 1;
  let imgQuality = "high";
  let width = 0;
  let height = 0;

  if (context.platform === "DESKTOP") {
    imgQuality = "high";
    if (context.innerWidth >= 1024) {
      fontSize = 0.875;
      itemPerPage = 5;
    } else if (context.innerWidth >= 768 && context.innerWidth < 1024) {
      fontSize = 0.75;
      itemPerPage = 4;
    } else if (context.innerWidth >= 500 && context.innerWidth < 768) {
      fontSize = 0.75;
      itemPerPage = 3;
    }
  } else {
    fontSize = 0.625;
    imgQuality = "medium";
    itemPerPage = 2;
  }
  width = (context.innerWidth - 16) / itemPerPage - 8 + 8 / itemPerPage;
  if (context.innerWidth >= 1440) {
    width = 1440 / itemPerPage - 8 + 8 / itemPerPage;
  }
  height = (width * 9) / 16;

  useEffect(() => {
    requestData(videoCategoryId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    let innerWidth = context.innerWidth > 1440 ? 1440 : context.innerWidth;
    if (wrapperRef.current) {
      let listWidth = (width + 8) * MAXIMUM_ITEM_PER_LIST;
      maxWidth.current = -listWidth + innerWidth;
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
  }, [data, context.innerWidth, width]);

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
  }, [width, wrapperRef]);

  function setTranslate(quantity: number) {
    if (wrapperRef.current) {
      wrapperRef.current.style.transform = `translateX(${quantity}px)`;
    }
  }

  function onDragStart(e: MouseEvent | TouchEvent) {
    e.preventDefault();
    if (e.target) preventHover(e.target);
    if (wrapperRef.current) {
      switch (e.type) {
        case "mousedown": {
          startX = (e as MouseEvent).screenX;
          break;
        }
        case "touchstart": {
          startX = (e as TouchEvent).targetTouches[0].screenX;
          break;
        }
        default:
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
    switch (e.type) {
      case "mousemove": {
        endX = (e as MouseEvent).screenX;
        break;
      }
      case "touchmove": {
        endX = (e as TouchEvent).targetTouches[0].screenX;
        break;
      }
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
        // wrapperRef.current.addEventListener("mouseup", clickItem);
      }
      setTranslate(translatePrev.current);
      setTimeout(() => {
        if (wrapperRef.current) {
          wrapperRef.current.style.transition = "";
          wrapperRef.current.addEventListener("mousedown", onDragStart);
          wrapperRef.current.addEventListener("touchstart", onDragStart);
          // wrapperRef.current.addEventListener("mouseup", clickItem);
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
      setTimeout(() => {
        isDraggingRef.current = false;
      }, 0);
      // mouseup 이벤트가 click 이벤트보다 더 빨리 발동.
      // onClickItem 에서는 isDragging의 boolean 값으로 클릭을 판별하나
      // isDragging값은 이미 false 로 변경되었음 -> 감지불가.
      // setTimeout 0 를 주어 boolean 값 변경이 click 이벤트 뒤에 나오도록 함.
    }
  }

  function onMouseEnterItem(
    e: React.BaseSyntheticEvent,
    progressRef: React.RefObject<HTMLDivElement>,
    item: any
  ) {
    if (!isDraggingRef.current) {
      if (hoverTimerId.current) clearInterval(hoverTimerId.current);
      hoverTimerId.current = setTimeout(() => {
        popupItem(item);
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

  function popupItem(item: any) {
    if (wrapperRef.current) {
      wrapperRef.current.removeEventListener("mousedown", onDragStart);
      wrapperRef.current.removeEventListener("touchstart", onDragStart);
    }
    if (isDraggingRef.current === false && wrapperRef.current) {
      console.log("click");
      console.log(item);
      popupRef.current!.style.visibility = "visible";
      popupRef.current!.style.width = "100%";
      popupRef.current!.style.height = "100%";
      popupRef.current!.style.position = "absolute";
      popupRef.current!.style.backgroundColor = "beige";
      popupRef.current!.style.zIndex = "2";
    }
    if (hoverTimerId.current) clearInterval(hoverTimerId.current);
  }

  return (
    <StyledListWrapper>
      <StyledListTitle>{title}</StyledListTitle>
      <StyledListItemWrapper
        style={{ transform: "translateX(0px)" }}
        ref={wrapperRef}
      >
        {data.map((item: any) => {
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
      </StyledListItemWrapper>
      {width > 0 && (
        <div
          className="popupTarget"
          ref={popupRef}
          style={{
            position: "absolute",
            maxWidth: "90em",
            width: `${width}px`,
            height: `${height}px`,
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
            transition: "0.3s",
            visibility: "hidden",
          }}
        ></div>
      )}
    </StyledListWrapper>
  );
};

export default List;
