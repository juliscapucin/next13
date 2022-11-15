"use client";
import React, { useEffect, useRef, useState } from "react";

import Scrolling from "./../components/Scrolling";

import "../styles/index.scss";

// tailwind style import
// import "../styles/globals.css";

import Header from "./Header";

interface ScrollingType {
  wrapper: HTMLHtmlElement | null,
  element: HTMLHtmlElement | null,
  trigger: HTMLHtmlElement | null,
  onResize: () => void
  loop: () => void
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const htmlRef = useRef<HTMLHtmlElement | null>(null);
  const elementRef = useRef<HTMLDivElement | null>(null);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  let scrolling: ScrollingType

  function onResize() {
    scrolling.onResize();

    htmlRef.current?.style.setProperty("--100vh", `${window.innerHeight}px`);
  }

  function update() {
    scrolling.loop();

    window.requestAnimationFrame(update);
  }

  function addEventListeners() {
    window.addEventListener("resize", onResize);
  }

  useEffect(() => {
    scrolling = new Scrolling({
      element: elementRef.current,
      wrapper: wrapperRef.current,
      trigger: window,
    });

    onResize();
    update();
    addEventListeners();
  }, []);

  return (
    <html ref={htmlRef}>
      <head></head>
      <body>
        <Header />
        <div className='demo' ref={elementRef}>
          <div className='demo__wrapper' ref={wrapperRef}>{children}</div>
        </div>
      </body>
    </html>
  );
}
