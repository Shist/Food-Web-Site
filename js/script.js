document.addEventListener("DOMContentLoaded", () => {
  const tabContentBlocks = document.querySelectorAll(".tabcontent");
  const tabContainer = document.querySelector(".tabheader__items");
  const tabs = document.querySelectorAll(".tabheader__item");

  const hideAllTabContent = () => {
    tabContentBlocks.forEach((contentBlock) => {
      contentBlock.classList.remove("appeared-block", "fade-animation");
      contentBlock.classList.add("hidden-element");
    });
    tabs.forEach((tab) => {
      tab.classList.remove("tabheader__item_active");
    });
  };

  const showTabContentById = (id = 0) => {
    tabContentBlocks[id].classList.remove("hidden-element");
    tabContentBlocks[id].classList.add("appeared-block", "fade-animation");
    tabs[id].classList.add("tabheader__item_active");
  };

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
});
