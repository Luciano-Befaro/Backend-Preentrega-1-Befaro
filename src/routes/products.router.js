import { Router } from "express";
import ProductManager from "../managers/ProductManager.js";

const router = Router();
const productManager = new ProductManager();

// GET /api/products/ => Listar todos los productos
router.get("/", async (req, res) => {
  try {
    const products = await productManager.getProducts();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener los productos" });
  }
});

// GET /api/products/:pid => Obtener producto por ID
router.get("/:pid", async (req, res) => {
  try {
    const product = await productManager.getProductById(req.params.pid);
    product
      ? res.json(product)
      : res.status(404).json({ error: "Producto no encontrado" });
  } catch (error) {
    res.status(500).json({ error: "Error al buscar el producto" });
  }
});

// POST /api/products/ => Agregar producto
router.post("/", async (req, res) => {
  try {
    const newProduct = await productManager.addProduct(req.body);
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(400).json({ error: "Error al agregar el producto" });
  }
});

// PUT /api/products/:pid => Actualizar producto
router.put("/:pid", async (req, res) => {
  try {
    const updated = await productManager.updateProduct(req.params.pid, req.body);
    updated
      ? res.json(updated)
      : res.status(404).json({ error: "Producto no encontrado" });
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar el producto" });
  }
});

// DELETE /api/products/:pid => Eliminar producto
router.delete("/:pid", async (req, res) => {
  try {
    const deleted = await productManager.deleteProduct(req.params.pid);
    deleted
      ? res.json({ message: "Producto eliminado" })
      : res.status(404).json({ error: "Producto no encontrado" });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar el producto" });
  }
});

export default router;