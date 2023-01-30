import { RefObject, useEffect } from "react";

export default function useOutsideDetector(
  wrapperRef: RefObject<HTMLDivElement>,
  targetRef: RefObject<HTMLDivElement>,
  platform: string
) {
  useEffect(() => {
    function handleClickOutside(event: any) {
      const wrapper = wrapperRef.current;
      const target = targetRef.current;
      if (!wrapper || !target) return;
      if (platform === "DESKTOP") {
        if (
          !wrapper.contains(event.target) &&
          event.target.getAttribute("data-type") !== "removeButton"
        )
          target.classList.add("sr-focusOut");
      } else if (platform === "MOBILE") {
        if (
          !wrapper.contains(event.target) &&
          !event.target.classList.contains("toggleBtn") &&
          event.target.getAttribute("data-type") !== "removeButton"
        )
          wrapper.classList.add("hidden");
      }
    }
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [wrapperRef, targetRef, platform]);
}
