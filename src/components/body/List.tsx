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
`;

const StyledListItemWrapper = styled.div`
  overflow: hidden;
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
  const translatePrev = useRef<number>(0);
  const maxWidth = useRef<number>(0);

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
    }
    translatePrev.current = Number(
      wrapperRef.current!.style.transform.replaceAll(/[^0-9,^-]/g, "")
    );
    if (
      maxWidth.current > translatePrev.current &&
      translatePrev.current !== 0
    ) {
      setTranslate(maxWidth.current);
    }
  }, [data, context.innerWidth, width]);

  useEffect(() => {
    let localRef: HTMLDivElement;
    if (wrapperRef.current) {
      localRef = wrapperRef.current;
      wrapperRef.current.addEventListener("mousedown", onDragStart);
      wrapperRef.current.addEventListener("touchstart", onDragStart);
    }

    return () => {
      if (localRef) {
        localRef.removeEventListener("mousedown", onDragStart);
        localRef.removeEventListener("touchstart", onDragStart);
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
    if (wrapperRef.current) {
      wrapperRef.current.addEventListener("mouseleave", onDragEnd);
      wrapperRef.current.addEventListener("mousemove", onDragMove);
      wrapperRef.current.addEventListener("touchmove", onDragMove);
      wrapperRef.current.addEventListener("mouseup", onDragEnd);
      wrapperRef.current.addEventListener("touchend", onDragEnd);
    }
  }

  function onDragMove(e: MouseEvent | TouchEvent) {
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
    wrapperRef.current?.setAttribute("data-exceed", "none");
    setTranslate(translate);
  }

  function onDragEnd(e: MouseEvent | TouchEvent) {
    function exceedLimits(side: string) {
      translatePrev.current = side === "left" ? 0 : maxWidth.current;
      wrapperRef.current?.setAttribute("data-exceed", side);
      setTranslate(translatePrev.current);
      wrapperRef.current!.style.transition = "0.3s";
      wrapperRef.current!.removeEventListener("mousedown", onDragStart);
      setTimeout(() => {
        wrapperRef.current!.style.transition = "";
        wrapperRef.current!.addEventListener("mousedown", onDragStart);
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
      wrapperRef.current.removeEventListener("mouseleave", onDragEnd);
      wrapperRef.current.removeEventListener("mousemove", onDragMove);
      wrapperRef.current.removeEventListener("mouseup", onDragEnd);
    }
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
    </StyledListWrapper>
  );
};

export default List;
