"use client";

import React, { useEffect, useRef, useState } from "react";
import { Photo, HighlightInterface } from "../../typings";
import { mapPosition } from "./../../utils/math";
import useUpdateHorizontal from "./../../hooks/useUpdateHorizontal"



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
    useUpdateHorizontal(outerContainerRef.current, containerRef.current, innerContainerRef.current, highlight);

  }, [highlight]);

  

  return (
    <>
      <section className="demo-2__seasons">
        <div className="demo-2__seasons__media" data-animation="translate" data-animation-speed="1.5">
            <figure className="demo-2__seasons__media__box">
                <img className="demo-2__seasons__media__image" src="https://garoaskincare.com/home/seasons-1.webp"/>
            </figure>
        </div>
        <div className="demo-2__seasons__media" data-animation="translate" data-animation-speed="-0.5">
            <figure className="demo-2__seasons__media__box">
                <img className="demo-2__seasons__media__image" src="https://garoaskincare.com/home/seasons-2.webp"/>
            </figure>
        </div>
        <div className="demo-2__seasons__media" data-animation="translate" data-animation-speed="1">
            <figure className="demo-2__seasons__media__box">
                <img className="demo-2__seasons__media__image" src="https://garoaskincare.com/home/seasons-3.webp"/>
            </figure>
        </div>
        <div className="demo-2__seasons__media" data-animation="translate" data-animation-speed="-2">
            <figure className="demo-2__seasons__media__box">
                <img className="demo-2__seasons__media__image" src="https://garoaskincare.com/home/seasons-4.webp"/>
            </figure>
        </div>
      </section>

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

export default PhotosList;
