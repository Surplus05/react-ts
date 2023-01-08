import { createContext, useState, useEffect } from "react";

export const PlatformContext = createContext({
  platform: "Not decided yet",
  innerWidth: -1,
});

export function PlatformProvider({ children }: { children: any }) {
  const [platform, setPlatform] = useState<string>("Not decided yet");
  const [innerWidth, setInnerWidth] = useState<number>(-1);

  useEffect(() => {
    setInnerWidth(window.innerWidth);
    if (window.innerWidth < 500) setPlatform("MOBILE");
    else {
      setPlatform("DESKTOP");
    }
  }, []);

  useEffect(() => {
    function eventHandler(event: any) {
      setInnerWidth(event.target.innerWidth);
      if (event.target.innerWidth <= 500 && platform === "DESKTOP") {
        setPlatform("MOBILE");
      } else if (event.target.innerWidth > 500 && platform === "MOBILE") {
        setPlatform("DESKTOP");
      }
    }
    window.addEventListener("resize", eventHandler);
    return () => {
      window.removeEventListener("resize", eventHandler);
    };
  }, [platform]);

  return (
    <PlatformContext.Provider value={{ platform, innerWidth }}>
      {children}
    </PlatformContext.Provider>
  );
}
