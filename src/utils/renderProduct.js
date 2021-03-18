const renderProduct = (id, title, price, image) => `
      <div class="product">
      <div class="image__container">
        <img src="${image}" alt="${title}" />
      </div>
      <div class="product__footer">
        <h2>${title}</h2>
        <div class="rating">
          <span>
            <svg>
              <use xlink:href="./images/sprite.svg#icon-star-full"></use>
            </svg>
          </span>
          <span>
            <svg>
              <use xlink:href="./images/sprite.svg#icon-star-full"></use>
            </svg>
          </span>
          <span>
            <svg>
              <use xlink:href="./images/sprite.svg#icon-star-full"></use>
            </svg>
          </span>
          <span>
            <svg>
              <use xlink:href="./images/sprite.svg#icon-star-full"></use>
            </svg>
          </span>
          <span>
            <svg>
              <use xlink:href="./images/sprite.svg#icon-star-empty"></use>
            </svg>
          </span>
        </div>
        <div class="bottom">
          <div class="btn__group">
            <button class="btn addToCart" data-id=${id}>Add to Cart</button>
            <button class="btn view">View</button>
          </div>
          <div class="price">$${price}</div>
        </div>
      </div>
    </div>
`;

export default renderProduct;
