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
  btnsOpenModalWindow.forEach((btn) => {
    btn.addEventListener("click", () => {
      modalWindow.classList.remove("hidden-element");
      modalWindow.classList.add("appeared-block");
      document.body.style.overflow = "hidden";
    });
  });
  function hideModalWindow() {
    modalWindow.classList.remove("appeared-block");
    modalWindow.classList.add("hidden-element");
    document.body.style.overflow = "";
  }
  btnsCloseModalWindow.forEach((btn) => {
    btn.addEventListener("click", hideModalWindow);
  });
  modalWindow.addEventListener("click", (event) => {
    if (event.target === modalWindow) {
      hideModalWindow();
    }
  });
});
