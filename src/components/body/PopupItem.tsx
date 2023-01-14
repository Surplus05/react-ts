import React, { Dispatch, SetStateAction, useEffect } from "react";
import styled from "styled-components";
import { fadeInPopupItem, StyledIconWrapper } from "../../common/style";
import useContentsSizes from "../hooks/useContentsSizes";

interface PopupItemProps {
  width: number;
  height: number;
}

const StyledPopupItemDiv = styled.div<PopupItemProps>`
  max-width: 90em;
  border-radius: var(--border--radius);
  background: var(--color--header);
  transition: 0.75s cubic-bezier(0.45, 0.05, 0.55, 0.95);
  overflow: hidden;
  width: 0px;
  height: 0px;
  animation: 0.75s cubic-bezier(0.45, 0.05, 0.55, 0.95)
    ${(props) => fadeInPopupItem(props.width, props.height)};
`;

const StyledPopupItemTitleBar = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 0.5em;
  background: var(--color--titleBar);
`;

const StyledPopupItemTitle = styled.span`
  width: -webkit-fill-available;
  padding: 0.25em;
  display: inline-block;
  white-space: nowrap;
  overflow: hidden;
  user-select: none;
  font-weight: bold;
  text-overflow: ellipsis;
`;

const PopupItem = ({
  item,
  setPopupItemCompoent,
}: {
  item: any;
  setPopupItemCompoent: Dispatch<SetStateAction<JSX.Element | null>>;
}) => {
  const PopupItemRef = React.useRef<HTMLDivElement>(null);
  let [itemPerPage, , , width, height] = useContentsSizes();
  let videoAreaHeight;
  let videoAreaWidth;
  if (itemPerPage > 3) {
    height = width * (itemPerPage / 2);
    videoAreaHeight = height - 52;
    videoAreaWidth = (videoAreaHeight * 16) / 9;
  } else {
    height = width * 3;
    videoAreaWidth = width * itemPerPage + 8 * (itemPerPage - 1);
    videoAreaHeight = (videoAreaWidth * 9) / 16;
  }
  width = width * itemPerPage + 8 * (itemPerPage - 1);

  useEffect(() => {
    setTimeout(() => {
      PopupItemRef.current!.style.animation = "0s";
    }, 750);
  }, []);

  useEffect(() => {
    // Request Detail
    console.log(item);
  }, [item]);

  useEffect(() => {
    if (PopupItemRef.current) {
      PopupItemRef.current.style.width = `${width}px`;
      PopupItemRef.current.style.height = `${height}px`;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [width]);

  const hidePopupItem = () => {
    if (PopupItemRef.current) {
      PopupItemRef.current.style.width = "0px";
      PopupItemRef.current.style.height = "0px";
    }
    setTimeout(() => {
      setPopupItemCompoent(null);
    }, 750);
  };

  return (
    <StyledPopupItemDiv ref={PopupItemRef} width={width} height={height}>
      <StyledPopupItemTitleBar>
        <StyledPopupItemTitle>
          {item.snippet.localized.title + " | " + item.snippet.channelTitle}
        </StyledPopupItemTitle>
        <StyledIconWrapper onClick={hidePopupItem}>
          <i className="fa-solid fa-xmark" />
        </StyledIconWrapper>
      </StyledPopupItemTitleBar>
      <div
        style={{
          height: `${videoAreaHeight}px`,
          width: `${videoAreaWidth}px`,
          background: "gray",
        }}
      ></div>
    </StyledPopupItemDiv>
  );
};

export default PopupItem;
