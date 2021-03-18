import renderProductCart from '../utils/renderProductCart.js';
import removeAllChildNodes from '../utils/removeAllChildNodes.js';

const cartDOM = document.querySelector('.cart__center');
const itemsTotal = document.querySelector('.item__total');
const cartTotal = document.querySelector('.cart__total');
const clearCart = document.querySelector('.clear__cart');

export default class Cart {
  

  constructor() {
    this.totalPrice = 0;
    this.totalProducts = 0;
    this.items = new Map(); // lista de compras {llave: valor}
    // this.items.get(key) => devolver el valor

    // Event Listeners
    this.addCleanCartEvent();
  }

  // Principal
  /**
   * ADD Item => Hacer la logica del Mapa (agrega) o Revisar si existe
   *    Si no existe => renderItem (agregarlo en el DOM)
   *    renderItem => llama a createItem (crea un molde y agrega listeners)
   */
  addItem(item) {
    const existingProduct = this.items.get(item.id);

    this.totalPrice += item.price;
    this.totalProducts++;

    if (existingProduct) {
      const currentAmount = existingProduct.amount;

      return this.updateAmountItem(item.id, currentAmount + 1);
    }

    this.items.set(item.id, item);
    this.renderItem(item);
  }

  // Crea los elementos necesarios del Modal + eventos listeners
  createItem(id, title, image, price, amount) {
    let modal = document.createElement('div');
    modal.classList.add('cart__item');
    modal.id = `product-${id}`;
    modal.innerHTML = renderProductCart(id, title, image, price, amount);

    const increaseButton = modal.querySelector(`.increase`);
    const decreaseButton = modal.querySelector(`.decrease`);
    const removeButton = modal.querySelector(`#remove-${id}`);

    // Listeners
    removeButton.addEventListener('click', () => this.removeItem(id));

    increaseButton.addEventListener('click', () =>
      this.handleUpdateButton(id, 'increase')
    );

    decreaseButton.addEventListener('click', (event) => {
      const { amount: currentAmount } = this.items.get(id);
      // const amount = this.items.get(id);
      // const currentAmount = amount;

      this.handleUpdateButton(id, 'decrease');
      // if (currentAmount - 1 === 0) {
      //   this.removeItem(id);
      // }
      currentAmount - 1 === 0 && this.removeItem(id);
    });

    return modal;
  }

  handleUpdateButton(id, operation) {
    const toUpdate = this.items.get(id);
    switch (operation) {
      case 'increase':
        this.totalPrice += toUpdate.price;
        this.totalProducts++;
        this.updateAmountItem(id, toUpdate.amount + 1);
        return this.setItemValues();
      case 'decrease':
        this.totalPrice -= toUpdate.price;
        this.totalProducts--;
        this.updateAmountItem(id, toUpdate.amount - 1);
        return this.setItemValues();
      default:
        return;
    }
  }

  removeItem = (id) => {
    const productToDelete = this.items.get(id);

    this.totalPrice -= productToDelete.amount * productToDelete.price;
    this.totalProducts -= productToDelete.amount;

    this.deleteDisplayItem(id);
    this.items.delete(id);
    this.setItemValues();
  };

  /* Agregar el escuchador del evento click en clearCartButton */
  addCleanCartEvent() {
    clearCart.addEventListener('click', () => {
      this.totalPrice = 0;
      this.totalProducts = 0;

      this.items = new Map();

      this.deleteDisplayAllItems();
      this.setItemValues();
    });
  }

  // Render Operations(lógica de productos)

  // Agrega en el Modal el producto
  renderItem({ id, title, image, price, amount }) {
    cartDOM.append(this.createItem(id, title, image, price, amount));
  }

  // Actualiza el input de producto ya añadido en el modal suma o resta el product
  // dependiendo el caso
  updateAmountItem(id, newAmount) {
    const toUpdate = this.items.get(id);
    this.items.set(id, { ...toUpdate, amount: newAmount });
    //actualiza y agrega los elementos expandiendo con ...spread

    const input = cartDOM.querySelector(`#product-${id} input.item__amount`);
    input.value = newAmount.toString();
  }

  // Busca en el dom el Id y lo remueve
  deleteDisplayItem(id) {
    cartDOM.querySelector(`#product-${id}`).remove();
  }

  // borra todos los elementos del modal y actualiza el valor
  deleteDisplayAllItems() {
    removeAllChildNodes(cartDOM);
  }

  // Actualiza en el DOM los valores de cantidad y precio total
  setItemValues() {
    itemsTotal.innerText = this.totalProducts;
    cartTotal.innerText = parseFloat(this.totalPrice.toFixed(2));
  }

  logger() {
    console.log('Carrito de compras', this.items);
  }
}
