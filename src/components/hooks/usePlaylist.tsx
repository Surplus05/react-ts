export interface Playlist {
  channelId: string;
  videoId: string;
  title: string;
}

export default function usePlaylist(): [
  (channelId: string, videoId: string, title: string) => void,
  (videoId: string) => void
] {
  function addPlaylist(channelId: string, videoId: string, title: string) {
    const playlist: Array<Playlist> = JSON.parse(
      localStorage.getItem("playlist") || "[]"
    );
    const idx = playlist.findIndex((value) => {
      return value.videoId === videoId;
    });
    if (idx !== -1) playlist.splice(idx, 1);
    playlist.push({ channelId, videoId, title });
    localStorage.setItem("playlist", JSON.stringify(playlist));
  }

  function removePlaylist(videoId: string) {
    const playlist: Array<Playlist> = JSON.parse(
      localStorage.getItem("playlist") || "[]"
    );
    const idx = playlist.findIndex((value) => {
      return value.videoId === videoId;
    });
    if (idx !== -1) {
      playlist.splice(idx, 1);
      localStorage.setItem("playlist", JSON.stringify(playlist));
    } else {
      throw new Error(`unknown playlist Error ${videoId}`);
    }
  }
  return [addPlaylist, removePlaylist];
}
