import React from "react";
import styled from "styled-components";
import { StyledUserInfoItemWrapper } from "../../common/style";
import Playlist from "./PlaylistItem";
import SearchHistory from "./SearchHistory";

const StyledUserInfoWrapper = styled.div`
  flex-wrap: wrap;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const User = () => {
  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        flexDirection: "column",
        overflow: "hidden",
        alignItems: "center",
      }}
    >
      <StyledUserInfoItemWrapper>
        <span>UID : {localStorage.getItem("uid")?.toLocaleUpperCase()}</span>
      </StyledUserInfoItemWrapper>
      <StyledUserInfoWrapper>
        <SearchHistory />
        <Playlist />
      </StyledUserInfoWrapper>
    </div>
  );
};

export default User;
