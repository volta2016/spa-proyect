const renderProductCart = (id, title, image, price, amount) => `
    <img src=${image}>
    <div>
      <h3 class="titleproduct">${title}</h3>
      <h3 class="price">$${price}</h3>
    </div>
    <div>
      <span class="increase" data-id=${id}>
        <svg>
          <use xlink:href="./images/sprite.svg#icon-angle-up"></use>
        </svg>
      </span>
      <input class="item__amount" type="number" value=${amount}>
      <span class="decrease" data-id=${id}>
        <svg>
          <use xlink:href="./images/sprite.svg#icon-angle-down"></use>
        </svg>
      </span>
    </div>
      <span id="remove-${id}"  class="remove__item">
        <svg>
          <use xlink:href="./images/sprite.svg#icon-trash"></use>
        </svg>
      </span>
    </div>
`;

export default renderProductCart;
