import axios from "axios";

export default async function getVideoList(
  query: string,
  part: string,
  maxResults: number
) {
  const options = {
    method: "get",
    url: "https://www.googleapis.com/youtube/v3/search",
    params: {
      part: part,
      q: query,
      key: process.env.REACT_APP_YOUTUBE_API_KEY,
      type: "video",
      videoEmbeddable: "true",
      maxResults: maxResults,
    },
  };

  return await axios(options);
}
