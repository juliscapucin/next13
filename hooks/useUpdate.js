export default function (element, wrapper, htmlRef, windowRef) {
  const blockers = ["menu--open"];
  const easing = 0.1;
  const speed = 1;
  let current = 0;
  let target = 0;
  let limit = 0;
  let isDown = false;

  const loop = () => {
    target = clamp(target, 0, limit);
    current = lerp(current, target, easing);

    element.style.transform = `translate3d(0, -${current}px, 0)`;
  };

  function onResize() {
    this.limit = this.wrapper.clientHeight - this.element.clientHeight;

    htmlRef.current?.style.setProperty("--100vh", `${window.innerHeight}px`);
  }

  function update() {
    loop();

    windowRef.requestAnimationFrame(update);
  }

  onResize();
  update();
}
