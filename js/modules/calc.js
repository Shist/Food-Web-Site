function calc() {
  // Calculator
  const result = document.querySelector(".calculating__result span");
  let gender;
  let height;
  let weight;
  let age;
  let ratio;

  if (localStorage.getItem("gender")) {
    gender = localStorage.getItem("gender");
  } else {
    gender = "female"; // By default
    localStorage.setItem("gender", gender);
  }

  if (localStorage.getItem("ratio")) {
    ratio = localStorage.getItem("ratio");
  } else {
    ratio = 1.375; // By default
    localStorage.setItem("ratio", ratio);
  }

  function initLocalSettings(selector, activeClass) {
    const elements = document.querySelectorAll(selector);
    elements.forEach((element) => {
      element.classList.remove(activeClass);
      if (element.getAttribute("id") === localStorage.getItem("gender")) {
        element.classList.add(activeClass);
      }
      if (
        element.getAttribute("data-ratio") === localStorage.getItem("ratio")
      ) {
        element.classList.add(activeClass);
      }
    });
  }

  initLocalSettings("#gender div", "calculating__choose-item_active");
  initLocalSettings(
    ".calculating__choose_big div",
    "calculating__choose-item_active"
  );

  function calcTotal() {
    if (gender && height && weight && age && ratio) {
      if (gender === "female") {
        result.textContent = Math.round(
          ratio * (447.6 + 9.2 * weight + 3.1 * height - 4.3 * age)
        );
      } else {
        // gender === "male"
        result.textContent = Math.round(
          ratio * (88.36 + 13.4 * weight + 4.8 * height - 5.7 * age)
        );
      }
    } else {
      result.textContent = "____";
      return false;
    }
  }

  calcTotal(); // Initial calculation

  function getStaticInfo(selector, activeClass) {
    const elements = document.querySelectorAll(selector);

    elements.forEach((element) => {
      element.addEventListener("click", (event) => {
        if (event.target.getAttribute("data-ratio")) {
          ratio = event.target.getAttribute("data-ratio");
          localStorage.setItem("ratio", ratio);
        } else {
          gender = event.target.getAttribute("id");
          localStorage.setItem("gender", gender);
        }
        elements.forEach((element) => element.classList.remove(activeClass));
        event.target.classList.add(activeClass);

        calcTotal();
      });
    });
  }

  getStaticInfo("#gender div", "calculating__choose-item_active");
  getStaticInfo(
    ".calculating__choose_big div",
    "calculating__choose-item_active"
  );

  function getDynamicInfo(inputSelector) {
    const input = document.querySelector(inputSelector);

    input.addEventListener("input", () => {
      if (input.value.match(/[^\d\.]/g)) {
        input.style.border = "3px solid red";
      } else {
        input.style.border = "none";
      }

      switch (input.getAttribute("id")) {
        case "height":
          height = +input.value;
          break;
        case "weight":
          weight = +input.value;
          break;
        case "age":
          age = +input.value;
          break;
      }

      calcTotal();
    });
  }

  getDynamicInfo("#height");
  getDynamicInfo("#weight");
  getDynamicInfo("#age");
}

export default calc;
