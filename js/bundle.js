/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/modules/calc.js":
/*!****************************!*\
  !*** ./js/modules/calc.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
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

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (calc);


/***/ }),

/***/ "./js/modules/cards.js":
/*!*****************************!*\
  !*** ./js/modules/cards.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");


function cards() {
  // Using classes for cards
  class FoodMenuCard {
    constructor(
      imgSrc,
      imgAlt,
      headline,
      description,
      price,
      parentSelector,
      ...classes
    ) {
      this.imgSrc = imgSrc;
      this.imgAlt = imgAlt;
      this.headline = headline;
      this.description = description;
      this.price = price;
      this.transferUAH = 27; // May be we will get this data from some services in future
      this.changeToUAH();
      this.parent = document.querySelector(parentSelector);
      this.classes = classes;
    }

    changeToUAH() {
      this.price = this.price * this.transferUAH;
    }

    render() {
      const newFoodMenuCard = document.createElement("div");
      if (this.classes.length) {
        this.classes.forEach((oneMoreClass) => {
          newFoodMenuCard.classList.add(oneMoreClass);
        });
      } else {
        this.element = "menu__item";
        newFoodMenuCard.classList.add(this.element);
      }
      newFoodMenuCard.innerHTML = `
        <img src=${this.imgSrc} alt=${this.imgAlt} />
        <h3 class="menu__item-subtitle">${this.headline}</h3>
        <div class="menu__item-descr">
          ${this.description}
        </div>
        <div class="menu__item-divider"></div>
        <div class="menu__item-price">
          <div class="menu__item-cost">Цена:</div>
          <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
        </div>
      `;
      this.parent.append(newFoodMenuCard);
    }
  }

  (0,_services_services__WEBPACK_IMPORTED_MODULE_0__.getResource)("http://localhost:3000/menu").then((foodCardsArr) => {
    foodCardsArr.forEach(
      ({
        // Деструктуризация объекта foodCard
        // Формат параметров: "Ключ в json-объекте": "название параметра внутри функции"
        img: imgSrc,
        altimg: imgAlt,
        title: headline,
        descr: description,
        price: price,
      }) => {
        new FoodMenuCard(
          imgSrc,
          imgAlt,
          headline,
          description,
          price,
          ".menu__field .container"
        ).render();
      }
    );
  });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (cards);


/***/ }),

/***/ "./js/modules/forms.js":
/*!*****************************!*\
  !*** ./js/modules/forms.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   hideModalWindowTimeoutID: () => (/* binding */ hideModalWindowTimeoutID)
/* harmony export */ });
/* harmony import */ var _tools__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./tools */ "./js/modules/tools.js");
/* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modal */ "./js/modules/modal.js");
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");




let hideModalWindowTimeoutID = null;

function forms(formSelector, timerBeforeModal) {
  // Posting user data to server with Forms
  const messageForUser = {
    loadingImg: "img/form/spinner.svg",
    success: "Мы успешно получили Ваши данные, мы скоро свяжемся с Вами!",
    failure: "Что-то пошло не так.",
  };

  const forms = document.querySelectorAll(formSelector);

  forms.forEach((item) => bindPostData(item));

  function bindPostData(form) {
    form.addEventListener("submit", (event) => {
      event.preventDefault();

      const imgLoading = document.createElement("img");
      imgLoading.src = messageForUser.loadingImg;
      imgLoading.classList.add("img-spinner");
      form.insertAdjacentElement("afterend", imgLoading);

      const formData = new FormData(form);

      const dataInJson = JSON.stringify(Object.fromEntries(formData.entries()));

      (0,_services_services__WEBPACK_IMPORTED_MODULE_2__.postData)("http://localhost:3000/requests", dataInJson)
        .then((data) => {
          console.log(data);
          showThankfulModal(messageForUser.success);
        })
        .catch((data) => {
          showThankfulModal(
            `${messageForUser.failure} Информация об ошибке: ${data}`
          );
        })
        .finally(() => {
          form.reset();
          imgLoading.remove();
        });
    });
  }

  // Creating thankful window for user after he sends his data inside form
  function showThankfulModal(message) {
    const mainDialog = document.querySelector(".modal__dialog");
    _tools__WEBPACK_IMPORTED_MODULE_0__["default"].hideElementBlock(mainDialog);

    const thankfulDialog = document.createElement("div");
    thankfulDialog.classList.add("modal__dialog", "modal__dialog_thankful");
    thankfulDialog.innerHTML = `
      <div class="modal__content">
        <div class="modal__close" data-close-modal-window>&times;</div>
        <div class="modal__title">${message}</div>
      </div>
    `;

    document.querySelector(".modal").append(thankfulDialog);

    (0,_modal__WEBPACK_IMPORTED_MODULE_1__.openModalWindow)(".modal", timerBeforeModal);

    hideModalWindowTimeoutID = setTimeout(
      () => (0,_modal__WEBPACK_IMPORTED_MODULE_1__.hideModalWindow)(".modal"),
      5000
    );
  }

  fetch("http://localhost:3000/menu")
    .then((data) => data.json())
    .then((result) => console.log(result));
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (forms);



/***/ }),

