// This module is needed to keep common functions for all other modules
class Tools {
  constructor() {
    this.showElementBlock = (domElement) => {
      domElement.classList.remove("hidden-element");
      domElement.classList.add("appeared-block");
    };

    this.hideElementBlock = (domElement) => {
      domElement.classList.remove("appeared-block");
      domElement.classList.add("hidden-element");
    };
  }
}

export default new Tools();
