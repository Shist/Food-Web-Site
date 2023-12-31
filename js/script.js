"use strict";

require("es6-promise").polyfill();
import "nodelist-foreach-polyfill";

import calc from "./modules/calc";
import cards from "./modules/cards";
import forms from "./modules/forms";
import modal from "./modules/modal";
import slider from "./modules/slider";
import tabs from "./modules/tabs";
import timer from "./modules/timer";
import { openModalWindow } from "./modules/modal";

document.addEventListener("DOMContentLoaded", () => {
  const timerBeforeModal = setTimeout(
    () => openModalWindow(".modal", timerBeforeModal),
    10000
  );

  calc();
  cards();
  forms("form", timerBeforeModal);
  modal("[data-modal-window]", ".modal", timerBeforeModal);
  slider({
    container: ".offer__slider",
    slide: ".offer__slide",
    prevArrow: ".offer__slider-prev",
    nextArrow: ".offer__slider-next",
    totalCounter: "#total",
    currentCounter: "#current",
    wrapper: ".offer__slider-wrapper",
    field: ".offer__slider-inner",
  });
  tabs(
    ".tabheader__item",
    ".tabcontent",
    ".tabheader__items",
    "tabheader__item_active"
  );
  timer(".timer");
});
