"use client";
import React, { createContext, useContext, useEffect, useRef, useState } from "react";

import Scrolling from "./../components/Scrolling";

import "../styles/index.scss";

// tailwind style import
// import "../styles/globals.css";

import Header from "./Header";


//==========================//
//========= TYPES =========//
//========================//
interface ScrollingType {
  wrapper: HTMLHtmlElement | null;
  element: HTMLHtmlElement | null;
  trigger: HTMLHtmlElement | null;
  current: number;
  onResize: () => void;
  loop: () => void;
}

type ScrollContext = {
  currentScroll: number
}
//==============================//
//========= COMPONENT =========//
//============================//

const LayoutContext = createContext({} as ScrollContext);
LayoutContext.displayName = "LayoutContext";

export default function RootLayout({children}: {
  children: React.ReactNode;
}) {
  const htmlRef = useRef<HTMLHtmlElement | null>(null);
  const elementRef = useRef<HTMLDivElement | null>(null);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const [currentScroll, setCurrentScroll] = useState(0) 

  let scrollHandler: ScrollingType

  function onResize() {
    scrollHandler.onResize();

    htmlRef.current?.style.setProperty("--100vh", `${window.innerHeight}px`);
  }

  function update() {
    scrollHandler.loop();
    setCurrentScroll(scrollHandler.current)

    window.requestAnimationFrame(update);
  }

  useEffect(() => {
    // if scrollHandler already exists, don't run it again
    if (scrollHandler) return;

    scrollHandler = new Scrolling({
      element: elementRef.current,
      wrapper: wrapperRef.current,
      trigger: window,
    });

    
    
    
    onResize();
    update();
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, []);
  
  
  return (
    <html ref={htmlRef}>
      <head></head>
      <body>
        <Header />
        <div className="demo" ref={elementRef}>
          <LayoutContext.Provider value={{ currentScroll }}>
          <div className="demo__wrapper" ref={wrapperRef}>
            {children}
          </div>
          </LayoutContext.Provider>
        </div>
      </body>
    </html>
  )
}

//=========================================//
//========= CONTEXT CUSTOM HOOK  =========//
//=======================================//

export function useScrollContext () {
  return useContext(LayoutContext);
};

export { LayoutContext, RootLayout };