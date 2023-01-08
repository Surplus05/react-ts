import { useState, useCallback } from "react";
import { getVideoListTrending } from "../service/Youtube";

export default function useMainList(): [
  Array<string>,
  (videoCategoryId: string, callback?: Function) => void,
  () => void
] {
  const [data, setData] = useState<Array<string>>([]);

  const requestData = useCallback(
    (videoCategoryId: string, callback?: Function) => {
      getVideoListTrending(videoCategoryId).then((response) => {
        setData(response.data.items);
        if (callback != null) callback();
      });
    },
    [setData]
  );

  const resetData = useCallback(() => {
    setData([]);
  }, [setData]);

  return [data, requestData, resetData];
}
