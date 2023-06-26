"use strict";

document.addEventListener("DOMContentLoaded", () => {
  function showElementBlock(domElement) {
    domElement.classList.remove("hidden-element");
    domElement.classList.add("appeared-block");
  }

  function hideElementBlock(domElement) {
    domElement.classList.remove("appeared-block");
    domElement.classList.add("hidden-element");
  }

  const tabContentBlocks = document.querySelectorAll(".tabcontent");
  const tabContainer = document.querySelector(".tabheader__items");
  const tabs = document.querySelectorAll(".tabheader__item");

  function hideAllTabContent() {
    tabContentBlocks.forEach((contentBlock) => {
      contentBlock.classList.remove("fade-animation");
      hideElementBlock(contentBlock);
    });
    tabs.forEach((tab) => {
      tab.classList.remove("tabheader__item_active");
    });
  }

  function showTabContentById(id = 0) {
    showElementBlock(tabContentBlocks[id]);
    tabContentBlocks[id].classList.add("fade-animation");
    tabs[id].classList.add("tabheader__item_active");
  }

  tabContainer.addEventListener("click", (event) => {
    const clickedTab = event.target;
    if (clickedTab && clickedTab.matches("div.tabheader__item")) {
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

  showTimerOnPage(".timer", targetFullDate);

  // Modal Window

  const modalWindow = document.querySelector(".modal");
  const btnsOpenModalWindow = document.querySelectorAll("[data-modal-window]");
  const timerBeforeModal = setTimeout(openModalWindow, 10000);
  function openModalWindow() {
    showElementBlock(modalWindow);
    document.body.style.overflow = "hidden";
    clearTimeout(timerBeforeModal);
    document.removeEventListener("scroll", openModalWindowByScroll);
  }
  let hideModalWindowTimeoutID = null;
  function hideModalWindow() {
    clearTimeout(hideModalWindowTimeoutID);
    hideElementBlock(modalWindow);
    document.body.style.overflow = "";
    setModalWindowToDefault();
  }
  function openModalWindowByScroll() {
    if (
      window.scrollY + document.documentElement.clientHeight >=
      document.documentElement.scrollHeight - 1
    ) {
      openModalWindow();
    }
  }
  function setModalWindowToDefault() {
    const thankfulDialog = document.querySelector(".modal__dialog_thankful");
    thankfulDialog?.remove();
    const mainDialog = document.querySelector(".modal__dialog");
    showElementBlock(mainDialog);
    const inputs = document.querySelectorAll(".modal__input");
    inputs.forEach((input) => (input.value = ""));
  }
  btnsOpenModalWindow.forEach((btn) => {
    btn.addEventListener("click", openModalWindow);
  });
  modalWindow.addEventListener("click", (event) => {
    if (
      event.target === modalWindow ||
      event.target.getAttribute("data-close-modal-window") == ""
    ) {
      hideModalWindow();
    }
  });
  document.addEventListener("keydown", (event) => {
    if (
      event.code === "Escape" &&
      modalWindow.classList.contains("appeared-block")
    ) {
      hideModalWindow();
    }
  });
  document.addEventListener("scroll", openModalWindowByScroll);

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

  const getResource = async (url) => {
    const result = await fetch(url);

    if (!result.ok) {
      throw new Error(`Could not fetch ${url}, status: ${result.status}`);
    }

    return await result.json(); // Извлекаем из HTTP-ответа данные (которые в виде json формата) и возвращаем их в виде js-объекта
  };

  getResource("http://localhost:3000/menu").then((foodCardsArr) => {
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

  // Posting user data to server with Forms

  const messageForUser = {
    loadingImg: "img/form/spinner.svg",
    success: "Мы успешно получили Ваши данные, мы скоро свяжемся с Вами!",
    failure: "Что-то пошло не так.",
  };

  const forms = document.querySelectorAll("form");

  forms.forEach((item) => bindPostData(item));

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

  function bindPostData(form) {
    form.addEventListener("submit", (event) => {
      event.preventDefault();

      const imgLoading = document.createElement("img");
      imgLoading.src = messageForUser.loadingImg;
      imgLoading.classList.add("img-spinner");
      form.insertAdjacentElement("afterend", imgLoading);

      const formData = new FormData(form);

      const dataInJson = JSON.stringify(Object.fromEntries(formData.entries()));

      postData("http://localhost:3000/requests", dataInJson)
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
    hideElementBlock(mainDialog);

    const thankfulDialog = document.createElement("div");
    thankfulDialog.classList.add("modal__dialog", "modal__dialog_thankful");
    thankfulDialog.innerHTML = `
      <div class="modal__content">
        <div class="modal__close" data-close-modal-window>&times;</div>
        <div class="modal__title">${message}</div>
      </div>
    `;

    document.querySelector(".modal").append(thankfulDialog);

    openModalWindow();

    hideModalWindowTimeoutID = setTimeout(hideModalWindow, 5000);
  }

  fetch("http://localhost:3000/menu")
    .then((data) => data.json())
    .then((result) => console.log(result));

  // Slider with food images

  const slides = document.querySelectorAll(".offer__slide");
  const sliderWrapper = document.querySelector(".offer__slider");
  const btnSliderPrev = document.querySelector(".offer__slider-prev");
  const btnSliderNext = document.querySelector(".offer__slider-next");
  const maxSlideNumLabel = document.querySelector("#total");
  const currSlideNumLabel = document.querySelector("#current");
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

  const slidesWrapper = document.querySelector(".offer__slider-wrapper");
  const slidesWrapperWidth = window.getComputedStyle(slidesWrapper).width;
  const sliderWidthNum = +slidesWrapperWidth.replace(/[^\d\.]/g, ""); // [^\d\.] - Any symbol except digits and "."

  const slidesField = document.querySelector(".offer__slider-inner");
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
});
