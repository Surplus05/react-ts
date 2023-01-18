export interface Playlist {
  videoId: string;
  title: string;
}

export default function usePlaylist(): [
  (videoId: string, title: string) => void,
  (videoId: string) => void
] {
  function addPlaylist(videoId: string, title: string) {
    const playlist: string | null = localStorage.getItem("playlist");
    if (playlist != null) {
      const temp: Array<Playlist> = JSON.parse(playlist);
      const idx = temp.findIndex((value) => {
        return value.videoId === videoId;
      });
      if (idx !== -1) temp.splice(idx, 1);
      temp.push({ videoId, title });
      localStorage.setItem("playlist", JSON.stringify(temp));
    } else {
      localStorage.setItem("playlist", JSON.stringify([{ videoId, title }]));
    }
  }

  function removePlaylist(videoId: string) {
    const playlist: string | null = localStorage.getItem("playlist");
    if (playlist != null) {
      const temp: Array<Playlist> = JSON.parse(playlist);
      const idx = temp.findIndex((value) => {
        return value.videoId === videoId;
      });
      if (idx !== -1) {
        temp.splice(idx, 1);
      }
      console.log(temp);
      localStorage.setItem("playlist", JSON.stringify(temp));
    } else {
      throw new Error(`unknown playlist Error ${videoId}`);
    }
  }
  return [addPlaylist, removePlaylist];
}
