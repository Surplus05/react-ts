import { useState, useCallback } from "react";
import getVideoList from "../service/Youtube";

export default function useSearchPreview(): [
  Array<string>,
  (query: string, part: string, maxResults: number, callback: Function) => void,
  () => void
] {
  const [data, setData] = useState<Array<string>>([]);

  const requestData = useCallback(
    (query: string, part: string, maxResults: number, callback?: Function) => {
      getVideoList(query, part, maxResults).then((response) => {
        setData(response.data.items);
        console.log(response);
        if (callback) callback();
      });
    },
    [setData]
  );

  const resetData = useCallback(() => {
    setData([]);
  }, []);

  return [data, requestData, resetData];
}