/***/ "./js/modules/modal.js":
/*!*****************************!*\
  !*** ./js/modules/modal.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   hideModalWindow: () => (/* binding */ hideModalWindow),
/* harmony export */   openModalWindow: () => (/* binding */ openModalWindow)
/* harmony export */ });
/* harmony import */ var _tools__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./tools */ "./js/modules/tools.js");
/* harmony import */ var _forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./forms */ "./js/modules/forms.js");



function setModalWindowToDefault() {
  const thankfulDialog = document.querySelector(".modal__dialog_thankful");
  thankfulDialog?.remove();
  const mainDialog = document.querySelector(".modal__dialog");
  _tools__WEBPACK_IMPORTED_MODULE_0__["default"].showElementBlock(mainDialog);
  const inputs = document.querySelectorAll(".modal__input");
  inputs.forEach((input) => (input.value = ""));
}

function openModalWindow(modalSelector, modalTimerId) {
  const modalWindow = document.querySelector(modalSelector);
  _tools__WEBPACK_IMPORTED_MODULE_0__["default"].showElementBlock(modalWindow);
  document.body.style.overflow = "hidden";
  if (modalTimerId) {
    clearTimeout(modalTimerId);
  }
}

function hideModalWindow(modalSelector) {
  const modalWindow = document.querySelector(modalSelector);
  clearTimeout(_forms__WEBPACK_IMPORTED_MODULE_1__.hideModalWindowTimeoutID);
  _tools__WEBPACK_IMPORTED_MODULE_0__["default"].hideElementBlock(modalWindow);
  document.body.style.overflow = "";
  setModalWindowToDefault();
}

function modal(triggerSelector, modalSelector, modalTimerId) {
  // Modal Window
  const modalWindow = document.querySelector(modalSelector);
  const btnsOpenModalWindow = document.querySelectorAll(triggerSelector);

  btnsOpenModalWindow.forEach((btn) => {
    btn.addEventListener("click", () =>
      openModalWindow(modalSelector, modalTimerId)
    );
  });

  modalWindow.addEventListener("click", (event) => {
    if (
      event.target === modalWindow ||
      event.target.getAttribute("data-close-modal-window") == ""
    ) {
      hideModalWindow(modalSelector);
    }
  });

  document.addEventListener("keydown", (event) => {
    if (
      event.code === "Escape" &&
      modalWindow.classList.contains("appeared-block")
    ) {
      hideModalWindow(modalSelector);
    }
  });

  function openModalWindowByScroll() {
    if (
      window.scrollY + document.documentElement.clientHeight >=
      document.documentElement.scrollHeight - 1
    ) {
      openModalWindow(modalSelector, modalTimerId);
      document.removeEventListener("scroll", openModalWindowByScroll);
    }
  }

  document.addEventListener("scroll", openModalWindowByScroll);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (modal);



/***/ }),

