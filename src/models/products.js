// Products
export default class Products {
  // fetch API link
  async getProduct() {
    try {
      const results = await fetch('/products.json');
      debugger
      const data = await results.json();
      const products = data.items;
      // console.log(products);
      return products;
    } catch (err) {
      console.log(err);
      return []
    }
  }
}
