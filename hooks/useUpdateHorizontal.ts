import { mapPosition } from "./../utils/math";

import { HighlightInterface } from "./../typings";

export default function useUpdateHorizontal(
  outerContainerRef: HTMLElement | null,
  containerRef: HTMLElement | null,
  innerContainerRef: HTMLElement | null,
  highlight: HighlightInterface | null
) {
  function update() {
    const scrollPos =
      outerContainerRef?.parentElement?.parentElement?.getBoundingClientRect()
        .top;

    console.log(scrollPos);

    if (!highlight) return;

    if (!scrollPos) return;

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

  update();
}
