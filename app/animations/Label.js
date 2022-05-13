import GSAP from "gsap";

import each from "lodash/each";

import Animation from "../classes/Animation";

import { calculate, split } from "../utils/text";

export default class Label extends Animation {
  constructor({ element, elements }) {
    super({
      element,
      elements,
    });

    split({ element: this.element, append: true });

    split({ element: this.element, append: true });

    this.elementLinesSpans = this.element.querySelectorAll("span span");
  }

  animateIn() {
    this.timeline = GSAP.timeline({
      delay: 0.5,
    });

    this.timeline.set(this.element, {
      autoAlpha: 1,
    });

    each(this.elementsLines, (line, index) => {
      this.timeline.fromTo(
        line,
        {
          y: "100%",
        },
        {
          delay: index * 0.2,
          duration: 1.5,
          ease: "expo.out",
          y: "0%",
        },
        0
      );
    });
  }

  animateOut() {
    GSAP.set(this.element, {
      autoAlpha: 0,
    });
  }

  onResize() {
    this.elementsLines = calculate(this.elementLinesSpans);
  }
}
