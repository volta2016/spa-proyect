// Storage
export default class Storage {
  static saveProducts(obj) {
    localStorage.setItem('products', JSON.stringify(obj));
  }

  static saveCart(cart) {
    localStorage.setItem('carts', JSON.stringify(cart));
  }

  static getProducts(id) {
    const products = JSON.parse(localStorage.getItem('products'));
    return products.find((item) => item.id === parseInt(id));
  }

  static removeCart(cart) {
    localStorage.removeItem('carts', JSON.stringify(cart));
  }
}
