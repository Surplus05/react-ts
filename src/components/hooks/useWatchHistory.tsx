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
    const watchHistory: Array<WatchHistory> = JSON.parse(
      localStorage.getItem("watchHistory") || "[]"
    );
    const idx = watchHistory.findIndex((value) => {
      return value.videoId === videoId;
    });
    if (idx !== -1) watchHistory.splice(idx, 1);
    watchHistory.push({ channelId, videoId, title, thumbnailURL });
    localStorage.setItem("watchHistory", JSON.stringify(watchHistory));
  }

  function removePlaylist(videoId: string) {
    const watchHistory: Array<WatchHistory> = JSON.parse(
      localStorage.getItem("watchHistory") || "[]"
    );
    const idx = watchHistory.findIndex((value) => {
      return value.videoId === videoId;
    });
    if (idx !== -1) {
      watchHistory.splice(idx, 1);
      localStorage.setItem("watchHistory", JSON.stringify(watchHistory));
    } else {
      throw new Error(`unknown watchHistory Error ${videoId}`);
    }
  }
  return [addPlaylist, removePlaylist];
}
