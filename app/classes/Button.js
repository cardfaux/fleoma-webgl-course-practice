import GSAP from "gsap";
import Component from "classes/Component";

export default class Button extends Component {
  constructor({ element }) {
    super({ element });

    if (element) {
      this.path = element.querySelector("path:last-child");
    }
    if (this.path) {
      this.pathLength = this.path.getTotalLength();
    }

    this.timeline = GSAP.timeline({ paused: true });

    this.timeline.fromTo(
      this.path,
      {
        strokeDashoffset: this.pathLength,
        strokeDasharray: `${this.pathLength} ${this.pathLength}`,
      },
      {
        strokeDashoffset: 0,
        strokeDasharray: `${this.pathLength} ${this.pathLength}`,
      }
    );
  }

  onMouseEnter() {
    console.log("enter");
    this.timeline.play();
  }

  onMouseLeave() {
    console.log("leave");
    this.timeline.reverse();
  }

  addEventListeners() {
    this.onMouseEnterEvent = this.onMouseEnter.bind(this);
    this.onMouseLeaveEvent = this.onMouseEnter.bind(this);

    if (this.element) {
      this.element.addEventListeners("mouseenter", this.onMouseEnterEvent);
      this.element.addEventListeners("mouseleave", this.onMouseLeaveEvent);
    }
  }

  removeEventListeners() {
    if (this.element) {
      this.element.removeEventListeners("mouseenter", this.onMouseEnterEvent);
      this.element.removeEventListeners("mouseleave", this.onMouseLeaveEvent);
    }
  }
}
