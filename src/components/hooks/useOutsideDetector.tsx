import { RefObject, useEffect } from "react";

export default function useOutsideDetector(
  wrapperRef: RefObject<HTMLDivElement>,
  targetRef: RefObject<HTMLDivElement>,
  platform: string
) {
  useEffect(() => {
    function handleClickOutside(event: any) {
      if (
        !wrapperRef.current?.contains(event.target) &&
        platform === "DESKTOP"
      ) {
        if (event.target.getAttribute("data-type") !== "removeButton")
          targetRef.current?.classList.add("sr-focusOut");
      }

      if (
        !wrapperRef.current?.contains(event.target) &&
        platform === "MOBILE"
      ) {
        if (
          !event.target.classList.contains("toggleBtn") &&
          event.target.getAttribute("data-type") !== "removeButton"
        )
          wrapperRef.current?.classList.add("hidden");
      }
    }
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [wrapperRef, targetRef, platform]);
}