/***/ "./js/modules/slider.js":
/*!******************************!*\
  !*** ./js/modules/slider.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function slider({
  container,
  slide,
  prevArrow,
  nextArrow,
  totalCounter,
  currentCounter,
  wrapper,
  field,
}) {
  // Slider with food images
  const sliderWrapper = document.querySelector(container);
  const slides = document.querySelectorAll(slide);
  const btnSliderPrev = document.querySelector(prevArrow);
  const btnSliderNext = document.querySelector(nextArrow);
  const maxSlideNumLabel = document.querySelector(totalCounter);
  const currSlideNumLabel = document.querySelector(currentCounter);
  const wholeSlidesCount = slides.length;
  let currSlideNum = +currSlideNumLabel.textContent;
  let slideOffset = 0;

  if (wholeSlidesCount < 10) {
    maxSlideNumLabel.textContent = `0${wholeSlidesCount}`;
    currSlideNumLabel.textContent = `0${currSlideNum}`;
  } else {
    maxSlideNumLabel.textContent = wholeSlidesCount;
    currSlideNumLabel.textContent = currSlideNum;
  }

  const slidesWrapper = document.querySelector(wrapper);
  const slidesWrapperWidth = window.getComputedStyle(slidesWrapper).width;
  const sliderWidthNum = +slidesWrapperWidth.replace(/[^\d\.]/g, ""); // [^\d\.] - Any symbol except digits and "."

  const slidesField = document.querySelector(field);
  slidesField.style.width = 100 * wholeSlidesCount + "%";

  slides.forEach((slide) => {
    slide.style.width = slidesWrapperWidth;
  });

  sliderWrapper.style.position = "relative";
  const dotsWrapper = document.createElement("ol");
  const dotsArr = [];
  dotsWrapper.classList.add("carousel-indicators");
  slidesWrapper.append(dotsWrapper);

  for (let i = 0; i < slides.length; i++) {
    const nextDot = document.createElement("li");
    nextDot.setAttribute("data-slide-to", i + 1);
    nextDot.classList.add("dot");
    if (i === 0) {
      nextDot.style.opacity = 1;
    }
    dotsWrapper.append(nextDot);
    dotsArr.push(nextDot);
  }

  function updateCurrSlideNumLabel(currSlideNum) {
    if (currSlideNum < 10) {
      currSlideNumLabel.textContent = `0${currSlideNum}`;
    } else {
      currSlideNumLabel.textContent = currSlideNum;
    }
  }

  function makeCurrDotActive(currSlideNum) {
    dotsArr.forEach((dot) => (dot.style.opacity = ".5"));
    dotsArr[currSlideNum - 1].style.opacity = 1;
  }

  btnSliderPrev.addEventListener("click", () => {
    if (!slideOffset) {
      slideOffset = sliderWidthNum * (wholeSlidesCount - 1);
    } else {
      slideOffset -= sliderWidthNum;
    }
    slidesField.style.transform = `translateX(-${slideOffset}px)`;

    if (currSlideNum === 1) {
      currSlideNum = wholeSlidesCount;
    } else {
      currSlideNum--;
    }

    updateCurrSlideNumLabel(currSlideNum);
    makeCurrDotActive(currSlideNum);
  });

  btnSliderNext.addEventListener("click", () => {
    if (slideOffset === sliderWidthNum * (wholeSlidesCount - 1)) {
      slideOffset = 0;
    } else {
      slideOffset += sliderWidthNum;
    }
    slidesField.style.transform = `translateX(-${slideOffset}px)`;

    if (currSlideNum === wholeSlidesCount) {
      currSlideNum = 1;
    } else {
      currSlideNum++;
    }

    updateCurrSlideNumLabel(currSlideNum);
    makeCurrDotActive(currSlideNum);
  });

  dotsWrapper.addEventListener("click", (event) => {
    if (event.target.classList.contains("dot")) {
      const slideTo = event.target.getAttribute("data-slide-to");

      currSlideNum = +slideTo;

      slideOffset = sliderWidthNum * (slideTo - 1);
      slidesField.style.transform = `translateX(-${slideOffset}px)`;

      updateCurrSlideNumLabel(currSlideNum);
      makeCurrDotActive(currSlideNum);
    }
  });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (slider);


/***/ }),

