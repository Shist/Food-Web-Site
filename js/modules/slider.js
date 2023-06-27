function slider() {
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
}

module.exports = slider;
