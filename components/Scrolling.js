import { clamp, lerp } from "./../utils/math";

export default class {
  constructor({
    blockers = ["menu--open"],
    easing = 0.1,
    element,
    speed = 1,
    trigger,
    wrapper,
  }) {
    this.blockers = blockers;
    this.element = element;
    this.speed = speed;
    this.trigger = trigger;
    this.wrapper = wrapper;

    this.current = 0;
    this.target = 0;
    this.easing = easing;
    this.limit = 0;

    this.addObserver();
    this.addEventListeners();
  }

  onResize() {
    this.limit = this.wrapper.clientHeight - this.element.clientHeight;
  }

  onWheel({ deltaY }) {
    if (
      this.blockers.some((className) =>
        document.documentElement.classList.contains(className)
      )
    )
      return;

    this.target += deltaY * this.speed;
  }

  onTouchStart(event) {
    if (
      this.blockers.some((className) =>
        document.documentElement.classList.contains(className)
      )
    )
      return;

    this.isDown = true;

    this.y = event.touches ? event.touches[0].clientY : event.clientY;
    this.position = this.current;
  }

  onTouchMove(event) {
    if (!this.isDown) return;

    const y = event.touches ? event.touches[0].clientY : event.clientY;
    const distance = this.y - y;

    this.target = this.position + distance * 3;
  }

  onTouchEnd(event) {
    this.isDown = false;
  }

  loop() {
    this.target = clamp(this.target, 0, this.limit);
    this.current = lerp(this.current, this.target, this.easing);

    this.element.style.transform = `translate3d(0, -${this.current}px, 0)`;
  }

  addObserver() {
    this.observer = new this.trigger.ResizeObserver((entries) => {
      for (const entry of entries) {
        // eslint-disable-line
        this.onResize();
      }
    });

    this.observer.observe(this.wrapper);
    console.log("addObserver ran");
  }

  addEventListeners() {
    this.trigger.addEventListener("wheel", this.onWheel.bind(this));

    this.trigger.addEventListener("touchstart", this.onTouchStart.bind(this));
    this.trigger.addEventListener("touchmove", this.onTouchMove.bind(this));
    this.trigger.addEventListener("touchend", this.onTouchEnd.bind(this));

    this.trigger.addEventListener("mousedown", this.onTouchStart.bind(this));
    this.trigger.addEventListener("mousemove", this.onTouchMove.bind(this));
    this.trigger.addEventListener("mouseup", this.onTouchEnd.bind(this));
  }
}
