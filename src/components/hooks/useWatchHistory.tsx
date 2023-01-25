export interface WatchHistory {
  channelId: string;
  videoId: string;
  title: string;
  thumbnailURL: string;
}

export default function useWatchHistory(): [
  (
    channelId: string,
    videoId: string,
    title: string,
    thumbnailURL: string
  ) => void,
  (videoId: string) => void
] {
  function addPlaylist(
    channelId: string,
    videoId: string,
    title: string,
    thumbnailURL: string
  ) {
    const watchHistory: string | null = localStorage.getItem("watchHistory");
    if (watchHistory != null) {
      const temp: Array<WatchHistory> = JSON.parse(watchHistory);
      const idx = temp.findIndex((value) => {
        return value.videoId === videoId;
      });
      if (idx !== -1) temp.splice(idx, 1);
      temp.push({ channelId, videoId, title, thumbnailURL });
      localStorage.setItem("watchHistory", JSON.stringify(temp));
    } else {
      localStorage.setItem(
        "watchHistory",
        JSON.stringify([{ videoId, title }])
      );
    }
  }

  function removePlaylist(videoId: string) {
    const watchHistory: string | null = localStorage.getItem("watchHistory");
    if (watchHistory != null) {
      const temp: Array<WatchHistory> = JSON.parse(watchHistory);
      const idx = temp.findIndex((value) => {
        return value.videoId === videoId;
      });
      if (idx !== -1) {
        temp.splice(idx, 1);
      }
      localStorage.setItem("watchHistory", JSON.stringify(temp));
    } else {
      throw new Error(`unknown watchHistory Error ${videoId}`);
    }
  }
  return [addPlaylist, removePlaylist];
}
