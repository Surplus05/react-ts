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
