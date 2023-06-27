function tabs() {
  const tools = require("./tools");

  // Tabs
  const tabContentBlocks = document.querySelectorAll(".tabcontent");
  const tabContainer = document.querySelector(".tabheader__items");
  const tabs = document.querySelectorAll(".tabheader__item");

  function hideAllTabContent() {
    tabContentBlocks.forEach((contentBlock) => {
      contentBlock.classList.remove("fade-animation");
      tools.hideElementBlock(contentBlock);
    });
    tabs.forEach((tab) => {
      tab.classList.remove("tabheader__item_active");
    });
  }

  function showTabContentById(id = 0) {
    tools.showElementBlock(tabContentBlocks[id]);
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
}

module.exports = tabs;
