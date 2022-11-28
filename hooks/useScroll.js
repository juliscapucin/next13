import { clamp, lerp } from "./../utils/math";

export default function (element, wrapper) {
  const blockers = ["menu--open"];
  const easing = 0.1;
  const speed = 1;
  let current = 0;
  let target = 0;
  let limit = 0;
  let isDown = false;

  const onResize = () => {
    limit = wrapper.clientHeight - element.clientHeight;
  };

  const onWheel = ({ deltaY }) => {
    if (
      blockers.some((className) =>
        document.documentElement.classList.contains(className)
      )
    )
      return;

    target += deltaY * speed;
  };

  const onTouchStart = (event) => {
    if (
      blockers.some((className) =>
        document.documentElement.classList.contains(className)
      )
    )
      return;

    isDown = true;

    let y = event.touches ? event.touches[0].clientY : event.clientY;
    let position = current;
  };

  const onTouchMove = (event) => {
    if (!isDown) return;

    let y = event.touches ? event.touches[0].clientY : event.clientY;
    const distance = y - y;

    target = position + distance * 3;
  };

  const onTouchEnd = (event) => {
    isDown = false;
  };

  const loop = () => {
    target = clamp(target, 0, limit);
    current = lerp(current, target, easing);

    element.style.transform = `translate3d(0, -${current}px, 0)`;
  };

  const update = () => {
    loop();

    element.style.transform = `translate3d(0, -${current}px, 0)`;

    window.requestAnimationFrame(update);
  };

  const addObserver = () => {
    const observer = new window.ResizeObserver((entries) => {
      for (const entry of entries) {
        // eslint-disable-line
        onResize();
      }
    });

    observer.observe(wrapper);
  };

  const addEventListeners = () => {
    window.addEventListener("wheel", ({ deltaY }) => onWheel({ deltaY }));

    window.addEventListener("touchstart", (event) => onTouchStart(event));
    window.addEventListener("touchmove", (event) => onTouchMove(event));
    window.addEventListener("touchend", (event) => onTouchEnd(event));

    window.addEventListener("mousedown", (event) => onTouchStart(event));
    window.addEventListener("mousemove", (event) => onTouchMove(event));
    window.addEventListener("mouseup", (event) => onTouchEnd(event));
  };

  addObserver();
  addEventListeners();
  update();
  console.log("theend");
}
