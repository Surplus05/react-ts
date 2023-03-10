import { useState, useCallback } from "react";
import getVideoList from "../service/Youtube";

export default function useSearchPreview(): [
  Array<string>,
  (query: string, maxResults: number, callback: Function) => void,
  () => void
] {
  const [data, setData] = useState<Array<string>>([]);

  const requestData = useCallback(
    (query: string, maxResults: number, callback?: Function) => {
      getVideoList(query, maxResults).then((response) => {
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
