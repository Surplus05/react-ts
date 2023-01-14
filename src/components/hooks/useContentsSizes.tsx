import React, { useContext } from "react";
import { PlatformContext } from "../context/PlatformContext";

export default function useContentsSizes(): [
  itemPerPage: number,
  fontSize: number,
  imgQuality: string,
  width: number,
  height: number
] {
  const context = useContext(PlatformContext);

  let itemPerPage = 5;
  let fontSize = 1;
  let imgQuality = "high";
  let width = 0;
  let height = 0;

  if (context.platform === "DESKTOP") {
    imgQuality = "high";
    if (context.innerWidth >= 1024) {
      fontSize = 0.875;
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

  return [itemPerPage, fontSize, imgQuality, width, height];
}
