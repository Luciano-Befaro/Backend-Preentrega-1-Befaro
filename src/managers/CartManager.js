import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

// 👇 para simular __dirname en ESModules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ruta al archivo JSON
const cartsPath = path.join(__dirname, "../data/carts.json");

export default class CartManager {
  constructor() {
    this.path = cartsPath;
  }

  async _getCarts() {
    try {
      const data = await fs.readFile(this.path, "utf-8");
      return JSON.parse(data);
    } catch {
      return [];
    }
  }

  async _saveCarts(carts) {
    await fs.writeFile(this.path, JSON.stringify(carts, null, 2));
  }

  async addCart() {
    const carts = await this._getCarts();
    const newCart = {
      id: carts.length > 0 ? carts[carts.length - 1].id + 1 : 1,
      products: [],
    };
    carts.push(newCart);
    await this._saveCarts(carts);
    return newCart;
  }

  async getCartById(id) {
    const carts = await this._getCarts();
    return carts.find(cart => cart.id === parseInt(id));
  }

  async addProductToCart(cid, pid) {
    const carts = await this._getCarts();
    const cartIndex = carts.findIndex(c => c.id === parseInt(cid));
    if (cartIndex === -1) return null;

    const cart = carts[cartIndex];
    const productInCart = cart.products.find(p => p.product === pid);

    if (productInCart) {
      productInCart.quantity += 1;
    } else {
      cart.products.push({ product: pid, quantity: 1 });
    }

    carts[cartIndex] = cart;
    await this._saveCarts(carts);
    return cart;
  }
}