"use strict";

document.addEventListener("DOMContentLoaded", () => {
  const tabContentBlocks = document.querySelectorAll(".tabcontent");
  const tabContainer = document.querySelector(".tabheader__items");
  const tabs = document.querySelectorAll(".tabheader__item");

  function hideAllTabContent() {
    tabContentBlocks.forEach((contentBlock) => {
      contentBlock.classList.remove("appeared-block", "fade-animation");
      contentBlock.classList.add("hidden-element");
    });
    tabs.forEach((tab) => {
      tab.classList.remove("tabheader__item_active");
    });
  }

  function showTabContentById(id = 0) {
    tabContentBlocks[id].classList.remove("hidden-element");
    tabContentBlocks[id].classList.add("appeared-block", "fade-animation");
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
  const btnsCloseModalWindow = document.querySelectorAll(
    "[data-close-modal-window]"
  );
  const timerBeforeModal = setTimeout(openModalWindow, 5000);
  function openModalWindow() {
    modalWindow.classList.remove("hidden-element");
    modalWindow.classList.add("appeared-block");
    document.body.style.overflow = "hidden";
    clearTimeout(timerBeforeModal);
    document.removeEventListener("scroll", openModalWindowByScroll);
  }
  function hideModalWindow() {
    modalWindow.classList.remove("appeared-block");
    modalWindow.classList.add("hidden-element");
    document.body.style.overflow = "";
  }
  function openModalWindowByScroll() {
    if (
      window.scrollY + document.documentElement.clientHeight >=
      document.documentElement.scrollHeight - 1
    ) {
      openModalWindow();
    }
  }
  btnsOpenModalWindow.forEach((btn) => {
    btn.addEventListener("click", openModalWindow);
  });
  btnsCloseModalWindow.forEach((btn) => {
    btn.addEventListener("click", hideModalWindow);
  });
  modalWindow.addEventListener("click", (event) => {
    if (event.target === modalWindow) {
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

  // Использование классов для карточек

  class FoodMenuCard {
    constructor(
      headline,
      description,
      price,
      imgSrc,
      imgAlt,
      parentSelector,
      ...classes
    ) {
      this.headline = headline;
      this.description = description;
      this.price = price;
      this.transferUAH = 27; // May be we will get this data from some services in future
      this.changeToUAH();
      this.imgSrc = imgSrc;
      this.imgAlt = imgAlt;
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

  new FoodMenuCard(
    `Меню "Фитнес"`,
    `Меню "Фитнес" - это новый подход к приготовлению блюд: больше
    свежих овощей и фруктов. Продукт активных и здоровых людей. Это
    абсолютно новый продукт с оптимальной ценой и высоким качеством!`,
    9, // Dollars
    "img/tabs/vegy.jpg",
    "vegy",
    ".menu__field .container"
  ).render();
  new FoodMenuCard(
    `Меню “Премиум”`,
    `В меню “Премиум” мы используем не только красивый дизайн упаковки,
    но и качественное исполнение блюд. Красная рыба, морепродукты,
    фрукты - ресторанное меню без похода в ресторан!`,
    14, // Dollars
    "img/tabs/elite.jpg",
    "elite",
    ".menu__field .container"
  ).render();
  new FoodMenuCard(
    `Меню "Постное"`,
    `Меню “Постное” - это тщательный подбор ингредиентов: полное
    отсутствие продуктов животного происхождения, молоко из миндаля,
    овса, кокоса или гречки, правильное количество белков за счет тофу
    и импортных вегетарианских стейков.`,
    21, // Dollars
    "img/tabs/post.jpg",
    "post",
    ".menu__field .container"
  ).render();
});

// Posting user data to server with Forms

const messageForUser = {
  loading: "Отправка данных на сервер...",
  success: "Мы успешно получили Ваши данные, мы скоро свяжемся с Вами!",
  failure: "Что-то пошло не так.",
};

const forms = document.querySelectorAll("form");

forms.forEach((item) => postData(item));

function postData(form) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const divStatusMsg = document.createElement("div");
    divStatusMsg.classList.add("status"); // We don't have this class, but we should mark that div
    divStatusMsg.textContent = messageForUser.loading;
    form.append(divStatusMsg);

    const request = new XMLHttpRequest();

    request.addEventListener("load", () => {
      if (request.status === 200) {
        console.log(`Data from server:\n${request.response}`);
        divStatusMsg.textContent = messageForUser.success;
        form.reset();
        setTimeout(() => {
          divStatusMsg.remove();
        }, 3000);
      } else {
        divStatusMsg.textContent = `${messageForUser.failure} Код ошибки: ${request.status}`;
      }
    });

    request.open("POST", "server.php");

    request.setRequestHeader("Content-type", "application/json");

    const formData = new FormData(form);

    const dataObj = {};

    formData.forEach((value, key) => {
      dataObj[key] = value;
    });

    request.send(JSON.stringify(dataObj));
  });
}
