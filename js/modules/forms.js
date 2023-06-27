import tools from "./tools";
import { openModalWindow, hideModalWindow } from "./modal";
import { postData } from "../services/services";

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
    tools.hideElementBlock(mainDialog);

    const thankfulDialog = document.createElement("div");
    thankfulDialog.classList.add("modal__dialog", "modal__dialog_thankful");
    thankfulDialog.innerHTML = `
      <div class="modal__content">
        <div class="modal__close" data-close-modal-window>&times;</div>
        <div class="modal__title">${message}</div>
      </div>
    `;

    document.querySelector(".modal").append(thankfulDialog);

    openModalWindow(".modal", timerBeforeModal);

    hideModalWindowTimeoutID = setTimeout(
      () => hideModalWindow(".modal"),
      5000
    );
  }

  fetch("http://localhost:3000/menu")
    .then((data) => data.json())
    .then((result) => console.log(result));
}

export default forms;
export { hideModalWindowTimeoutID };
