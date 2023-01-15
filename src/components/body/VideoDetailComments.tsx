import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { getVideoComments } from "../service/Youtube";

const StyledCommentsWrapper = styled.div``;

const VideoDetailComments = ({
  videoId,
  fontSize,
}: {
  videoId: string;
  fontSize: number;
}) => {
  const [comments, setComments] = useState<any>();

  useEffect(() => {
    // Request Comments
    if (videoId != null) {
      getVideoComments(videoId)
        .then((res) => {
          setComments(res.data.items);
        })
        .catch(() => {
          setComments(null);
        });
    }
  }, [videoId]);

  if (comments == null)
    return (
      <span
        style={{
          display: "block",
        }}
      >
        댓글을 받아오지 못했습니다.
      </span>
    );
  return (
    <StyledCommentsWrapper>
      {comments.map((comment: any) => {
        return (
          <span style={{ display: "block", fontSize: `${fontSize}em` }}>
            {"[" +
              comment.snippet.topLevelComment.snippet.authorDisplayName +
              "] - " +
              comment.snippet.topLevelComment.snippet.textOriginal}
          </span>
        );
      })}
    </StyledCommentsWrapper>
  );
};

export default VideoDetailComments;
