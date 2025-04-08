import { Router } from "express";
import CartManager from "../managers/CartManager.js";

const router = Router();
const cartManager = new CartManager();

// POST /api/carts → crear carrito nuevo
router.post("/", async (req, res) => {
  const newCart = await cartManager.addCart();
  res.status(201).json(newCart);
});

// GET /api/carts/:cid → traer carrito por ID
router.get("/:cid", async (req, res) => {
  const cart = await cartManager.getCartById(req.params.cid);
  if (!cart) return res.status(404).json({ error: "Carrito no encontrado" });
  res.json(cart);
});

// POST /api/carts/:cid/product/:pid → agregar producto a carrito
router.post("/:cid/product/:pid", async (req, res) => {
  const { cid, pid } = req.params;
  const updatedCart = await cartManager.addProductToCart(cid, pid);
  if (!updatedCart) return res.status(404).json({ error: "Carrito no encontrado" });
  res.json(updatedCart);
});

export default router;