/***/ "./js/modules/tabs.js":
/*!****************************!*\
  !*** ./js/modules/tabs.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _tools__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./tools */ "./js/modules/tools.js");


function tabs(
  tabsSelector,
  tabsContentSelector,
  tabsParentSelector,
  activeClass
) {
  // Tabs
  const tabs = document.querySelectorAll(tabsSelector);
  const tabContentBlocks = document.querySelectorAll(tabsContentSelector);
  const tabContainer = document.querySelector(tabsParentSelector);

  function hideAllTabContent() {
    tabContentBlocks.forEach((contentBlock) => {
      contentBlock.classList.remove("fade-animation");
      _tools__WEBPACK_IMPORTED_MODULE_0__["default"].hideElementBlock(contentBlock);
    });
    tabs.forEach((tab) => {
      tab.classList.remove(activeClass);
    });
  }

  function showTabContentById(id = 0) {
    _tools__WEBPACK_IMPORTED_MODULE_0__["default"].showElementBlock(tabContentBlocks[id]);
    tabContentBlocks[id].classList.add("fade-animation");
    tabs[id].classList.add(activeClass);
  }

  tabContainer.addEventListener("click", (event) => {
    const clickedTab = event.target;
    if (clickedTab && clickedTab.matches(`div${tabsSelector}`)) {
      for (let [index, tab] of tabs.entries()) {
        if (tab === clickedTab) {
          hideAllTabContent();
          showTabContentById(index);
          break;
        }
      }
    }
  });

  hideAllTabContent();
  showTabContentById();
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (tabs);


/***/ }),

/***/ "./js/modules/timer.js":
/*!*****************************!*\
  !*** ./js/modules/timer.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function timer(timerId) {
  // Timer
  const targetFullDate = new Date(); // Today's date (this variable will be changed)
  targetFullDate.setDate(targetFullDate.getDate() + 5); // Today's date + 5 days
  targetFullDate.setUTCHours(0, 0, 0, 0); // Today's date + 5 days, but with zero hours, minutes, seconds and milliseconds (UTC)
  const localTargetDateArr = targetFullDate.toLocaleDateString().split(".");
  const localTargetDay = localTargetDateArr[0];
  const localTargetMonth = localTargetDateArr[1];
  const localTargetYear = localTargetDateArr[2];
  const localTargetTimeArr = targetFullDate.toLocaleTimeString().split(":");
  const localTargetHours = localTargetTimeArr[0];
  const localTargetMins = localTargetTimeArr[1];

  const labelWithTargetDate = document.querySelector(".promotion__target-date");
  labelWithTargetDate.textContent = `Акция закончится: ${localTargetDay}.${localTargetMonth}.${localTargetYear}, в ${localTargetHours}:${localTargetMins}`;

  function calcRemainingTime(deadline) {
    const totalMilSecs = deadline.getTime() - Date.parse(new Date());
    const remainDays = Math.floor(totalMilSecs / 86400000);
    const remainHours = Math.floor((totalMilSecs / 3600000) % 24);
    const remainMins = Math.floor((totalMilSecs / 60000) % 60);
    const remainSecs = Math.floor((totalMilSecs / 1000) % 60);
    return {
      totalMilSecs,
      remainDays,
      remainHours,
      remainMins,
      remainSecs,
    };
  }

  function addNeededZero(num) {
    if (num >= 0 && num < 10) {
      return `0${num}`;
    } else {
      return `${num}`;
    }
  }

  function showTimerOnPage(timerSelector, deadline) {
    const timer = document.querySelector(timerSelector);

    const daysBlock = timer.querySelector("#days");
    const hoursBlock = timer.querySelector("#hours");
    const minsBlock = timer.querySelector("#minutes");
    const secsBlock = timer.querySelector("#seconds");

    updateTimer();
    const timerUpdater = setInterval(updateTimer, 1000);

    function updateTimer() {
      const remainTimeObj = calcRemainingTime(deadline);

      if (remainTimeObj.totalMilSecs > 0) {
        daysBlock.textContent = addNeededZero(remainTimeObj.remainDays);
        hoursBlock.textContent = addNeededZero(remainTimeObj.remainHours);
        minsBlock.textContent = addNeededZero(remainTimeObj.remainMins);
        secsBlock.textContent = addNeededZero(remainTimeObj.remainSecs);
      } else {
        clearInterval(timerUpdater);
        labelWithTargetDate.textContent = `Акция закончилась!!!`;
        daysBlock.textContent = "--";
        hoursBlock.textContent = "--";
        minsBlock.textContent = "--";
        secsBlock.textContent = "--";
      }
    }
  }

  showTimerOnPage(timerId, targetFullDate);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (timer);


/***/ }),

