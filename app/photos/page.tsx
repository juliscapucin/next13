"use client";

import React from "react";
import PhotosList from "./PhotosList";

import { useScrollContext } from "./../../context/scrollContext";

export default function Photos() {
  const { currentScroll, updateScroll } = useScrollContext();

  // this works
  updateScroll(40);

  return (
    <div>
      {/* @ts-ignore */}
      <PhotosList />
    </div>
  );
}
