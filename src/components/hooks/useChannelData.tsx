import { useState, useCallback } from "react";
import { getChannelInfo } from "../service/Youtube";

export default function useChannelData(): [
  Array<string>,
  (channelId: string, callback?: Function) => void,
  () => void
] {
  const [data, setData] = useState<Array<string>>([]);

  const requestData = useCallback(
    (channelId: string, callback?: Function) => {
      getChannelInfo(channelId).then((response) => {
        setData(response.data.items);
        if (callback != null)
          callback(response.data.items[0].snippet.thumbnails.medium.url);
      });
    },
    [setData]
  );

  const resetData = useCallback(() => {
    setData([]);
  }, [setData]);

  return [data, requestData, resetData];
}
