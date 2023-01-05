export default function useSearchHistory(): [
  (query: string) => void,
  (query: string) => void
] {
  function addHistory(query: string) {
    const history: string | null = localStorage.getItem("history");

    if (history != null) {
      const temp: Array<String> = JSON.parse(history);
      const idx = temp.findIndex((value) => {
        return value === query;
      });
      if (idx !== -1) temp.splice(idx, 1);
      temp.splice(0, 0, query);
      localStorage.setItem("history", JSON.stringify(temp));
    } else {
      localStorage.setItem("history", JSON.stringify([query]));
    }
  }

  function removeHistory(query: string) {
    const history: string | null = localStorage.getItem("history");
    if (history != null) {
      const temp: Array<String> = JSON.parse(history);
      const idx = temp.findIndex((value) => {
        return value === query;
      });
      if (idx !== -1) {
        temp.splice(idx, 1);
      }
      localStorage.setItem("history", JSON.stringify(temp));
    } else {
      throw new Error(`unknown history Error ${query}`);
    }
  }
  return [addHistory, removeHistory];
}
