import fs from "fs";
import { v4 as uuidv4 } from "uuid";

const path = "./src/data/products.json";

export default class ProductManager {
  constructor() {
    this.path = path;
  }

  async getProducts() {
    if (!fs.existsSync(this.path)) return [];
    const data = await fs.promises.readFile(this.path, "utf-8");
    return JSON.parse(data);
  }

  async getProductById(id) {
    const products = await this.getProducts();
    return products.find((p) => p.id === id) || null;
  }

  async addProduct({ title, description, code, price, status = true, stock, category, thumbnails = [] }) {
    const products = await this.getProducts();
    const newProduct = { id: uuidv4(), title, description, code, price, status, stock, category, thumbnails };
    products.push(newProduct);
    await fs.promises.writeFile(this.path, JSON.stringify(products, null, 2));
    return newProduct;
  }

  async updateProduct(id, updatedFields) {
    let products = await this.getProducts();
    const index = products.findIndex((p) => p.id === id);
    if (index === -1) return null;

    products[index] = { ...products[index], ...updatedFields };
    await fs.promises.writeFile(this.path, JSON.stringify(products, null, 2));
    return products[index];
  }

  async deleteProduct(id) {
    let products = await this.getProducts();
    const filteredProducts = products.filter((p) => p.id !== id);
    if (products.length === filteredProducts.length) return null;

    await fs.promises.writeFile(this.path, JSON.stringify(filteredProducts, null, 2));
    return true;
  }
}