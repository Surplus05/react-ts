import axios from "axios";

export default async function getVideoList(query: string, maxResults: number) {
  const options = {
    method: "get",
    url: "https://www.googleapis.com/youtube/v3/search",
    params: {
      part: "snippet",
      q: query,
      key: process.env.REACT_APP_YOUTUBE_API_KEY,
      type: "video",
      videoEmbeddable: "true",
      maxResults: maxResults,
    },
  };

  return await axios(options);
}

export async function getVideoListTrending(videoCategoryId: string) {
  const options = {
    method: "get",
    url: "https://www.googleapis.com/youtube/v3/videos",
    params: {
      part: "snippet",
      key: process.env.REACT_APP_YOUTUBE_API_KEY,
      chart: "mostPopular",
      regionCode: "kr",
      videoCategoryId: videoCategoryId,
      maxResults: "10",
      type: "video",
      videoEmbeddable: "true",
    },
  };

  return await axios(options);
}
