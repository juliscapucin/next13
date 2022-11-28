"use client";

import React, { useEffect, useRef, useState } from "react";
import { Photo } from "../../typings";
import { map } from "./../../utils/math";
import { getBoundingClientRect as getPosition } from "./../../utils/dom";

interface HightlightInterface {
  top: number | undefined;
  left: number | undefined;
  right: number | undefined;
  bottom: number | undefined;
  width: number | undefined;
  height: number | undefined;
}

function PhotosList() {
  const photos: Photo[] = [
    {
      url: "https://images.unsplash.com/photo-1550251634-abd788e6bc41?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2832&q=80",
    },

    {
      url: "https://images.unsplash.com/photo-1550251633-85c64142ec2a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2942&q=80",
    },

    {
      url: "https://images.unsplash.com/photo-1602770306237-56933ea0e795?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2291&q=80",
    },

    {
      url: "https://images.unsplash.com/photo-1611849372250-88c748000eb1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2815&q=80",
    },

    {
      url: "https://images.unsplash.com/photo-1611849525298-fe6b9021909e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2865&q=80",
    },

    {
      url: "https://images.unsplash.com/photo-1623207613517-afe2e80e5d6a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2785&q=80",
    },

    {
      url: "https://images.unsplash.com/photo-1623207599849-cecca48bffa1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2785&q=80",
    },

    {
      url: "https://images.unsplash.com/photo-1610030181087-540017dc9d61?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2832&q=80",
    },

    {
      url: "https://images.unsplash.com/photo-1610030006409-dc8a0100e4a3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2832&q=80",
    },
  ];

  const outerContainerRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const innerContainerRef = useRef<HTMLDivElement | null>(null);

  const [scrollPosition, setScrollPosition] = useState<number | undefined>(0);
  const [highlight, setHighlight] = useState<HightlightInterface | null>(null);

  useEffect(() => {
    // resize();
    const topCoord = outerContainerRef.current?.getBoundingClientRect()
        .top
    const rightCoord = outerContainerRef.current?.getBoundingClientRect()
        .right
    const bottomCoord = outerContainerRef.current?.getBoundingClientRect()
        .bottom
    const leftCoord = outerContainerRef.current?.getBoundingClientRect()
        .left
    const widthCoord = outerContainerRef.current?.getBoundingClientRect()
        .width
    const heightCoord = outerContainerRef.current?.getBoundingClientRect()
        .height
    setHighlight({top: topCoord, right: rightCoord, bottom: bottomCoord, left: leftCoord, width: widthCoord, height: heightCoord});
    console.log(highlight);
    update();
  }, []);

  function update() {
    setScrollPosition(
      outerContainerRef.current?.parentElement?.parentElement?.getBoundingClientRect()
        .top
    );
    window.requestAnimationFrame(update);

    if (!highlight) return;

    //Horizontal panel animations settings
    const highlightX = map(
      scrollPosition,
      highlight.top,
      highlight.bottom - highlight.height,
      0,
      -50
    );
    const highlightY = map(
      scrollPosition,
      highlight.top,
      highlight.bottom,
      0,
      highlight.height
    );

    //apply animation to Horizontal panel styles
    if (innerContainerRef.current && containerRef.current) {
      containerRef.current.style.transform = `translateY(${highlightY}px)`;
      innerContainerRef.current.style.transform = `translateX(${highlightX}%)`;
    }

    window.requestAnimationFrame(update);
  }

  // const resize = () => {
  //   const topCoord = outerContainerRef.current?.getBoundingClientRect()
  //       .top
  //   const rightCoord = outerContainerRef.current?.getBoundingClientRect()
  //       .right
  //   const bottomCoord = outerContainerRef.current?.getBoundingClientRect()
  //       .bottom
  //   const leftCoord = outerContainerRef.current?.getBoundingClientRect()
  //       .left
  //   const widthCoord = outerContainerRef.current?.getBoundingClientRect()
  //       .width
  //   const heightCoord = outerContainerRef.current?.getBoundingClientRect()
  //       .height
  //   setHighlight({top: topCoord, right: rightCoord, bottom: bottomCoord, left: leftCoord, width: widthCoord, height: heightCoord});
  //   console.log(highlight);
    
  // };

  return (
    <div className="photo-list__outer-container" ref={outerContainerRef}>
      <div className="photo-list__box" ref={containerRef}>
        <div className="photo-list__inner-container" ref={innerContainerRef}>
          {photos.map((item, index) => (
            <figure className="photo-list__img-container" key={index}>
              <img src={item.url} className="photo-list__img" />
            </figure>
          ))}
        </div>
      </div>
    </div>
  );
}

export default PhotosList;
