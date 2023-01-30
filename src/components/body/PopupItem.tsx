import React, { Dispatch, SetStateAction, useEffect } from "react";
import styled from "styled-components";
import { fadeInPopupItem, StyledIconWrapper } from "../../common/style";
import useContentsSizes from "../hooks/useContentsSizes";
import { getTitle, getVideoId } from "../service/Functions";
import VideoDetail from "./VideoDetail";

interface PopupItemProps {
  width: number;
  height: number;
}

const StyledPopupItemMain = styled.div`
  display: flex;
  flex-direction: row;

  @media screen and (max-width: 768px) {
    flex-direction: column;
  }
`;

const StyledPopupItemWrapper = styled.div<PopupItemProps>`
  position: relative;
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
  position: relative;
  z-index: 1;
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

const ASPECT_RATIO = 16 / 9;
const HEIGHT_OFFSET = 52;

const PopupItem = ({
  item,
  setPopupItemCompoent,
}: {
  item: any;
  setPopupItemCompoent: Dispatch<SetStateAction<JSX.Element | null>>;
}) => {
  const PopupItemRef = React.useRef<HTMLDivElement>(null);
  let [itemPerPage, fontSize, , width] = useContentsSizes();
  let videoAreaHeight: number;
  let videoAreaWidth: number;
  let descriptionHeight: number;
  let descriptionWidth: number;
  let totalWidth: number;
  let totalHeight: number;
  let title = getTitle(item);
  let videoId = getVideoId(item);
  let channelId = item.snippet.channelId;

  totalWidth = width * itemPerPage + 8 * (itemPerPage - 1);
  if (itemPerPage > 3) {
    totalHeight = width * (itemPerPage / 2);
    videoAreaHeight = totalHeight - HEIGHT_OFFSET;
    videoAreaWidth = videoAreaHeight * ASPECT_RATIO;
    descriptionWidth = totalWidth - videoAreaWidth - 6;
    descriptionHeight = videoAreaHeight;
  } else {
    totalHeight = width * 3;
    videoAreaWidth = totalWidth;
    videoAreaHeight = videoAreaWidth / ASPECT_RATIO;
    descriptionWidth = videoAreaWidth;
    descriptionHeight = totalHeight - videoAreaHeight - HEIGHT_OFFSET;
  }

  useEffect(() => {
    setTimeout(() => {
      PopupItemRef.current!.style.animation = "0s";
    }, 750);
  }, []);

  useEffect(() => {
    if (PopupItemRef.current) {
      PopupItemRef.current.style.width = `${totalWidth}px`;
      PopupItemRef.current.style.height = `${totalHeight}px`;
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
    <StyledPopupItemWrapper
      ref={PopupItemRef}
      width={totalWidth}
      height={totalHeight}
    >
      <StyledPopupItemTitleBar>
        <StyledPopupItemTitle>
          {title + " | " + item.snippet.channelTitle}
        </StyledPopupItemTitle>
        <StyledIconWrapper onClick={hidePopupItem}>
          <i className="fa-solid fa-xmark" />
        </StyledIconWrapper>
      </StyledPopupItemTitleBar>
      <StyledPopupItemMain>
        <div
          style={{
            top: "0",
            height: `${videoAreaHeight}px`,
            width: `${videoAreaWidth}px`,
            background: "gray",
            overflow: "hidden",
          }}
          data-videoid={videoId}
        >
          <iframe
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1&modestbranding=1`}
            frameBorder="0"
            width={videoAreaWidth}
            height={videoAreaHeight}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture "
          ></iframe>
        </div>
        <div
          className="scroll"
          style={{
            width: "100%",
            overflowY: "scroll",
            paddingLeft: "0.375em",
            overflowX: "hidden",
            margin: "0.5em",
            maxWidth: `${descriptionWidth - 16}px`,
            maxHeight: `${descriptionHeight - 16}px`,
          }}
        >
          <VideoDetail
            fontSize={fontSize}
            channelId={channelId}
            videoId={videoId}
            videoSnippet={item.snippet}
          ></VideoDetail>
        </div>
      </StyledPopupItemMain>
    </StyledPopupItemWrapper>
  );
};

export default PopupItem;
