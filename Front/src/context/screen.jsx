import { createContext, useState,useEffect } from "react";

export const screenContext = createContext()

export function ScreenProvider ({children}) {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <screenContext.Provider value={{width: screenWidth}}>
      {children}
    </screenContext.Provider>
  )
}