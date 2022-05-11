import Page from "../../classes/Page";

export default class Home extends Page {
  constructor() {
    super({
      id: "home",
      element: ".home",
      elements: {
        navigation: document.querySelector(".navigation"),
        button: ".home__link",
      },
    });
  }

  create() {
    super.create();

    this.elements.link.addEventListener("click", (_) =>
      console.log("oh, you clicked me!")
    );
  }
}
