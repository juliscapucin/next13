import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

//==========================//
//========= TYPES =========//
//========================//

interface ScrollContext {
  currentScroll: number;
  setCurrentScroll: React.Dispatch<React.SetStateAction<number>>;
  updateScroll: (newScrollPosition: number) => void;
}

//==============================//
//========= COMPONENT =========//
//============================//

const ScrollContext = createContext({} as ScrollContext);

const ScrollProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentScroll, setCurrentScroll] = useState(0);

  const updateScroll = (newScrollPosition: number) => {
    setCurrentScroll(newScrollPosition);
  };

  return (
    <ScrollContext.Provider
      value={{
        currentScroll,
        setCurrentScroll,
        updateScroll
      }}
    >
      {children}
    </ScrollContext.Provider>
  );
};

//=========================================//
//========= CONTEXT CUSTOM HOOK  =========//
//=======================================//

export function useScrollContext() {
  return useContext(ScrollContext);
}

export { ScrollContext, ScrollProvider };
