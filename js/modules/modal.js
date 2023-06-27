function modal() {
  const tools = require("./tools");

  // Modal Window
  const modalWindow = document.querySelector(".modal");
  const btnsOpenModalWindow = document.querySelectorAll("[data-modal-window]");
  const timerBeforeModal = setTimeout(openModalWindow, 10000);
  function openModalWindow() {
    tools.showElementBlock(modalWindow);
    document.body.style.overflow = "hidden";
    clearTimeout(timerBeforeModal);
    document.removeEventListener("scroll", openModalWindowByScroll);
  }
  let hideModalWindowTimeoutID = null;
  function hideModalWindow() {
    clearTimeout(hideModalWindowTimeoutID);
    tools.hideElementBlock(modalWindow);
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
    tools.showElementBlock(mainDialog);
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
}

module.exports = modal;
