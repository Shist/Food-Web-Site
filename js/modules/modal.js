import tools from "./tools";
import { hideModalWindowTimeoutID } from "./forms";

function setModalWindowToDefault() {
  const thankfulDialog = document.querySelector(".modal__dialog_thankful");
  thankfulDialog?.remove();
  const mainDialog = document.querySelector(".modal__dialog");
  tools.showElementBlock(mainDialog);
  const inputs = document.querySelectorAll(".modal__input");
  inputs.forEach((input) => (input.value = ""));
}

function openModalWindow(modalSelector, modalTimerId) {
  const modalWindow = document.querySelector(modalSelector);
  tools.showElementBlock(modalWindow);
  document.body.style.overflow = "hidden";
  if (modalTimerId) {
    clearTimeout(modalTimerId);
  }
}

function hideModalWindow(modalSelector) {
  const modalWindow = document.querySelector(modalSelector);
  clearTimeout(hideModalWindowTimeoutID);
  tools.hideElementBlock(modalWindow);
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

export default modal;
export { openModalWindow, hideModalWindow };
