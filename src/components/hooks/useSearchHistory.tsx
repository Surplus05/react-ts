export default function useSearchHistory(): [
  (query: string) => void,
  (query: string) => void
] {
  function addHistory(query: string) {
    const history: Array<String> = JSON.parse(
      localStorage.getItem("searchHistory") || "[]"
    );
    const idx = history.findIndex((value) => {
      return value === query;
    });
    if (idx !== -1) history.splice(idx, 1);
    history.splice(0, 0, query);
    localStorage.setItem("searchHistory", JSON.stringify(history));
  }

  function removeHistory(query: string) {
    const history: Array<string> = JSON.parse(
      localStorage.getItem("searchHistory") || "[]"
    );
    const idx = history.findIndex((value) => {
      return value === query;
    });
    if (idx !== -1) {
      history.splice(idx, 1);
      localStorage.setItem("searchHistory", JSON.stringify(history));
    } else {
      throw new Error(`unknown searchHistory Error ${query}`);
    }
  }
  return [addHistory, removeHistory];
}
