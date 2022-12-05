import Translate from "./../components/Translate";

import { mapPosition } from "./../utils/math";

import { HighlightInterface } from "./../typings";

export default function useUpdateHorizontal(
  mainContainerRef: HTMLElement | null,
  outerContainerRef: HTMLElement | null,
  containerRef: HTMLElement | null,
  innerContainerRef: HTMLElement | null,
  highlight: HighlightInterface | null
) {
  //Select all needed elements
  //Parallax
  const parallaxItems = mainContainerRef?.querySelectorAll(
    '[data-animation="translate"]'
  );

  //Video
  const videoContainer = mainContainerRef?.querySelector(".video__container");
  const videoMedia: HTMLDivElement | null | undefined =
    mainContainerRef?.querySelector(".video__media");

  //==============
  //   Resize
  //==============
  function onResize() {
    document.documentElement.style.setProperty(
      "--100vh",
      `${window.innerHeight}px`
    );

    const height = window.innerHeight;
    const width2 = window.innerWidth;

    // scrolling.onResize();

    // translates.forEach((translate) => {
    //   translate.onResize();
    // });

    if (videoMedia) videoMedia.style.transform = "";

    //gets position of the video element
    const videoContainerPos = videoContainer?.getBoundingClientRect();

    // const width = this.elements.highlightWrapper.clientWidth + this.width;

    //sets highlights height as it's width
    // this.elements.highlight.style.height = `${width}px`;

    // this.highlight = getBoundingClientRect(this.elements.highlight);
  }

  //==============
  //    Update
  //==============
  function update() {
    const scrollPos =
      mainContainerRef?.parentElement?.parentElement?.getBoundingClientRect()
        .top;

    if (!highlight) return;

    if (!scrollPos) return;

    //Parallax animations
    //animate all data-animation elements – make an array of it to be able to map
    if (!parallaxItems) return;

    const translates = Array.from(parallaxItems).map((element) => {
      return new Translate({
        element,
      });
    });

    //add animation to parallax images
    translates.forEach((translate) => {
      translate.update(scrollPos);
    });

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
    if (innerContainerRef && containerRef) {
      containerRef.style.transform = `translateY(${highlightY}px)`;
      innerContainerRef.style.transform = `translateX(${highlightX}%)`;
    }

    window.requestAnimationFrame(update);
  }

  onResize();
  update();
}