/***/ "./js/modules/tools.js":
/*!*****************************!*\
  !*** ./js/modules/tools.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
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

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (new Tools());


/***/ }),

/***/ "./js/services/services.js":
/*!*********************************!*\
  !*** ./js/services/services.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getResource: () => (/* binding */ getResource),
/* harmony export */   postData: () => (/* binding */ postData)
/* harmony export */ });
const postData = async (url, data) => {
  const result = await fetch(url, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: data,
  });

  return await result.json(); // Извлекаем из HTTP-ответа данные (которые в виде json формата) и возвращаем их в виде js-объекта
};

const getResource = async (url) => {
  const result = await fetch(url);

  if (!result.ok) {
    throw new Error(`Could not fetch ${url}, status: ${result.status}`);
  }

  return await result.json(); // Извлекаем из HTTP-ответа данные (которые в виде json формата) и возвращаем их в виде js-объекта
};




/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_calc__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/calc */ "./js/modules/calc.js");
/* harmony import */ var _modules_cards__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/cards */ "./js/modules/cards.js");
/* harmony import */ var _modules_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/forms */ "./js/modules/forms.js");
/* harmony import */ var _modules_modal__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/modal */ "./js/modules/modal.js");
/* harmony import */ var _modules_slider__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/slider */ "./js/modules/slider.js");
/* harmony import */ var _modules_tabs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/tabs */ "./js/modules/tabs.js");
/* harmony import */ var _modules_timer__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/timer */ "./js/modules/timer.js");











document.addEventListener("DOMContentLoaded", () => {
  const timerBeforeModal = setTimeout(
    () => (0,_modules_modal__WEBPACK_IMPORTED_MODULE_3__.openModalWindow)(".modal", timerBeforeModal),
    10000
  );

  (0,_modules_calc__WEBPACK_IMPORTED_MODULE_0__["default"])();
  (0,_modules_cards__WEBPACK_IMPORTED_MODULE_1__["default"])();
  (0,_modules_forms__WEBPACK_IMPORTED_MODULE_2__["default"])("form", timerBeforeModal);
  (0,_modules_modal__WEBPACK_IMPORTED_MODULE_3__["default"])("[data-modal-window]", ".modal", timerBeforeModal);
  (0,_modules_slider__WEBPACK_IMPORTED_MODULE_4__["default"])({
    container: ".offer__slider",
    slide: ".offer__slide",
    prevArrow: ".offer__slider-prev",
    nextArrow: ".offer__slider-next",
    totalCounter: "#total",
    currentCounter: "#current",
    wrapper: ".offer__slider-wrapper",
    field: ".offer__slider-inner",
  });
  (0,_modules_tabs__WEBPACK_IMPORTED_MODULE_5__["default"])(
    ".tabheader__item",
    ".tabcontent",
    ".tabheader__items",
    "tabheader__item_active"
  );
  (0,_modules_timer__WEBPACK_IMPORTED_MODULE_6__["default"])(".timer");
});

})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map