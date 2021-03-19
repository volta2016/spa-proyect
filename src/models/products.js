// Products
export default class Products {
  async getProduct() {
    try {
      const results = await fetch("/products.json");
      const data = await results.json();
      const products = data.items;
      return products;
    } catch (err) {
      console.log(err);
      return [];
    }
  }
}
