import tools from "./tools";

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
      tools.hideElementBlock(contentBlock);
    });
    tabs.forEach((tab) => {
      tab.classList.remove(activeClass);
    });
  }

  function showTabContentById(id = 0) {
    tools.showElementBlock(tabContentBlocks[id]);
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

export default tabs;
