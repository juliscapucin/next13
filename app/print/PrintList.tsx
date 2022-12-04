"use client";

import React, { useEffect, useRef, useState } from "react";
import { Photo } from "../../typings";
import { mapPosition } from "../../utils/math";

interface HighlightInterface {
  top: number | undefined;
  left: number | undefined;
  right: number | undefined;
  bottom: number | undefined;
  width: number | undefined;
  height: number | undefined;
}

function PrintList() {
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

  const [highlight, setHighlight] = useState<HighlightInterface | null>(null);

  useEffect(() => {
    const container = outerContainerRef.current?.getBoundingClientRect();
    // resize();

    setHighlight({
      top: container?.top,
      right: container?.right,
      bottom: container?.bottom,
      left: container?.left,
      width: container?.width,
      height: container?.height,
    });
    
  }, []);

  useEffect(() => {
    update();

    return () => {
      window.requestAnimationFrame(update);
    };
  }, [highlight]);

  function update() {
    const scrollPos =
      outerContainerRef.current?.parentElement?.parentElement?.getBoundingClientRect()
        .top;

        

    if (!highlight) return;

    if(!scrollPos) return

    //Horizontal panel animations settings
    const highlightX = mapPosition(
      -scrollPos,
      highlight.top,
      highlight.bottom! - window.innerHeight,
      0,
      -100
    );
    const highlightY = mapPosition(
      -scrollPos,
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

  return (
  <>
    <div className="rectangle">Hi there</div>
    <div className="photo-list__outer-container" ref={outerContainerRef}>
      <div className="photo-list__container" ref={containerRef}>
        <div className="photo-list__inner-container" ref={innerContainerRef}>
          {photos.map((item, index) => (
            <figure className="photo-list__img-container" key={index}>
              <img src={item.url} className="photo-list__img" />
            </figure>
          ))}
        </div>
      </div>
    </div>
    <div className="rectangle">Hi here</div>
    </>
  );
}

export default PrintList;
