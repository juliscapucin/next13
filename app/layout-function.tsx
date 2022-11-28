"use client";

import React, { useEffect, useRef, useState } from "react";

import useScroll from "./../hooks/useScroll";

import "../styles/index.scss";

// tailwind style import
// import "../styles/globals.css";

import Header from "./Header";
import { lookup } from "dns";

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

interface ScrollPosition {
  current: number;
  loop: () => void;
}

//==============================//
//========= COMPONENT =========//
//============================//

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const htmlRef = useRef<HTMLHtmlElement | null>(null);
  const elementRef = useRef<HTMLDivElement | null>(null);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  // const [scrollPosition, setScrollPosition] = useState<ScrollPosition | null>(null);

  function onResize() {
    if (!wrapperRef.current || !elementRef.current)
      console.log('this didnt run');

    htmlRef.current?.style.setProperty("--100vh", `${window.innerHeight}px`);
  }

  useEffect(() => {
    // if scroll already exists, don't run it again
    // if (scrollPosition) return;

    useScroll(elementRef.current, wrapperRef.current);

    window.addEventListener("resize", onResize);

    console.log('useeffect');
    
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
          <div className="demo__wrapper" ref={wrapperRef}>
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
