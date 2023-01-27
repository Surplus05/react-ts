export function setDigits(viewCount: number): string {
  let processedViews: string = "";
  if (viewCount < 1000) {
    processedViews = viewCount.toString();
  } else if (viewCount >= 1000 && viewCount < 100000) {
    processedViews = (viewCount / 1000).toFixed(1) + "K";
  } else if (viewCount >= 100000 && viewCount < 100000000) {
    processedViews = (viewCount / 10000).toFixed(1) + "M";
  } else {
    processedViews = (viewCount / 100000000).toFixed(1) + "B";
  }

  return processedViews;
}

export function getTitle(item: any): string {
  let result: string = "";
  if (item.snippet.localized != null) result = item.snippet.localized.title;
  if (item.snippet.title != null) result = item.snippet.title;
  return result;
}

export function getVideoId(item: any): string {
  let result: string = "";
  if (item.id != null) result = item.id;
  if (item.id.videoId != null) result = item.id.videoId;
  return result;
}

export function processTime(currentTime: number) {
  let minutes = Math.floor(currentTime / 60);
  let seconds = currentTime - minutes * 60;
  return `${minutes}M${seconds}s`.replace(".", "");
}
