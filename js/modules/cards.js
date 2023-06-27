import { getResource } from "../services/services";

function cards() {
  // Using classes for cards
  class FoodMenuCard {
    constructor(
      imgSrc,
      imgAlt,
      headline,
      description,
      price,
      parentSelector,
      ...classes
    ) {
      this.imgSrc = imgSrc;
      this.imgAlt = imgAlt;
      this.headline = headline;
      this.description = description;
      this.price = price;
      this.transferUAH = 27; // May be we will get this data from some services in future
      this.changeToUAH();
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

  getResource("http://localhost:3000/menu").then((foodCardsArr) => {
    foodCardsArr.forEach(
      ({
        // Деструктуризация объекта foodCard
        // Формат параметров: "Ключ в json-объекте": "название параметра внутри функции"
        img: imgSrc,
        altimg: imgAlt,
        title: headline,
        descr: description,
        price: price,
      }) => {
        new FoodMenuCard(
          imgSrc,
          imgAlt,
          headline,
          description,
          price,
          ".menu__field .container"
        ).render();
      }
    );
  });
}

export default cards;
