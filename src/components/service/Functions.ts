export function setDigits(viewCount: number): string {
  if (viewCount < 0) return "Invalid";
  if (viewCount < 1000) return viewCount.toString();

  let processedViews = viewCount.toLocaleString();
  if (viewCount >= 1000 && viewCount < 1000000) {
    processedViews = `${(viewCount / 1000).toFixed(1)}K`;
  } else if (viewCount >= 1000000 && viewCount < 1000000000) {
    processedViews = `${(viewCount / 1000000).toFixed(1)}M`;
  } else {
    processedViews = `${(viewCount / 1000000000).toFixed(1)}B`;
  }
  return processedViews;
}

export function getTitle(item: any): string {
  return item.snippet.localized?.title || item.snippet.title || "";
}

export function getVideoId(item: any): string {
  return item.id?.videoId || item.id || "";
}

export function processTime(currentTime: number) {
  let hours = Math.floor(currentTime / 3600);
  let minutes = Math.floor(currentTime / 60) - hours * 60;
  let seconds = Math.floor(currentTime - hours * 3600 - minutes * 60);
  let time = `${minutes.toString().padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")}`;

  if (hours > 0) {
    time = `${hours.toString().padStart(2, "0")}:${time}`;
  }

  return time;
}
